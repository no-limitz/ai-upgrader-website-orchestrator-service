/**
 * Authentication Middleware
 * 
 * Simple bearer token authentication for service-to-service communication.
 * Validates requests against a static token stored in environment variables.
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface AuthenticatedNextApiRequest extends NextApiRequest {
  authenticated?: boolean;
}

/**
 * Extract bearer token from Authorization header
 */
function extractBearerToken(authHeader?: string): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  
  return null;
}

/**
 * Authentication middleware wrapper
 * 
 * Usage:
 * export default withAuth(async (req, res) => {
 *   // Your protected API logic here
 * });
 */
export function withAuth(
  handler: (req: AuthenticatedNextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    try {
      // Extract token from Authorization header
      const token = extractBearerToken(req.headers.authorization);
      
      // Get expected token from environment
      const expectedToken = process.env.SERVICE_AUTH_TOKEN;
      
      // Validate environment configuration
      if (!expectedToken) {
        console.error('⚠️ SERVICE_AUTH_TOKEN not configured');
        return res.status(500).json({
          success: false,
          error: {
            message: 'Authentication not properly configured',
            code: 'auth_not_configured'
          },
          timestamp: new Date().toISOString()
        });
      }
      
      // Validate token
      if (!token) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Missing authentication token',
            code: 'missing_token',
            details: 'Authorization header with Bearer token required'
          },
          timestamp: new Date().toISOString()
        });
      }
      
      if (token !== expectedToken) {
        return res.status(401).json({
          success: false,
          error: {
            message: 'Invalid authentication token',
            code: 'invalid_token'
          },
          timestamp: new Date().toISOString()
        });
      }
      
      // Mark request as authenticated
      req.authenticated = true;
      
      // Call the actual handler
      return handler(req, res);
      
    } catch (error) {
      console.error('❌ Auth middleware error:', error);
      return res.status(500).json({
        success: false,
        error: {
          message: 'Authentication error',
          code: 'auth_error',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        timestamp: new Date().toISOString()
      });
    }
  };
}

/**
 * Optional: Middleware for endpoints that can work with or without auth
 * Validates token if present, but doesn't require it
 */
export function withOptionalAuth(
  handler: (req: AuthenticatedNextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    try {
      const token = extractBearerToken(req.headers.authorization);
      const expectedToken = process.env.SERVICE_AUTH_TOKEN;
      
      if (token && expectedToken && token === expectedToken) {
        req.authenticated = true;
      } else {
        req.authenticated = false;
      }
      
      return handler(req, res);
      
    } catch (error) {
      console.error('❌ Optional auth middleware error:', error);
      // Continue without authentication
      req.authenticated = false;
      return handler(req, res);
    }
  };
}

/**
 * Utility to check if request is authenticated
 * Use within API handlers after withAuth/withOptionalAuth
 */
export function isAuthenticated(req: AuthenticatedNextApiRequest): boolean {
  return req.authenticated === true;
}