/**
 * API Route: /api/health
 * 
 * Health check endpoint that verifies:
 * 1. Orchestrator service status
 * 2. Connectivity to analyzer service
 * 3. Connectivity to builder service
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const ANALYZER_SERVICE_URL = process.env.ANALYZER_SERVICE_URL || 'http://127.0.0.1:8001';
const BUILDER_SERVICE_URL = process.env.BUILDER_SERVICE_URL || 'http://127.0.0.1:8002';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  uptime: number;
  timestamp: string;
  services: {
    orchestrator: {
      status: 'healthy' | 'unhealthy';
      version: string;
      uptime: number;
    };
    analyzer: {
      status: 'healthy' | 'unhealthy' | 'unreachable';
      url: string;
      response_time?: number;
      version?: string;
    };
    builder: {
      status: 'healthy' | 'unhealthy' | 'unreachable';
      url: string;
      response_time?: number;
      version?: string;
    };
  };
  checks: {
    [key: string]: boolean;
  };
}

const startTime = Date.now();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthStatus>
) {
  const checkStartTime = Date.now();
  
  // Check analyzer service
  let analyzerStatus: HealthStatus['services']['analyzer'] = {
    status: 'unreachable',
    url: ANALYZER_SERVICE_URL
  };
  
  try {
    const analyzerCheckStart = Date.now();
    const analyzerResponse = await axios.get(`${ANALYZER_SERVICE_URL}/health`, {
      timeout: 5000
    });
    
    analyzerStatus = {
      status: analyzerResponse.data?.status === 'healthy' ? 'healthy' : 'unhealthy',
      url: ANALYZER_SERVICE_URL,
      response_time: Date.now() - analyzerCheckStart,
      version: analyzerResponse.data?.version
    };
  } catch (error) {
    console.error('Analyzer health check failed:', error instanceof Error ? error.message : error);
  }

  // Check builder service
  let builderStatus: HealthStatus['services']['builder'] = {
    status: 'unreachable',
    url: BUILDER_SERVICE_URL
  };
  
  try {
    const builderCheckStart = Date.now();
    const builderResponse = await axios.get(`${BUILDER_SERVICE_URL}/health`, {
      timeout: 5000
    });
    
    builderStatus = {
      status: builderResponse.data?.status === 'healthy' ? 'healthy' : 'unhealthy',
      url: BUILDER_SERVICE_URL,
      response_time: Date.now() - builderCheckStart,
      version: builderResponse.data?.version
    };
  } catch (error) {
    console.error('Builder health check failed:', error instanceof Error ? error.message : error);
  }

  // Determine overall status
  const allServicesHealthy = analyzerStatus.status === 'healthy' && builderStatus.status === 'healthy';
  const anyServiceReachable = analyzerStatus.status !== 'unreachable' || builderStatus.status !== 'unreachable';
  
  let overallStatus: HealthStatus['status'];
  if (allServicesHealthy) {
    overallStatus = 'healthy';
  } else if (anyServiceReachable) {
    overallStatus = 'degraded';
  } else {
    overallStatus = 'unhealthy';
  }

  const uptime = Date.now() - startTime;

  const healthStatus: HealthStatus = {
    status: overallStatus,
    version: '1.0.0',
    uptime,
    timestamp: new Date().toISOString(),
    services: {
      orchestrator: {
        status: 'healthy',
        version: '1.0.0',
        uptime
      },
      analyzer: analyzerStatus,
      builder: builderStatus
    },
    checks: {
      orchestrator_ready: true,
      analyzer_reachable: analyzerStatus.status !== 'unreachable',
      analyzer_healthy: analyzerStatus.status === 'healthy',
      builder_reachable: builderStatus.status !== 'unreachable',
      builder_healthy: builderStatus.status === 'healthy',
      all_services_operational: allServicesHealthy
    }
  };

  // Always return 200 for orchestrator health check
  // The orchestrator itself is healthy if it can respond to requests
  // Backend service availability is informational only
  res.status(200).json(healthStatus);
}