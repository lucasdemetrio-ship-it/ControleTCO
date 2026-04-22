import { useState } from "react";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { Afericao } from "@/types/Afericao";
import { Input } from "@/components/ui/input";

interface AfericaoTableProps {
  afericoes: Afericao[];
  onDelete: (id: string) => void;
  onEdit: (id: string, data: { placa: string; proprietario: string; data: string; observacoes: string }) => void;
}

const AfericaoTable = ({ afericoes, onDelete, onEdit }: AfericaoTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ placa: "", proprietario: "", data: "", observacoes: "" });

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const startEdit = (a: Afericao) => {
    setEditingId(a.id);
    setEditData({ placa: a.placa, proprietario: a.proprietario, data: a.data, observacoes: a.observacoes });
  };

  const saveEdit = () => {
    if (editingId && editData.placa && editData.proprietario && editData.data) {
      onEdit(editingId, {
        placa: editData.placa.toUpperCase(),
        proprietario: editData.proprietario.toUpperCase(),
        data: editData.data,
        observacoes: editData.observacoes.toUpperCase(),
      });
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  if (afericoes.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border">
        <p className="text-lg">Nenhuma aferição encontrada.</p>
        <p className="text-sm mt-1">Adicione uma nova aferição para começar.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-primary/10">
            <th className="text-left p-4 text-xs font-semibold text-foreground uppercase tracking-wide">Placa</th>
            <th className="text-left p-4 text-xs font-semibold text-foreground uppercase tracking-wide">Proprietário</th>
            <th className="text-left p-4 text-xs font-semibold text-foreground uppercase tracking-wide">Data</th>
            <th className="text-left p-4 text-xs font-semibold text-foreground uppercase tracking-wide">Observações</th>
            <th className="p-4 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {afericoes.map((a) => (
            <tr key={a.id} className="border-t hover:bg-secondary/30 transition-colors">
              {editingId === a.id ? (
                <>
                  <td className="p-2">
                    <Input
                      value={editData.placa}
                      onChange={(e) => setEditData({ ...editData, placa: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      value={editData.proprietario}
                      onChange={(e) => setEditData({ ...editData, proprietario: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="date"
                      value={editData.data}
                      onChange={(e) => setEditData({ ...editData, data: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      value={editData.observacoes}
                      onChange={(e) => setEditData({ ...editData, observacoes: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <button
                        onClick={saveEdit}
                        className="p-1.5 rounded-lg text-green-600 hover:bg-green-100 transition-all"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-4 font-bold text-primary">{a.placa}</td>
                  <td className="p-4 text-foreground">{a.proprietario}</td>
                  <td className="p-4 text-foreground font-medium">{formatDate(a.data)}</td>
                  <td className="p-4 text-muted-foreground">{a.observacoes || "—"}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(a)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(a.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AfericaoTable;
