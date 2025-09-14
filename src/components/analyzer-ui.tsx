
"use client";

import { useEffect, useState } from "react";
import React from "react";
import { useActionState } from "react";
import { analyzeUrlOrText } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import ResultDisplay from "@/components/result-display";
import { Skeleton } from "./ui/skeleton";

const initialState = {
  data: null,
  error: null,
  timestamp: 0,
};

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


function UrlForm({ action }: { action: (payload: FormData) => void }) {
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="type" value="url" />
      <div className="space-y-2">
        <Label htmlFor="url-input">Article URL</Label>
        <Input
          id="url-input"
          name="value"
          placeholder="https://example.com/news-article"
          required
          type="url"
        />
      </div>
      <ClientOnly><SubmitButton /></ClientOnly>
    </form>
  );
}

function TextForm({ action }: { action: (payload: FormData) => void }) {
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="type" value="text" />
      <div className="space-y-2">
        <Label htmlFor="text-input">Article Text</Label>
        <Textarea
          id="text-input"
          name="value"
          placeholder="Paste the full content of the article here..."
          required
          rows={10}
          minLength={100}
        />
      </div>
      <ClientOnly><SubmitButton /></ClientOnly>
    </form>
  );
}


export function AnalyzerUI() {
  const [state, formAction] = useActionState(analyzeUrlOrText, initialState);
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();

  const handleFormAction = (payload: FormData) => {
    startTransition(() => {
      formAction(payload);
    });
  };

  useEffect(() => {
    if (state.error) {
      toast({
        title: "Analysis Failed",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state.error, state.timestamp, toast]);

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted p-1 h-auto">
              <TabsTrigger value="url" className="py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Analyze URL</TabsTrigger>
              <TabsTrigger value="text" className="py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">Analyze Text</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="mt-6">
              <UrlForm action={handleFormAction} />
            </TabsContent>
            <TabsContent value="text" className="mt-6">
              <TextForm action={handleFormAction} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {isPending && (
        <Card>
            <CardContent className="p-6 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </CardContent>
        </Card>
      )}

      {!isPending && state.data && <ResultDisplay result={state.data} />}
    </div>
  );
}
