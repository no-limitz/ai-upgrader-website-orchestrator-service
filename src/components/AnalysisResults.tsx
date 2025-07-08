/**
 * AnalysisResults Component
 * 
 * Displays the complete analysis results including:
 * - Business information
 * - Issues identified
 * - Recommendations
 * - Generated homepage (if available)
 */

import { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  Globe, 
  Code, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  DollarSign,
  Zap,
  Loader2
} from 'lucide-react';

import SalesCTA from './SalesCTA';

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

interface HomepageResult {
  id: string;
  business_name: string;
  generated_at: string;
  html_code: string;
  css_code: string;
  js_code?: string;
  style_applied: string;
  features_included: string[];
  estimated_improvement: string;
  generation_time: number;
  screenshot?: string; // Base64 data URL of the screenshot
}

interface AnalysisResultsProps {
  result: {
    analysis: AnalysisResult;
    homepage?: HomepageResult;
    total_processing_time: number;
    workflow_id: string;
  };
  isGeneratingHomepage?: boolean;
}

export default function AnalysisResults({ result, isGeneratingHomepage = false }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'homepage' | 'upgrade' | 'technical'>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['business-info']));
  const [showSalesCTA, setShowSalesCTA] = useState(false);

  const { analysis, homepage } = result;

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority <= 2) return 'text-red-600 bg-red-50';
    if (priority <= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const createPlaceholderImage = (businessName: string) => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjExMDAiIGhlaWdodD0iNzAwIiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjRTVFN0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2ZyB4PSI1NzUiIHk9IjM3NSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNMTIgMkwxMyAxNEgxMUwxMiAyWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPHRleHQgeD0iNjAwIiB5PSI0NTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGxhY2Vob2xkZXIgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
  };

  const openScreenshotInNewTab = () => {
    if (!homepage) return;
    
    const screenshotSrc = homepage.screenshot || createPlaceholderImage(homepage.business_name);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(
        '<!DOCTYPE html>' +
        '<html><head><title>' + homepage.business_name + ' - Homepage Preview</title></head>' +
        '<body style="margin:0;padding:20px;font-family:Arial,sans-serif;background:#f3f4f6;text-align:center;">' +
        '<h1>' + homepage.business_name + ' - Generated Homepage</h1>' +
        '<img src="' + screenshotSrc + '" style="max-width:100%;border:1px solid #ccc;" />' +
        '</body></html>'
      );
      newWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Business Type</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {analysis.business_info.business_type}
          </p>
          <p className="text-sm text-gray-500">
            {Math.round(analysis.business_info.confidence * 100)}% confidence
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-600">Issues Found</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {analysis.issues.length}
          </p>
          <p className="text-sm text-gray-500">
            Critical areas to address
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Recommendations</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {analysis.recommendations.length}
          </p>
          <p className="text-sm text-gray-500">
            Improvement opportunities
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Processing Time</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {Math.round(result.total_processing_time / 1000)}s
          </p>
          <p className="text-sm text-gray-500">
            Complete analysis
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Globe },
            { id: 'recommendations', label: 'Recommendations', icon: TrendingUp },
            ...((homepage || isGeneratingHomepage) ? [{
              id: 'homepage',
              label: 'New Homepage',
              icon: isGeneratingHomepage ? Loader2 : Code,
              loading: isGeneratingHomepage
            }] : []),
            { id: 'upgrade', label: '🚀 Get New Website', icon: Zap },
            { id: 'technical', label: 'Technical Details', icon: CheckCircle }
          ].map(({ id, label, icon: Icon, loading }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 py-2 border-b-2 text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{label}</span>
              {loading && <span className="text-xs text-blue-600">(Building...)</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            {/* Sales CTA Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready for a Better Website?</h3>
                  <p className="text-blue-100 mb-4">
                    We found {analysis.recommendations?.length || 0} improvement opportunities. 
                    Get a professional redesign in just 7 days!
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>7-Day Delivery</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>Starting at $500</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>DX² Team</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('upgrade')}
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Quote →
                </button>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <button
                onClick={() => toggleSection('business-info')}
                className="flex items-center space-x-2 w-full text-left"
              >
                {expandedSections.has('business-info') ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
                <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
              </button>
              
              {expandedSections.has('business-info') && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{analysis.business_info.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">{analysis.business_info.description}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industry</span>
                          <p className="text-sm text-gray-900">{analysis.business_info.industry}</p>
                        </div>
                        {analysis.business_info.location && (
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</span>
                            <p className="text-sm text-gray-900">{analysis.business_info.location}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Services</h5>
                      <div className="flex flex-wrap gap-2">
                        {analysis.business_info.services.map((service, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      {(analysis.business_info.phone || analysis.business_info.email) && (
                        <div className="mt-4 space-y-1">
                          {analysis.business_info.phone && (
                            <p className="text-sm text-gray-600">📞 {analysis.business_info.phone}</p>
                          )}
                          {analysis.business_info.email && (
                            <p className="text-sm text-gray-600">✉️ {analysis.business_info.email}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Issues */}
            {analysis.issues.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('issues')}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  {expandedSections.has('issues') ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">Issues Identified</h3>
                  <span className="text-sm text-gray-500">({analysis.issues.length})</span>
                </button>
                
                {expandedSections.has('issues') && (
                  <div className="mt-4 space-y-3">
                    {analysis.issues.map((issue, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${getSeverityColor(issue.severity)}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{issue.title}</h4>
                            <p className="text-sm mt-1">{issue.description}</p>
                            <p className="text-xs mt-2 opacity-75">{issue.impact}</p>
                          </div>
                          <span className="text-xs font-medium px-2 py-1 bg-white/50 rounded">
                            {issue.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="p-6">
            <div className="space-y-4">
              {analysis.recommendations.map((rec) => (
                <div key={rec.id} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(rec.priority)}`}>
                          Priority {rec.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'homepage' && (isGeneratingHomepage || homepage) && (
          <div className="p-6">
            {isGeneratingHomepage ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Building Your New Homepage</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Our AI is designing a custom homepage based on your business analysis.
                </p>
              </div>
            ) : homepage ? (
              <div className="space-y-6">
                {/* Homepage Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Your New Homepage Design</h3>
                    <p className="text-gray-600">
                      AI-generated design • Style: {homepage.style_applied} • Created in {Math.round(homepage.generation_time / 1000)}s
                    </p>
                  </div>
                  <button
                    onClick={openScreenshotInNewTab}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      homepage.screenshot 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Full Size</span>
                  </button>
                </div>

                {/* Screenshot Display */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <div className="bg-white p-3 border-b border-gray-200 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-sm text-gray-600 text-center font-mono">
                      {homepage.business_name.toLowerCase().replace(/\s+/g, '')}.com
                    </div>
                  </div>
                  <div className="p-4">
                    <img 
                      src={homepage.screenshot || createPlaceholderImage(homepage.business_name)}
                      alt={`Generated homepage for ${homepage.business_name}`}
                      className="w-full border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                      onClick={openScreenshotInNewTab}
                    />
                    {!homepage.screenshot && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-800 text-sm flex items-center space-x-2">
                          <span>📷</span>
                          <span>Live screenshot unavailable - showing design preview mockup</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Features Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {homepage.features_included.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {feature.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Improvement Description */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Why This Design Works Better</h4>
                  <p className="text-blue-800 text-sm">{homepage.estimated_improvement}</p>
                </div>

                {/* Homepage CTA */}
                <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold mb-2">Ready to Make This Your Real Website?</h4>
                      <p className="text-green-50 text-sm">
                        Get a fully functional website built with your branding, content, and custom features
                      </p>
                      <div className="flex items-center space-x-4 mt-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>7-Day Delivery</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Mobile Responsive</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>Professional Design</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('upgrade')}
                      className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Get Quote →
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {activeTab === 'upgrade' && (
          <div className="p-6">
            <SalesCTA 
              analysisResult={analysis} 
              onClose={() => setShowSalesCTA(false)}
            />
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Analysis ID</span>
                    <p className="text-sm text-gray-900 font-mono">{analysis.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">AI Model</span>
                    <p className="text-sm text-gray-900">{analysis.ai_model_used}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}