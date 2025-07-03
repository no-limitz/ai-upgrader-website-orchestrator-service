/**
 * Sales CTA Component for NoLimitz.io Website Building Services
 * 
 * Converts analysis results into sales opportunities by showing:
 * - Value propositions based on identified issues
 * - Pricing and timeline
 * - Lead capture form
 */

import { useState } from 'react';
import { 
  Zap, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  X
} from 'lucide-react';

interface AnalysisResult {
  business_info: {
    name: string;
    business_type: string;
    industry: string;
  };
  recommendations: Array<{
    title: string;
    priority: number;
    estimated_impact: string;
    estimated_hours?: number;
    estimated_cost?: number;
  }>;
  issues: any[];
  confidence_score: number;
}

interface SalesCTAProps {
  analysisResult: AnalysisResult;
  onClose?: () => void;
}

export default function SalesCTA({ analysisResult, onClose }: SalesCTAProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: analysisResult?.business_info?.name || '',
    timeline: 'asap',
    budget: '500-1000',
    requirements: '',
    improvements: '',
    contactTime: 'any'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate potential value based on analysis
  const highPriorityIssues = analysisResult?.recommendations?.filter(rec => rec.priority <= 2).length || 0;
  const estimatedValue = Math.min(highPriorityIssues * 1200, 5000);

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-8 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Our team will contact you within 24 hours to discuss your new website project.
          </p>
          <div className="bg-white p-4 rounded-lg border">
            <p className="text-sm text-gray-500">
              📧 Confirmation sent to <strong>{formData.email}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          <span>SPECIAL OFFER</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Get Your New Website in 7 Days
        </h2>
        <p className="text-xl text-gray-600">
          Professional website redesign starting at <span className="font-bold text-blue-600">$500</span>
        </p>
      </div>

      {/* Value Props based on analysis */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">7-Day Delivery</div>
          <div className="text-sm text-gray-600">Lightning fast turnaround</div>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">{highPriorityIssues}+ Issues Fixed</div>
          <div className="text-sm text-gray-600">Based on your analysis</div>
        </div>
        <div className="bg-white p-4 rounded-lg border text-center">
          <Rocket className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <div className="font-semibold text-gray-900">${estimatedValue}+ Value</div>
          <div className="text-sm text-gray-600">Estimated ROI boost</div>
        </div>
      </div>

      {/* Issues identified */}
      {analysisResult?.recommendations && analysisResult.recommendations.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">🔧 We'll Fix These Issues:</h3>
          <div className="space-y-2">
            {analysisResult.recommendations.slice(0, 3).map((rec, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{rec.title}</span>
                {rec.priority <= 2 && (
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                    HIGH PRIORITY
                  </span>
                )}
              </div>
            ))}
            {analysisResult.recommendations.length > 3 && (
              <div className="text-sm text-gray-500 font-medium">
                + {analysisResult.recommendations.length - 3} more improvements
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lead Capture Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="asap">ASAP (Rush +$200)</option>
              <option value="1week">1 Week</option>
              <option value="2weeks">2 Weeks</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2500">$1,000 - $2,500</option>
              <option value="2500-5000">$2,500 - $5,000</option>
              <option value="5000+">$5,000+</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What do you want in your new website?
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Modern design, online booking, better mobile experience, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What don't you like about your current website?
          </label>
          <textarea
            name="improvements"
            value={formData.improvements}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Looks outdated, hard to navigate, not mobile-friendly, etc."
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">Package Includes:</span>
            <span className="text-lg font-bold text-green-600">Starting at $500</span>
          </div>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Responsive Design</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>SEO Optimization</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Fast Loading Speed</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Mobile Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Contact Forms</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free 30-Day Support</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>Get My New Website - $500</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          🔒 Your information is secure. We'll contact you within 24 hours with a custom quote.
        </p>
      </form>
    </div>
  );
}