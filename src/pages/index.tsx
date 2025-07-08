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
import Link from 'next/link';

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
  const [isGeneratingHomepage, setIsGeneratingHomepage] = useState(false);

  const handleAnalyze = async (url: string, options?: any) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisProgress(0);
    setCurrentStep('Initializing analysis...');

    try {
      // Simulate progress updates
      const progressSteps = [
        { progress: 10, step: 'Looking at your website...' },
        { progress: 30, step: 'Understanding your business...' },
        { progress: 50, step: 'Finding improvement opportunities...' },
        { progress: 70, step: 'Calculating your squared potential...' },
        { progress: 90, step: 'Preparing your results...' },
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
        body: JSON.stringify({ url, ...options }),
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

      // Show analysis results immediately
      setAnalysisProgress(100);
      setCurrentStep('Analysis complete!');
      setAnalysisResult(data.data);
      
      // If homepage generation is needed and analysis was successful
      if (options?.generate_homepage && data.data?.analysis?.business_info?.name) {
        setIsGeneratingHomepage(true);
        toast.success('Analysis complete! Building your new homepage...');
        
        // Generate homepage in the background
        generateHomepageInBackground(data.data.workflow_id);
      } else {
        toast.success('Your website has been squared! 🚀');
      }

    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
      setAnalysisProgress(0);
      setCurrentStep('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateHomepageInBackground = async (workflowId: string) => {
    try {
      // Simulate homepage generation delay
      setTimeout(async () => {
        try {
          // Make a real API call to generate homepage
          const response = await fetch('/api/generate-homepage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              workflow_id: workflowId,
              analysis: analysisResult?.analysis 
            }),
          });
          
          const data = await response.json();
          
          if (data.success && data.homepage) {
            setIsGeneratingHomepage(false);
            
            // Update the result with the homepage
            setAnalysisResult(prev => {
              if (prev) {
                return {
                  ...prev,
                  homepage: data.homepage
                };
              }
              return prev;
            });
            
            toast.success('Your new homepage is ready! 🎨', {
              duration: 5000,
            });
          } else {
            throw new Error(data.error?.message || 'Homepage generation failed');
          }
        } catch (error) {
          console.error('Homepage generation error:', error);
          setIsGeneratingHomepage(false);
          toast.error('Homepage generation failed. Please try again.');
        }
      }, 2000); // Start generation after 2 seconds
      
    } catch (error) {
      console.error('Homepage generation error:', error);
      setIsGeneratingHomepage(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setAnalysisProgress(0);
    setCurrentStep('');
    setIsGeneratingHomepage(false);
  };

  return (
    <>
      <Head>
        <title>DX² - Digital Experience Squared</title>
        <meta name="description" content="We don't just improve your website. We square it." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">DX²</h1>
                  <p className="text-sm text-gray-500">Digital Experience Squared</p>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <span className="text-blue-600 font-medium">Home</span>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <div className="hidden lg:flex items-center space-x-4 ml-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Results in 30 seconds</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span>Exponential Growth</span>
                  </div>
                </div>
              </nav>
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
                  <span>Free Website Analysis • No Credit Card Required</span>
                </div>
                
                <h1 className="responsive-title font-bold text-gray-900 mb-6">
                  We Don't Just Improve Your Website.{' '}
                  <span className="gradient-text">We Square It.</span>
                </h1>
                
                <p className="responsive-subtitle text-gray-600 mb-8 max-w-3xl mx-auto">
                  Small changes, exponential results. Discover how tiny improvements 
                  compound into massive business growth. Get your free analysis in 
                  30 seconds and see your website's squared potential.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="card-hover text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Smart Analysis</h3>
                    <p className="text-gray-600 text-sm">We examine every detail of your website</p>
                  </div>
                  
                  <div className="card-hover text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Squared Impact</h3>
                    <p className="text-gray-600 text-sm">2% improvements = 10x business results</p>
                  </div>
                  
                  <div className="card-hover text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Clear Next Steps</h3>
                    <p className="text-gray-600 text-sm">Know exactly what to fix and why it matters</p>
                  </div>
                </div>
              </div>

              {/* Value Proposition Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border border-blue-100">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Why DX² Instead of DIY?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">DIY Builders (Wix, Squarespace)</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span>40-80 hours of your time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span>Still looks like a template</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span>You're the designer, developer, and copywriter</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span>Months to see results</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">DX² Done-For-You</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Live in 3-5 business days</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Custom design for YOUR business</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Real humans + AI working together</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Exponential results, guaranteed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-blue-900">
                    Your time is worth $100+/hour. Why spend 80 hours when we can square your site in days?
                  </p>
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
              <AnalysisResults 
                result={analysisResult} 
                isGeneratingHomepage={isGeneratingHomepage}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                DX² - Digital Experience Squared
              </p>
              <p className="text-sm text-gray-500">
                © 2025 DX² • Small changes. Exponential results.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
