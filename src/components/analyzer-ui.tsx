
"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
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
  timestamp: Date.now(),
};

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
      <SubmitButton />
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
      <SubmitButton />
    </form>
  );
}


export function AnalyzerUI() {
  const [state, formAction] = useFormState(analyzeUrlOrText, initialState);
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Analyze URL</TabsTrigger>
              <TabsTrigger value="text">Analyze Text</TabsTrigger>
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
