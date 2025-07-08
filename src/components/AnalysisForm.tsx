/**
 * AnalysisForm Component
 * 
 * Form for inputting website URL and analysis preferences
 */

import { useState } from 'react';
import { Globe, Loader2, Search, Settings } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (url: string, options?: AnalysisOptions) => void;
  isLoading: boolean;
}

interface AnalysisOptions {
  include_seo: boolean;
  max_pages: number;
  generate_homepage: boolean;
  style_preference: string;
  include_booking: boolean;
}

export default function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [url, setUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState<AnalysisOptions>({
    include_seo: true,
    max_pages: 3,
    generate_homepage: true,
    style_preference: 'modern',
    include_booking: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim(), options);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const urlIsValid = url === '' || isValidUrl(url);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Main URL Input */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          Website URL
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com"
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              urlIsValid 
                ? 'border-gray-300 hover:border-gray-400' 
                : 'border-red-300 bg-red-50'
            }`}
            required
            disabled={isLoading}
          />
        </div>
        {!urlIsValid && url !== '' && (
          <p className="mt-2 text-sm text-red-600">
            Please enter a valid URL (including http:// or https://)
          </p>
        )}
      </div>

      {/* Advanced Options Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          disabled={isLoading}
        >
          <Settings className="w-4 h-4" />
          <span>Advanced Options</span>
          <span className="text-xs text-gray-400">
            {showAdvanced ? '(hide)' : '(show)'}
          </span>
        </button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium text-gray-900">Analysis Options</h4>
          
          {/* SEO Analysis */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="include_seo"
              checked={options.include_seo}
              onChange={(e) => setOptions(prev => ({ ...prev, include_seo: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="include_seo" className="text-sm text-gray-700">
              Include search engine visibility check
            </label>
          </div>

          {/* Max Pages */}
          <div>
            <label htmlFor="max_pages" className="block text-sm text-gray-700 mb-1">
              Maximum pages to analyze: {options.max_pages}
            </label>
            <input
              type="range"
              id="max_pages"
              min="1"
              max="10"
              value={options.max_pages}
              onChange={(e) => setOptions(prev => ({ ...prev, max_pages: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={isLoading}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 page</span>
              <span>10 pages</span>
            </div>
          </div>

          <h4 className="font-medium text-gray-900 mt-6">Homepage Generation</h4>
          
          {/* Generate Homepage */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="generate_homepage"
              checked={options.generate_homepage}
              onChange={(e) => setOptions(prev => ({ ...prev, generate_homepage: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="generate_homepage" className="text-sm text-gray-700">
              Generate improved homepage
            </label>
          </div>

          {/* Style Preference */}
          {options.generate_homepage && (
            <>
              <div>
                <label htmlFor="style_preference" className="block text-sm text-gray-700 mb-1">
                  Design Style
                </label>
                <select
                  id="style_preference"
                  value={options.style_preference}
                  onChange={(e) => setOptions(prev => ({ ...prev, style_preference: e.target.value }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="modern">Modern</option>
                  <option value="professional">Professional</option>
                  <option value="minimal">Minimal</option>
                  <option value="bold">Bold</option>
                  <option value="classic">Classic</option>
                </select>
              </div>

              {/* Include Booking */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="include_booking"
                  checked={options.include_booking}
                  onChange={(e) => setOptions(prev => ({ ...prev, include_booking: e.target.checked }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="include_booking" className="text-sm text-gray-700">
                  Include booking/appointment system
                </label>
              </div>
            </>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!url.trim() || !urlIsValid || isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing Website...</span>
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            <span>Check My Website</span>
          </>
        )}
      </button>

      {/* Quick Test URLs */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Quick test with sample URLs:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setUrl('https://example.com')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
            disabled={isLoading}
          >
            example.com
          </button>
          <button
            type="button"
            onClick={() => setUrl('https://www.weatherfordschoolhouse.com')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
            disabled={isLoading}
          >
            weatherfordschoolhouse.com
          </button>
          <button
            type="button"
            onClick={() => setUrl('https://nolimitz.io')}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
            disabled={isLoading}
          >
            nolimitz.io
          </button>
        </div>
      </div>
    </form>
  );
}