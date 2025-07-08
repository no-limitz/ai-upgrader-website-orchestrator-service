/**
 * API Route: /api/analyze
 * 
 * Orchestrates the full website analysis and homepage generation workflow:
 * 1. Calls analyzer service to analyze website
 * 2. Calls builder service to generate improved homepage
 * 3. Returns combined results to frontend
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { withAuth } from '../../middleware/auth';

// Environment variables - configurable service URLs
const ANALYZER_SERVICE_URL = process.env.ANALYZER_SERVICE_URL || 'http://127.0.0.1:8001';
const BUILDER_SERVICE_URL = process.env.BUILDER_SERVICE_URL || 'http://127.0.0.1:8002';

interface AnalyzeRequest {
  url: string;
  include_seo?: boolean;
  max_pages?: number;
  generate_homepage?: boolean;
  style_preference?: string;
  include_booking?: boolean;
}

interface AnalysisResult {
  id: string;
  url: string;
  analyzed_at: string;
  website_content: any;
  business_info: any;
  issues: any[];
  recommendations: any[];
  seo_analysis?: any;
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

interface OrchestratorResponse {
  success: boolean;
  data?: {
    analysis: AnalysisResult;
    homepage?: HomepageResult;
    total_processing_time: number;
    workflow_id: string;
  };
  error?: {
    message: string;
    code: string;
    details?: any;
  };
  timestamp: string;
}

async function analyzeHandler(
  req: NextApiRequest,
  res: NextApiResponse<OrchestratorResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: {
        message: 'Method not allowed',
        code: 'method_not_allowed'
      },
      timestamp: new Date().toISOString()
    });
  }

  const startTime = Date.now();
  const workflowId = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  try {
    // Extract and validate request data
    const {
      url,
      include_seo = true,
      max_pages = 3,
      generate_homepage = true,
      style_preference = 'modern',
      include_booking = false
    }: AnalyzeRequest = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'URL is required',
          code: 'missing_url'
        },
        timestamp: new Date().toISOString()
      });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid URL format',
          code: 'invalid_url'
        },
        timestamp: new Date().toISOString()
      });
    }

    console.log(`🚀 Starting workflow ${workflowId} for URL: ${url}`);
    console.log(`📥 Request body:`, JSON.stringify(req.body, null, 2));
    console.log(`⚙️  Settings: generate_homepage=${generate_homepage}, include_seo=${include_seo}, max_pages=${max_pages}`);

    // Step 1: Analyze website with analyzer service
    console.log(`📊 Step 1: Analyzing website...`);
    let analysisResult: AnalysisResult;
    
    try {
      const analyzerResponse = await axios.post(
        `${ANALYZER_SERVICE_URL}/analyze`,
        {
          url,
          include_seo,
          max_pages
        },
        {
          timeout: 120000, // 2 minutes timeout
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SERVICE_AUTH_TOKEN}`
          }
        }
      );

      if (!analyzerResponse.data?.success) {
        throw new Error(analyzerResponse.data?.error?.message || 'Analysis failed');
      }

      analysisResult = analyzerResponse.data.data;
      console.log(`✅ Analysis completed in ${analysisResult.processing_time}ms`);
      console.log(`📋 Business: ${analysisResult.business_info?.name} (${analysisResult.business_info?.business_type})`);
      console.log(`📊 Found ${analysisResult.recommendations?.length || 0} recommendations`);
      console.log(`🎯 Confidence score: ${analysisResult.confidence_score}`);

    } catch (error) {
      console.error('❌ Analyzer service error:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return res.status(500).json({
          success: false,
          error: {
            message: `Analysis service failed: ${axiosError.message}`,
            code: 'analyzer_service_error',
            details: {
              status: axiosError.response?.status,
              url: ANALYZER_SERVICE_URL
            }
          },
          timestamp: new Date().toISOString()
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          message: 'Website analysis failed',
          code: 'analysis_failed',
          details: { error: error instanceof Error ? error.message : 'Unknown error' }
        },
        timestamp: new Date().toISOString()
      });
    }

    // Step 2: Generate homepage if requested
    let homepageResult: HomepageResult | undefined;
    
    console.log(`🔍 Debug: generate_homepage=${generate_homepage}, business_name="${analysisResult.business_info?.name}"`);
    console.log(`🔗 Service URLs: ANALYZER=${ANALYZER_SERVICE_URL}, BUILDER=${BUILDER_SERVICE_URL}`);
    
    if (generate_homepage && analysisResult.business_info?.name) {
      console.log(`🏗️ Step 2: Generating homepage...`);
      console.log(`📝 Sending to builder: business="${analysisResult.business_info.name}", style="${style_preference}"`);
      
      try {
        const builderResponse = await axios.post(
          `${BUILDER_SERVICE_URL}/generate`,
          {
            analysis_result: analysisResult,
            business_name: analysisResult.business_info.name,
            style_preference,
            include_booking
          },
          {
            timeout: 60000, // 1 minute timeout
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.SERVICE_AUTH_TOKEN}`
            }
          }
        );

        console.log(`📨 Builder response status: ${builderResponse.status}`);
        console.log(`📄 Builder response success: ${builderResponse.data?.success}`);

        if (!builderResponse.data?.success) {
          console.error(`❌ Builder error: ${builderResponse.data?.error?.message || 'Unknown error'}`);
          throw new Error(builderResponse.data?.error?.message || 'Homepage generation failed');
        }

        homepageResult = builderResponse.data.data;
        console.log(`✅ Homepage generated in ${homepageResult.generation_time}ms`);
        console.log(`📄 HTML length: ${homepageResult.html_code?.length || 0} chars`);
        console.log(`🎨 CSS length: ${homepageResult.css_code?.length || 0} chars`);
        console.log(`🌟 Features: ${homepageResult.features_included?.join(', ') || 'none'}`);
        console.log(`📷 Screenshot will be generated next...`);

        // Step 2.5: Generate screenshot of the homepage
        try {
          console.log(`📸 Step 2.5: Generating homepage screenshot...`);
          console.log(`🔗 Screenshot URL: ${BUILDER_SERVICE_URL}/screenshot`);
          console.log(`📊 HTML size: ${homepageResult.html_code?.length || 0} chars for screenshot`);
          
          const screenshotResponse = await axios.post(
            `${BUILDER_SERVICE_URL}/screenshot`,
            {
              html_code: homepageResult.html_code,
              css_code: homepageResult.css_code,
              format: 'png',
              viewport: 'desktop'
            },
            {
              timeout: 30000, // 30 seconds timeout for screenshot
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.SERVICE_AUTH_TOKEN}`
              }
            }
          );

          console.log(`📨 Screenshot response status: ${screenshotResponse.status}`);
          console.log(`📄 Screenshot response success: ${screenshotResponse.data?.success}`);

          if (screenshotResponse.data?.success) {
            homepageResult.screenshot = screenshotResponse.data.data.screenshot;
            const screenshotSize = screenshotResponse.data.data.screenshot?.length || 0;
            console.log(`✅ Screenshot generated in ${screenshotResponse.data.data.generation_time}ms`);
            console.log(`📷 Screenshot data size: ${screenshotSize} chars (base64)`);
          } else {
            console.error(`❌ Screenshot failed: ${screenshotResponse.data?.error || 'Unknown error'}`);
            console.error(`📋 Screenshot error details:`, screenshotResponse.data);
          }
        } catch (error) {
          console.error('⚠️ Screenshot generation error (non-fatal):', error);
          if (axios.isAxiosError(error)) {
            console.error(`📨 Screenshot request failed - Status: ${error.response?.status}`);
            console.error(`📄 Screenshot error response:`, error.response?.data);
            console.error(`🔗 Screenshot URL attempted: ${error.config?.url}`);
          }
          // Screenshot failure is non-fatal
        }

      } catch (error) {
        console.error('⚠️ Builder service error (non-fatal):', error);
        if (axios.isAxiosError(error)) {
          console.error('Builder service response:', error.response?.data);
          console.error('Builder service status:', error.response?.status);
        }
        // Homepage generation failure is non-fatal - we still return the analysis
      }
    }

    const totalProcessingTime = Date.now() - startTime;

    console.log(`🎉 Workflow ${workflowId} completed in ${totalProcessingTime}ms`);
    console.log(`📊 Final results summary:`);
    console.log(`   - Analysis: ✅ (${analysisResult.confidence_score} confidence)`);
    console.log(`   - Homepage: ${homepageResult ? '✅' : '❌'} ${homepageResult ? `(${homepageResult.features_included?.length || 0} features)` : ''}`);
    console.log(`   - Screenshot: ${homepageResult?.screenshot ? '✅' : '❌'} ${homepageResult?.screenshot ? `(${homepageResult.screenshot.length} chars)` : ''}`);
    console.log(`🔚 End of workflow ${workflowId}`);

    // Return successful response
    return res.status(200).json({
      success: true,
      data: {
        analysis: analysisResult,
        homepage: homepageResult,
        total_processing_time: totalProcessingTime,
        workflow_id: workflowId
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`❌ Workflow ${workflowId} failed:`, error);

    return res.status(500).json({
      success: false,
      error: {
        message: 'Workflow execution failed',
        code: 'workflow_failed',
        details: {
          workflow_id: workflowId,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      timestamp: new Date().toISOString()
    });
  }
}

// Export the handler wrapped with authentication
export default withAuth(analyzeHandler);