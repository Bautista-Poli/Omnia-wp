import type { Color } from 'jspdf-autotable';

export type RGB = [number, number, number];

export interface SchedulePdfOptions {
  title?: string;
  subtitle?: string;
  filename?: string;
  landscape?: boolean; // default true
  margin?: { top: number; right: number; bottom: number; left: number };
  palette?: {
    headFill?: Color;
    headText?: Color;
    hourFill?: Color;
    hourText?: Color;
    busyFill?: Color;
    busyText?: Color;
    emptyFill?: Color;
    emptyText?: Color;
    gridLine?: Color;
  };
}
