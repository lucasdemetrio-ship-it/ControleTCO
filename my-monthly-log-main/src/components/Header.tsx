import logodalex from "@/assets/logo-dalex.png";

const Header = () => {
  return (
    <header className="bg-header py-5 px-8 flex items-center gap-5 shadow-lg">
      <div className="w-14 h-14 rounded-full bg-primary-foreground/20 p-0.5 ring-2 ring-primary-foreground/30">
        <img src={logodalex} alt="Logo Dalex" className="w-full h-full rounded-full object-cover" />
      </div>
      <div>
        <h1 className="text-primary-foreground text-2xl font-bold tracking-tight">Auto Elétrica Dalex</h1>
        <p className="text-primary-foreground/70 text-sm font-medium">Controle de Aferição de Tacógrafos</p>
      </div>
    </header>
  );
};

export default Header;
