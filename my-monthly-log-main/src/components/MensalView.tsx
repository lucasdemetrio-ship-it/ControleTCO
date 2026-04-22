import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, Plus, CalendarDays } from "lucide-react";
import { Afericao } from "@/types/Afericao";
import AfericaoTable from "./AfericaoTable";
import NovaAfericaoDialog from "./NovaAfericaoDialog";
import { Button } from "@/components/ui/button";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

interface MensalViewProps {
  afericoes: Afericao[];
  onAdd: (data: { placa: string; proprietario: string; data: string; observacoes: string }) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: { placa: string; proprietario: string; data: string; observacoes: string }) => void;
}

const MensalView = ({ afericoes, onAdd, onDelete, onEdit }: MensalViewProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getCountForMonth = (monthIndex: number) => {
    return afericoes.filter((a) => {
      const d = new Date(a.data + "T00:00:00");
      return d.getFullYear() === year && d.getMonth() === monthIndex;
    }).length;
  };

  const getAfericoesForMonth = (monthIndex: number) => {
    return afericoes.filter((a) => {
      const d = new Date(a.data + "T00:00:00");
      return d.getFullYear() === year && d.getMonth() === monthIndex;
    });
  };

  if (selectedMonth !== null) {
    const monthAfericoes = getAfericoesForMonth(selectedMonth);
    const defaultDate = `${year}-${String(selectedMonth + 1).padStart(2, "0")}-01`;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedMonth(null)}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h2 className="text-xl font-semibold text-foreground">
            {MESES[selectedMonth]} {year}
          </h2>
          <Button onClick={() => setDialogOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Nova Aferição
          </Button>
        </div>
        <AfericaoTable afericoes={monthAfericoes} onDelete={onDelete} onEdit={onEdit} />
        <NovaAfericaoDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={onAdd}
          defaultDate={defaultDate}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary text-primary">
            <CalendarDays className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Resumo Mensal</h2>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          <button onClick={() => setYear(year - 1)} className="p-2 rounded-md hover:bg-card transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-lg min-w-[60px] text-center">{year}</span>
          <button onClick={() => setYear(year + 1)} className="p-2 rounded-md hover:bg-card transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {MESES.map((mes, i) => {
          const count = getCountForMonth(i);
          return (
            <button
              key={mes}
              onClick={() => setSelectedMonth(i)}
              className="bg-card rounded-xl border p-4 text-left hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{mes}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{count}</p>
              <p className="text-xs text-muted-foreground mt-0.5">aferições</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MensalView;
