import { useState } from 'react';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import { 
  Globe, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Loader2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

import AnalysisForm from '../components/AnalysisForm';
import AnalysisResults from '../components/AnalysisResults';
import LoadingSpinner from '../components/LoadingSpinner';

interface AnalysisResult {
  id: string;
  url: string;
  analyzed_at: string;
  website_content: {
    url: string;
    title: string;
    meta_description?: string;
    text_content: string;
  };
  business_info: {
    name: string;
    business_type: string;
    industry: string;
    description: string;
    services: string[];
    location?: string;
    phone?: string;
    email?: string;
    confidence: number;
  };
  issues: Array<{
    type: string;
    title: string;
    description: string;
    severity: string;
    impact: string;
  }>;
  recommendations: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    rationale: string;
    priority: number;
    estimated_impact: string;
    estimated_effort: string;
    estimated_hours?: number;
    estimated_cost?: number;
  }>;
  seo_analysis?: {
    title_tag?: string;
    meta_description?: string;
    h1_tags: string[];
    target_keywords: string[];
    issues: string[];
    opportunities: string[];
    score?: number;
  };
  confidence_score: number;
  processing_time?: number;
  ai_model_used: string;
}

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    analysis: AnalysisResult;
    homepage?: any;
    total_processing_time: number;
    workflow_id: string;
  } | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisProgress(0);
    setCurrentStep('Initializing analysis...');

    try {
      // Simulate progress updates
      const progressSteps = [
        { progress: 10, step: 'Crawling website content...' },
        { progress: 30, step: 'Extracting business information...' },
        { progress: 50, step: 'Analyzing with AI...' },
        { progress: 70, step: 'Identifying issues...' },
        { progress: 90, step: 'Generating recommendations...' },
      ];

      // Start progress simulation
      let stepIndex = 0;
      const progressInterval = setInterval(() => {
        if (stepIndex < progressSteps.length) {
          const { progress, step } = progressSteps[stepIndex];
          setAnalysisProgress(progress);
          setCurrentStep(step);
          stepIndex++;
        }
      }, 1000);

      // Make API call
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Analysis failed');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error?.message || 'Analysis failed');
      }

      setAnalysisProgress(100);
      setCurrentStep('Analysis complete!');
      setAnalysisResult(data.data);
      
      toast.success('Website analysis completed successfully!');

    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
      setAnalysisProgress(0);
      setCurrentStep('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setAnalysisProgress(0);
    setCurrentStep('');
  };

  return (
    <>
      <Head>
        <title>AI Web Upgrader - POC</title>
        <meta name="description" content="Transform your website with AI-powered analysis and recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Web Upgrader</h1>
                  <p className="text-sm text-gray-500">POC Demo</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Instant Recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!analysisResult ? (
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  <span>Proof of Concept Demo</span>
                </div>
                
                <h1 className="responsive-title font-bold text-gray-900 mb-6">
                  Transform Your Website with{' '}
                  <span className="gradient-text">AI-Powered Analysis</span>
                </h1>
                
                <p className="responsive-subtitle text-gray-600 mb-8 max-w-3xl mx-auto">
                  Get instant AI-powered insights about your website's performance, 
                  identify critical issues, and receive actionable recommendations 
                  to improve your online presence.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="card-hover text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Smart Crawling</h3>
                    <p className="text-gray-600 text-sm">Advanced AI analyzes your website content and structure</p>
                  </div>
                  
                  <div className="card-hover text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Business Intelligence</h3>
                    <p className="text-gray-600 text-sm">Identifies your business type and target market automatically</p>
                  </div>
                  
                  <div className="card-hover text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Actionable Insights</h3>
                    <p className="text-gray-600 text-sm">Receive specific recommendations with cost estimates</p>
                  </div>
                </div>
              </div>

              {/* Analysis Form */}
              <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
                <AnalysisForm onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
                
                {isAnalyzing && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                        <span className="font-medium text-blue-900">Analyzing Website</span>
                      </div>
                      <span className="text-sm text-blue-700 font-medium">{analysisProgress}%</span>
                    </div>
                    
                    <div className="progress-bar mb-3">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                    
                    <p className="text-sm text-blue-700">{currentStep}</p>
                  </div>
                )}
              </div>

              {/* Demo Info */}
              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">POC Demo Information</h4>
                    <p className="text-sm text-yellow-800 mb-3">
                      This is a proof-of-concept demonstration. For testing, try these sample websites:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleAnalyze('https://example.com')}
                        className="inline-flex items-center space-x-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                        disabled={isAnalyzing}
                      >
                        <span>example.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => handleAnalyze('https://www.weatherfordschoolhouse.com')}
                        className="inline-flex items-center space-x-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                        disabled={isAnalyzing}
                      >
                        <span>weatherfordschoolhouse.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => handleAnalyze('https://nolimitz.io')}
                        className="inline-flex items-center space-x-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md transition-colors"
                        disabled={isAnalyzing}
                      >
                        <span>nolimitz.io</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
                  <p className="text-gray-600">
                    Completed in {analysisResult.total_processing_time ? 
                      `${(analysisResult.total_processing_time / 1000).toFixed(1)}s` : 
                      'less than a minute'
                    }
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="btn-outline"
                >
                  Analyze Another Website
                </button>
              </div>

              {/* Analysis Results */}
              <AnalysisResults result={analysisResult} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                AI Web Upgrader - Proof of Concept Demo
              </p>
              <p className="text-sm text-gray-500">
                Powered by OpenAI GPT • Built with Next.js and Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
