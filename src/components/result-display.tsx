import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AnalyzeArticleFromUrlOutput } from "@/ai/flows/analyze-article-from-url";
import { CheckCircle2, XCircle } from "lucide-react";

type ResultDisplayProps = {
  result: AnalyzeArticleFromUrlOutput;
};

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const isLikelyReal = result.assessment === "Likely Real";

  return (
    <Card className="shadow-lg animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 space-y-2 sm:space-y-0">
          <CardTitle className="text-xl">Analysis Result</CardTitle>
          <Badge
            variant={isLikelyReal ? "success" : "destructive"}
            className="self-start text-base"
          >
            {isLikelyReal ? (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            ) : (
              <XCircle className="mr-2 h-4 w-4" />
            )}
            {result.assessment}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h3 className="font-semibold text-foreground">Explanation:</h3>
          <p className="text-muted-foreground">{result.explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
