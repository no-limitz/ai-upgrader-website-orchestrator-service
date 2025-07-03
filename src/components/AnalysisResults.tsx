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
  Download,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  DollarSign,
  Zap
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
}

export default function AnalysisResults({ result }: AnalysisResultsProps) {
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

  const downloadHomepage = () => {
    if (!homepage) return;
    
    const htmlContent = `<!DOCTYPE html>
${homepage.html_code}

<style>
${homepage.css_code}
</style>

${homepage.js_code ? `<script>
${homepage.js_code}
</script>` : ''}`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${homepage.business_name.toLowerCase().replace(/\s+/g, '-')}-homepage.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openScreenshotInNewTab = () => {
    if (!homepage) return;
    
    // Create placeholder if no screenshot available
    const screenshotSrc = homepage.screenshot || createPlaceholderImage(homepage.business_name);
    const isPlaceholder = !homepage.screenshot;
    
    // Create a new window/tab with the screenshot or placeholder
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${homepage.business_name} - Generated Homepage Preview</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              background-color: #f3f4f6;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .header {
              background: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              margin-bottom: 20px;
              text-align: center;
              max-width: 600px;
              width: 100%;
            }
            .screenshot {
              max-width: 100%;
              border: 1px solid #d1d5db;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .placeholder {
              border: 2px dashed #d1d5db;
              background: #f9fafb;
            }
            h1 {
              margin: 0 0 10px 0;
              color: #111827;
              font-size: 24px;
            }
            p {
              margin: 0;
              color: #6b7280;
              font-size: 14px;
            }
            .status {
              padding: 8px 16px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 500;
              margin-top: 10px;
            }
            .status.placeholder {
              background: #fef3c7;
              color: #92400e;
            }
            .status.available {
              background: #d1fae5;
              color: #065f46;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${homepage.business_name} - Generated Homepage</h1>
            <p>AI-generated homepage preview • Style: ${homepage.style_applied}</p>
            <div class="status ${isPlaceholder ? 'placeholder' : 'available'}">
              ${isPlaceholder ? '📷 Screenshot service unavailable - showing placeholder' : '✅ Live screenshot captured'}
            </div>
          </div>
          <img src="${screenshotSrc}" alt="Generated Homepage Preview" class="screenshot ${isPlaceholder ? 'placeholder' : ''}" />
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const createPlaceholderImage = (businessName: string) => {
    // Create a simple SVG placeholder
    const svg = `
      <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="#f8fafc"/>
        
        <!-- Header -->
        <rect x="0" y="0" width="100%" height="80" fill="white" stroke="#e2e8f0" stroke-width="1"/>
        <text x="60" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1f2937">${businessName}</text>
        
        <!-- Hero Section -->
        <rect x="0" y="80" width="100%" height="200" fill="url(#grad1)"/>
        <text x="600" y="160" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle">Welcome to ${businessName}</text>
        <text x="600" y="200" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle">Professional services and solutions</text>
        <rect x="520" y="220" width="160" height="40" rx="20" fill="white"/>
        <text x="600" y="245" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3B82F6" text-anchor="middle">Get Started</text>
        
        <!-- Content Sections -->
        <rect x="100" y="320" width="300" height="180" rx="8" fill="white" stroke="#e2e8f0" stroke-width="1"/>
        <text x="250" y="360" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1f2937" text-anchor="middle">Our Services</text>
        <text x="250" y="390" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">Quality solutions for</text>
        <text x="250" y="410" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">your business needs</text>
        
        <rect x="450" y="320" width="300" height="180" rx="8" fill="white" stroke="#e2e8f0" stroke-width="1"/>
        <text x="600" y="360" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1f2937" text-anchor="middle">About Us</text>
        <text x="600" y="390" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">Learn more about our</text>
        <text x="600" y="410" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">company and values</text>
        
        <rect x="800" y="320" width="300" height="180" rx="8" fill="white" stroke="#e2e8f0" stroke-width="1"/>
        <text x="950" y="360" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1f2937" text-anchor="middle">Contact</text>
        <text x="950" y="390" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">Get in touch with</text>
        <text x="950" y="410" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle">our team today</text>
        
        <!-- Footer -->
        <rect x="0" y="720" width="100%" height="80" fill="#374151"/>
        <text x="600" y="760" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle">© 2024 ${businessName}. All rights reserved.</text>
        
        <!-- Placeholder indicator -->
        <rect x="400" y="600" width="400" height="60" rx="8" fill="rgba(251, 191, 36, 0.1)" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="600" y="620" font-family="Arial, sans-serif" font-size="12" fill="#92400e" text-anchor="middle">📷 SCREENSHOT PLACEHOLDER</text>
        <text x="600" y="640" font-family="Arial, sans-serif" font-size="12" fill="#92400e" text-anchor="middle">Generated homepage preview mockup</text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
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
            ...(homepage ? [{ id: 'homepage', label: 'New Homepage', icon: Code }] : []),
            { id: 'upgrade', label: '🚀 Get New Website', icon: Zap },
            { id: 'technical', label: 'Technical Details', icon: CheckCircle }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 py-2 border-b-2 text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            {/* Sales CTA Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
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
                        <span>NoLimitz.io Team</span>
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
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
              <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-white opacity-5 rounded-full"></div>
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
                      <p className="text-xs text-gray-500 mb-3">{rec.rationale}</p>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Impact:</span>
                          <p className="text-gray-600">{rec.estimated_impact}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Effort:</span>
                          <p className="text-gray-600 capitalize">{rec.estimated_effort}</p>
                        </div>
                        {(rec.estimated_hours || rec.estimated_cost) && (
                          <div>
                            <span className="font-medium text-gray-700">Estimate:</span>
                            <p className="text-gray-600">
                              {rec.estimated_hours && `${rec.estimated_hours}h`}
                              {rec.estimated_cost && ` • $${rec.estimated_cost}`}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* CTA at end of recommendations */}
              <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Don't Want to DIY These Improvements?
                </h3>
                <p className="text-gray-600 mb-4">
                  Let our team implement all {analysis.recommendations.length} recommendations for you in just 7 days
                </p>
                <button
                  onClick={() => setActiveTab('upgrade')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Professional Implementation →
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'homepage' && homepage && (
          <div className="p-6">
            <div className="space-y-6">
              {/* Homepage Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Generated Homepage</h3>
                  <p className="text-gray-600">
                    Created in {Math.round(homepage.generation_time / 1000)}s • Style: {homepage.style_applied}
                    {homepage.screenshot ? ' • Screenshot available' : ' • Preview mockup available'}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={openScreenshotInNewTab}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      homepage.screenshot 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{homepage.screenshot ? 'View Screenshot' : 'View Preview'}</span>
                  </button>
                  <button
                    onClick={downloadHomepage}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download HTML</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Features Included</h4>
                <div className="flex flex-wrap gap-2">
                  {homepage.features_included.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md"
                    >
                      {feature.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Improvement Description */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Estimated Improvement</h4>
                <p className="text-blue-800 text-sm">{homepage.estimated_improvement}</p>
              </div>

              {/* Code Preview */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Code Preview</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{homepage.html_code.substring(0, 500)}...</code>
                  </pre>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Full code: {homepage.html_code.length} characters HTML, {homepage.css_code.length} characters CSS
                </p>
              </div>

              {/* Homepage CTA */}
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Love This Design?</h4>
                    <p className="text-gray-600 text-sm">
                      Get a custom website built by our team with your branding, content, and functionality
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('upgrade')}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Build My Website
                  </button>
                </div>
              </div>
            </div>
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
            {/* Analysis Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Analysis ID</span>
                    <p className="text-sm text-gray-900 font-mono">{analysis.id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Workflow ID</span>
                    <p className="text-sm text-gray-900 font-mono">{result.workflow_id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">AI Model</span>
                    <p className="text-sm text-gray-900">{analysis.ai_model_used}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Confidence Score</span>
                    <p className="text-sm text-gray-900">{Math.round(analysis.confidence_score * 100)}%</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Analyzed At</span>
                    <p className="text-sm text-gray-900">
                      {new Date(analysis.analyzed_at).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Original URL</span>
                    <a 
                      href={analysis.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <span>{analysis.url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Analysis */}
            {analysis.seo_analysis && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Analysis</h3>
                <div className="space-y-4">
                  {analysis.seo_analysis.score && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">SEO Score</span>
                      <p className="text-2xl font-bold text-gray-900">{analysis.seo_analysis.score}/100</p>
                    </div>
                  )}
                  
                  {analysis.seo_analysis.issues.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">SEO Issues</span>
                      <ul className="mt-2 space-y-1">
                        {analysis.seo_analysis.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-red-600">• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {analysis.seo_analysis.opportunities.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">SEO Opportunities</span>
                      <ul className="mt-2 space-y-1">
                        {analysis.seo_analysis.opportunities.map((opportunity, index) => (
                          <li key={index} className="text-sm text-green-600">• {opportunity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}