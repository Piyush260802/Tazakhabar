import { Scale, Search } from "lucide-react";
import { Input } from "./ui/input";

export function AppHeader() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <Scale className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold font-headline text-foreground tracking-tight">
            TazaKhabar
          </h1>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
      </div>
    </header>
  );
}
