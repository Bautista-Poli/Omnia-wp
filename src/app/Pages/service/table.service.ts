// table.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { timeout, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ClassCell } from './hour.class';
import { ClassInfo } from '../interface/data.interface';



@Injectable({ providedIn: 'root' })
export class TableService {
  private readonly api = `${environment.apiUrl}/get-schedule`;

  private minutes: string[] = [];
  // AHORA: por minuto -> 5 días -> array de ClassCell (0..n por celda)
  private grid = new Map<string, ClassCell[][]>();
  private hydrated = false;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private minuteKey(t: string): string { return t.slice(0, 5); }           // "HH:mm"
  private timeToSeconds(t: string): number {
    const [hh, mm, ss = '00'] = t.split(':'); return (+hh)*3600 + (+mm)*60 + (+ss);
  }

  private async fetchSchedule(): Promise<void> {
    if (isPlatformServer(this.platformId)) return;

    const data = await firstValueFrom(
      this.http.get<ClassInfo[]>(this.api).pipe(timeout(25000), retry(1))
    );

    const rows = (data ?? []).filter(r => r && typeof r.dia_semana === 'number');

    // ordenar por hora
    rows.sort((a, b) => this.timeToSeconds(a.horario) - this.timeToSeconds(b.horario));

    // minutos únicos
    const minuteSet = new Set<string>();
    for (const r of rows) minuteSet.add(this.minuteKey(r.horario));
    this.minutes = Array.from(minuteSet).sort(
      (a, b) => this.timeToSeconds(a + ':00') - this.timeToSeconds(b + ':00')
    );

    // inicializar grilla
    this.grid.clear();
    for (const m of this.minutes) {
      this.grid.set(m, Array.from({ length: 6 }, () => [] as ClassCell[]));
    }

    // poblar
    for (const r of rows) {
      if (r.dia_semana < 1 || r.dia_semana > 6) continue;

      const m = this.minuteKey(r.horario);
      if (!this.grid.has(m)) {
        this.grid.set(m, Array.from({ length: 6 }, () => [] as ClassCell[]));
        this.minutes.push(m);
        this.minutes.sort((a, b) => this.timeToSeconds(a + ':00') - this.timeToSeconds(b + ':00'));
      }

      const dayIdx = r.dia_semana - 1;

      

      const rowArr = this.grid.get(m)!;
      const already = rowArr[dayIdx].some(
        c => (c.name ?? '').toLowerCase() === r.nombre_clase.toLowerCase()
      );
      const profId = (r.profesorId ?? (r as any).profesor_id ?? null) as number | null;

      if (!already) {
        rowArr[dayIdx].push(
          ClassCell.of(r.nombre_clase, r.id, r.horario, r.dia_semana, profId) // 👈 PASA EL PROF ID
        );
      }
    }

    this.hydrated = true;
  }


  // filas para la tabla: en cada celda hay 0..n ClassCell
  async getRows(): Promise<Array<{ hora: string; clases: ClassCell[][] }>> {
    if (!this.hydrated) await this.fetchSchedule();
    return this.minutes.map(m => ({ hora: m, clases: this.grid.get(m)! }));
  }

  async refresh(): Promise<void> {
    this.hydrated = false;
    this.minutes = [];
    this.grid.clear();
    await this.fetchSchedule();
  }
}
