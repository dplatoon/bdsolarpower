import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PolicySummarizer = () => {
  const [policyText, setPolicyText] = useState<string>("");
  const [policyType, setPolicyType] = useState<string>("general");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!policyText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter policy text to summarize",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('summarize-policy', {
        body: {
          policyText,
          policyType,
        },
      });

      if (error) throw error;

      setSummary(data.summary);
      toast({
        title: "Summary Generated",
        description: "Policy has been successfully summarized",
      });
    } catch (error) {
      console.error("Error summarizing policy:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not generate policy summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          AI Policy Summarizer
        </CardTitle>
        <CardDescription>
          Get instant summaries of Bangladesh solar energy policies, regulations, and tender documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="policyType">Policy Document Type</Label>
            <Select value={policyType} onValueChange={setPolicyType}>
              <SelectTrigger id="policyType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Policy</SelectItem>
                <SelectItem value="tender">Tender Document</SelectItem>
                <SelectItem value="regulation">Technical Regulation</SelectItem>
                <SelectItem value="financing">Financing Guideline</SelectItem>
                <SelectItem value="environmental">Environmental Standard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="policyText">Policy Text / Document Content</Label>
            <Textarea
              id="policyText"
              placeholder="Paste policy text, regulation details, or tender requirements here..."
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>

          <Button 
            onClick={handleSummarize} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>Analyzing Policy...</>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Summary
              </>
            )}
          </Button>

          {summary && (
            <div className="mt-6 space-y-3">
              <Label>AI-Generated Summary</Label>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Textarea
                  value={summary}
                  readOnly
                  rows={10}
                  className="resize-none bg-transparent border-0 focus-visible:ring-0"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(summary)}
                >
                  Copy Summary
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const blob = new Blob([summary], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'policy-summary.txt';
                    a.click();
                  }}
                >
                  Download Summary
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicySummarizer;
