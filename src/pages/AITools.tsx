
import Header from "@/components/Header";
import AIToolsPreview from "@/components/AIToolsPreview";

const AITools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Solar Analysis</h1>
          <p className="text-gray-600 mt-2">
            Advanced artificial intelligence tools for solar potential assessment, policy analysis, and environmental impact calculation
          </p>
        </div>
        <AIToolsPreview />
      </div>
    </div>
  );
};

export default AITools;
