import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { timeout, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ClassCell } from './hour.class';
import { ClassInfo } from '../interface/data.interface';

const CACHE_KEY = 'omnia_schedule';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos

@Injectable({ providedIn: 'root' })
export class TableService {
  private readonly api = `${environment.apiUrl}/get-schedule`;

  private minutes: string[] = [];
  private grid = new Map<string, ClassCell[][]>();
  private hydrated = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private minuteKey(t: string): string { return t.slice(0, 8); }
  private timeToSeconds(t: string): number {
    const [hh, mm, ss = '00'] = t.split(':'); return (+hh)*3600 + (+mm)*60 + (+ss);
  }

  private readCache(): ClassInfo[] | null {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) {
        sessionStorage.removeItem(CACHE_KEY);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  private writeCache(data: ClassInfo[]): void {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    } catch { /* sessionStorage lleno, ignorar */ }
  }

  private buildGrid(data: ClassInfo[]): void {
    const rows = (data ?? []).filter(r => r && typeof r.dia_semana === 'number');

    rows.sort((a, b) => this.timeToSeconds(a.horario) - this.timeToSeconds(b.horario));

    const minuteSet = new Set<string>();
    for (const r of rows) minuteSet.add(this.minuteKey(r.horario));
    this.minutes = Array.from(minuteSet).sort(
      (a, b) => this.timeToSeconds(a + ':00') - this.timeToSeconds(b + ':00')
    );

    this.grid.clear();
    for (const m of this.minutes) {
      this.grid.set(m, Array.from({ length: 6 }, () => [] as ClassCell[]));
    }

    for (const r of rows) {
      if (r.dia_semana < 1 || r.dia_semana > 6) continue;

      const m = this.minuteKey(r.horario);
      if (!this.grid.has(m)) {
        this.grid.set(m, Array.from({ length: 6 }, () => [] as ClassCell[]));
        this.minutes.push(m);
        this.minutes.sort((a, b) => this.timeToSeconds(a + ':00') - this.timeToSeconds(b + ':00'));
      }

      const rowArr = this.grid.get(m)!;
      const already = rowArr[r.dia_semana - 1].some(
        c => (c.name ?? '').toLowerCase() === r.nombre_clase.toLowerCase()
      );
      const profId = (r.profesorId ?? (r as any).profesor_id ?? null) as number | null;

      if (!already) {
        rowArr[r.dia_semana - 1].push(
          ClassCell.of(r.nombre_clase, r.id, r.horario, r.dia_semana, profId)
        );
      }
    }

    this.hydrated = true;
  }

  private async fetchSchedule(): Promise<void> {
    if (isPlatformServer(this.platformId)) return;

    // Intentar cache primero
    const cached = this.readCache();
    if (cached) {
      this.buildGrid(cached);
      return;
    }

    // Si no hay cache, fetch a la API
    const data = await firstValueFrom(
      this.http.get<ClassInfo[]>(this.api).pipe(timeout(25000), retry(1))
    );

    this.writeCache(data);
    this.buildGrid(data);
  }

  async getRows(): Promise<Array<{ hora: string; clases: ClassCell[][] }>> {
    if (!this.hydrated) await this.fetchSchedule();
    return this.minutes.map(m => ({
      hora: m.slice(0, 5),
      clases: this.grid.get(m)!
    }));
  }

  async refresh(): Promise<void> {
    this.hydrated = false;
    this.minutes = [];
    this.grid.clear();
    sessionStorage.removeItem(CACHE_KEY); // forzar fetch fresco
    await this.fetchSchedule();
  }
}