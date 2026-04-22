import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DiaADiaView from "@/components/DiaADiaView";
import MensalView from "@/components/MensalView";
import ComparativoAnualView from "@/components/ComparativoAnualView";
import { Afericao } from "@/types/Afericao";

const TABS = ["Dia a Dia", "Mensal", "Comparativo Anual"];

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [afericoes, setAfericoes] = useState<Afericao[]>(() => {
    const saved = localStorage.getItem("afericoes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("afericoes", JSON.stringify(afericoes));
  }, [afericoes]);

  const handleAdd = (data: { placa: string; proprietario: string; data: string; observacoes: string }) => {
    const newAfericao: Afericao = {
      id: crypto.randomUUID(),
      ...data,
    };
    setAfericoes((prev) => [newAfericao, ...prev]);
  };

  const handleDelete = (id: string) => {
    setAfericoes((prev) => prev.filter((a) => a.id !== id));
  };

  const handleEdit = (id: string, data: { placa: string; proprietario: string; data: string; observacoes: string }) => {
    setAfericoes((prev) => prev.map((a) => a.id === id ? { ...a, ...data } : a));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="bg-card rounded-xl border shadow-sm p-1.5 grid grid-cols-3 gap-1">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <DiaADiaView afericoes={afericoes} onAdd={handleAdd} onDelete={handleDelete} onEdit={handleEdit} />
        )}
        {activeTab === 1 && (
          <MensalView afericoes={afericoes} onAdd={handleAdd} onDelete={handleDelete} onEdit={handleEdit} />
        )}
        {activeTab === 2 && (
          <ComparativoAnualView afericoes={afericoes} />
        )}
      </div>
    </div>
  );
};

export default Index;
