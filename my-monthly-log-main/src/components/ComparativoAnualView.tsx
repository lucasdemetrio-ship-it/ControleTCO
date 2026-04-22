import { useState, useEffect } from "react";
import { Afericao } from "@/types/Afericao";
import { BarChart3 } from "lucide-react";

const MESES = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

const YEARS = [2024, 2025, 2026];

interface ComparativoAnualViewProps {
  afericoes: Afericao[];
}

const ComparativoAnualView = ({ afericoes }: ComparativoAnualViewProps) => {
  const [manualCounts, setManualCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem("comparativo-manual");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("comparativo-manual", JSON.stringify(manualCounts));
  }, [manualCounts]);

  const getKey = (year: number, month: number) => `${year}-${month}`;

  const getCount = (year: number, month: number) => {
    const key = getKey(year, month);
    if (key in manualCounts) return manualCounts[key];
    return afericoes.filter((a) => {
      const d = new Date(a.data + "T00:00:00");
      return d.getFullYear() === year && d.getMonth() === month;
    }).length;
  };

  const handleChange = (year: number, month: number, value: string) => {
    const num = value === "" ? 0 : parseInt(value, 10);
    if (isNaN(num)) return;
    setManualCounts((prev) => ({ ...prev, [getKey(year, month)]: num }));
  };

  const getYearTotal = (year: number) => {
    return MESES.reduce((sum, _, i) => sum + getCount(year, i), 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-secondary text-primary">
          <BarChart3 className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Comparativo Anual</h2>
      </div>
      <div className="bg-card rounded-xl border shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary/10">
              <th className="text-left p-4 text-sm font-semibold text-foreground">Mês</th>
              {YEARS.map((y) => (
                <th key={y} className="text-center p-4 text-sm font-bold text-primary">{y}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MESES.map((mes, i) => (
              <tr key={mes} className="border-t hover:bg-secondary/30 transition-colors">
                <td className="p-4 font-medium text-foreground">{mes}</td>
                {YEARS.map((y) => (
                  <td key={y} className="p-3 text-center">
                    <input
                      type="number"
                      min={0}
                      value={getCount(y, i)}
                      onChange={(e) => handleChange(y, i, e.target.value)}
                      className="w-16 text-center rounded-lg border bg-background text-foreground p-2 text-sm font-medium focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-primary/20 bg-primary/5 font-bold">
              <td className="p-4 text-foreground">Total</td>
              {YEARS.map((y) => (
                <td key={y} className="p-4 text-center text-primary text-lg">{getYearTotal(y)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparativoAnualView;
