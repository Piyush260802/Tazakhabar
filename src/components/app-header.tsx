import { Scale } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <Scale className="text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold font-headline text-foreground tracking-tight">
          TazaKhabar
        </h1>
      </div>
    </header>
  );
}
