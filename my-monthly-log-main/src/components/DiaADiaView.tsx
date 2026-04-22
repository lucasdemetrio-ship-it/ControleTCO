import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Afericao } from "@/types/Afericao";
import StatsCards from "./StatsCards";
import AfericaoTable from "./AfericaoTable";
import NovaAfericaoDialog from "./NovaAfericaoDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DiaADiaViewProps {
  afericoes: Afericao[];
  onAdd: (data: { placa: string; proprietario: string; data: string; observacoes: string }) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: { placa: string; proprietario: string; data: string; observacoes: string }) => void;
}

const DiaADiaView = ({ afericoes, onAdd, onDelete, onEdit }: DiaADiaViewProps) => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = afericoes.filter(
    (a) =>
      a.placa.toLowerCase().includes(search.toLowerCase()) ||
      a.proprietario.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <StatsCards afericoes={afericoes} />
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Buscar por placa ou proprietário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Nova Aferição
        </Button>
      </div>
      <AfericaoTable afericoes={filtered} onDelete={onDelete} onEdit={onEdit} />
      <NovaAfericaoDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={onAdd} />
    </div>
  );
};

export default DiaADiaView;
