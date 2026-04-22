import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NovaAfericaoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { placa: string; proprietario: string; data: string; observacoes: string }) => void;
  defaultDate?: string;
}

const NovaAfericaoDialog = ({ open, onOpenChange, onSave, defaultDate }: NovaAfericaoDialogProps) => {
  const [placa, setPlaca] = useState("");
  const [proprietario, setProprietario] = useState("");
  const [data, setData] = useState(defaultDate || new Date().toISOString().split("T")[0]);
  const [observacoes, setObservacoes] = useState("");

  const handleSave = () => {
    if (!placa || !proprietario || !data) return;
    onSave({ placa: placa.toUpperCase(), proprietario: proprietario.toUpperCase(), data, observacoes: observacoes.toUpperCase() });
    setPlaca("");
    setProprietario("");
    setData(defaultDate || new Date().toISOString().split("T")[0]);
    setObservacoes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Aferição</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Placa</Label>
            <Input value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="ABC1D23" />
          </div>
          <div>
            <Label>Proprietário</Label>
            <Input value={proprietario} onChange={(e) => setProprietario(e.target.value)} placeholder="Nome do proprietário" />
          </div>
          <div>
            <Label>Data</Label>
            <Input type="date" value={data} onChange={(e) => setData(e.target.value)} />
          </div>
          <div>
            <Label>Observações</Label>
            <Input value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Opcional" />
          </div>
          <Button onClick={handleSave} className="w-full">Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovaAfericaoDialog;
