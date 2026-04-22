import { ClipboardList, CalendarCheck, CalendarDays } from "lucide-react";
import { Afericao } from "@/types/Afericao";

interface StatsCardsProps {
  afericoes: Afericao[];
}

const StatsCards = ({ afericoes }: StatsCardsProps) => {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const total = afericoes.length;
  const hoje = afericoes.filter((a) => a.data === today).length;
  const esteMes = afericoes.filter((a) => {
    const d = new Date(a.data + "T00:00:00");
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const stats = [
    { label: "Total de Aferições", value: total, icon: ClipboardList, color: "text-primary" },
    { label: "Hoje", value: hoje, icon: CalendarCheck, color: "text-emerald-600" },
    { label: "Este Mês", value: esteMes, icon: CalendarDays, color: "text-amber-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl border p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
