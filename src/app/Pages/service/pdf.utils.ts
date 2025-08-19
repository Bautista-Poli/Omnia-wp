import jsPDF from 'jspdf';
import autoTable, { CellHookData, Color } from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { SchedulePdfOptions } from '../interface/pdf.interface';

// Paleta interna 100% obligatoria
type Palette = {
  headFill: Color;
  headText: Color;
  hourFill: Color;
  hourText: Color;
  busyFill: Color;
  busyText: Color;
  emptyFill: Color;
  emptyText: Color;
  gridLine: Color;
};

const DEFAULT_PALETTE: Palette = {
  headFill: [0, 0, 0],
  headText: [255, 255, 255],
  hourFill: [0, 0, 0],
  hourText: [255, 255, 255],
  busyFill: [255, 145, 0],
  busyText: [0, 0, 0],
  emptyFill: [0, 0, 0],
  emptyText: [255, 255, 255],
  gridLine: [255, 168, 0],
};

const DEFAULT_MARGIN = { top: 64, right: 24, bottom: 36, left: 24 } as const;

/** Multi-página con cortes limpios por fila (autoTable). */
export async function exportSchedulePdf(
  tableEl: HTMLTableElement,
  opts: SchedulePdfOptions = {}
): Promise<void> {
  const {
    title = 'Horarios de clases',
    subtitle,
    filename = 'horarios-gym.pdf',
    landscape = true,
    margin = DEFAULT_MARGIN,
    palette,
  } = opts;

  // Mezclo defaults + overrides y garantizo tipos no opcionales
  const pal: Palette = { ...DEFAULT_PALETTE, ...(palette ?? {}) };

  const pdf = new jsPDF({
    orientation: landscape ? 'landscape' : 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  autoTable(pdf, {
    html: tableEl,
    theme: 'grid',
    margin,
    styles: {
      fontSize: 10,
      cellPadding: 6,
      halign: 'center',
      valign: 'middle',
      lineColor: pal.gridLine,
      lineWidth: 0.75,
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: pal.headFill,
      textColor: pal.headText,
      fontStyle: 'bold',
    },
    didParseCell: (data: CellHookData) => {
      if (data.section !== 'body') return;
      const el = data.cell.raw as HTMLElement | undefined;

      if (data.column.index === 0) {
        data.cell.styles.fillColor = pal.hourFill;
        data.cell.styles.textColor = pal.hourText;
        data.cell.styles.fontStyle = 'bold';
      } else if (el?.classList.contains('has-class')) {
        data.cell.styles.fillColor = pal.busyFill;
        data.cell.styles.textColor = pal.busyText;
      } else {
        data.cell.styles.fillColor = pal.emptyFill;
        data.cell.styles.textColor = pal.emptyText;
      }
    },
    didDrawPage: (data) => {
      pdf.setFont('helvetica', 'bold'); pdf.setFontSize(18);
      pdf.text(title, margin.left, margin.top - 28);

      if (subtitle) {
        pdf.setFont('helvetica', 'normal'); pdf.setFontSize(11);
        pdf.text(subtitle, margin.left, margin.top - 10);
      }

      pdf.setFont('helvetica', 'normal'); pdf.setFontSize(10);
      const fecha = new Date().toLocaleString('es-AR', { hour12: false });
      pdf.text(fecha, pageW - margin.right, margin.top - 28, { align: 'right' });

      const str = `Página ${data.pageNumber} de ${pdf.getNumberOfPages()}`;
      pdf.setFontSize(9);
      pdf.text(str, pageW / 2, pageH - 12, { align: 'center' });
    },
  });

  pdf.save(filename);
}
