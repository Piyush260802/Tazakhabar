import { AppHeader } from "@/components/app-header";
import { AnalyzerUI } from "@/components/analyzer-ui";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <section className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline tracking-tight">
              Verify Before You Amplify
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-center">
              In an age of information overload, TazaKhabar helps you distinguish
              fact from fiction. Paste a URL or text to get an AI-powered
              assessment of its authenticity.
            </p>

            <div className="mt-10">
              <AnalyzerUI />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
