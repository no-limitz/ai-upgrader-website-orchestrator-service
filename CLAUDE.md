# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the AI Web Upgrader - Orchestrator Service, a Next.js application that serves as the frontend web interface and API orchestrator for the AI Web Upgrader POC system. It coordinates communication between the analyzer and builder services while providing a user-friendly interface for website analysis and homepage generation.

## Architecture

The service follows a modern Next.js architecture:

1. **Frontend Layer** (`src/pages/index.tsx`): React-based user interface
2. **API Layer** (`src/pages/api/`): Next.js API routes for service orchestration
3. **Component Layer** (`src/components/`): Reusable React components
4. **Styling Layer** (`src/styles/`): Tailwind CSS styling

The orchestrator performs this workflow:
1. Accepts website URLs from users via the web interface
2. Orchestrates calls to the analyzer service for website analysis
3. Optionally calls the builder service for homepage generation
4. Presents results in an intuitive, responsive interface
5. Provides progress tracking and error handling

## Deployment Notes

### Coolify Deployment
When deploying with Coolify:
- Coolify typically sets `PORT=3000` environment variable
- The health check in Dockerfile uses `${PORT:-3000}` to adapt to Coolify's port setting
- Next.js standalone output is optimized for container deployment
- Ensure your Coolify configuration sets the required environment variables

### Port Configuration
The service uses the `PORT` environment variable with fallback to 3000:
- Default: 3000 (Next.js standard)
- Coolify: Usually 3000 (matches default)
- Health check adapts to whatever port is configured

## Common Development Commands

### Development Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Docker Operations
```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f orchestrator

# Stop services
docker-compose down
```

### Testing
```bash
# Run comprehensive tests
./scripts/test.sh

# Manual testing
curl http://localhost:3000/api/health
open http://localhost:3000
```

### Deployment
```bash
# Deploy service
./scripts/deploy.sh

# Stop service
./scripts/stop.sh
```

## Key Configuration

### Environment Variables
The service requires these environment variables in `.env`:
- `NODE_ENV`: Environment mode (default: production)
- `PORT`: Service port (default: 3000)
- `NEXT_PUBLIC_API_URL`: Public API URL for client-side requests
- `ANALYZER_SERVICE_URL`: Internal URL for analyzer service (default: http://analyzer:8001)
- `BUILDER_SERVICE_URL`: Internal URL for builder service (default: http://builder:8002)

### API Endpoints
- `GET /api/health`: Health check and service status
- `POST /api/analyze`: Website analysis orchestration
- `GET /`: Main application interface

### Service Integration
- **Analyzer Service**: Proxied via `/api/analyze` routes
- **Builder Service**: Proxied via `/api/generate` routes
- **Direct Integration**: API calls orchestrated through Next.js API routes

## Code Structure Guidelines

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update API routes in `src/pages/api/`
4. Add styles in `src/styles/` or use Tailwind classes
5. Update TypeScript interfaces for type safety

### Component Patterns
- Use functional components with TypeScript
- Implement proper error boundaries
- Add loading states for async operations
- Include accessibility attributes
- Use Tailwind CSS for styling

### API Integration Patterns
- Use Next.js API routes for service orchestration
- Implement proper error handling and response formatting
- Add request validation and sanitization
- Include progress tracking for long-running operations

## Development Notes

### Next.js Configuration
The service uses advanced Next.js features:
- Standalone output for optimized Docker deployment
- API route rewrites for service proxy functionality
- Custom CORS headers for development
- Image optimization configuration

### Component Architecture
- **AnalysisForm**: URL input and validation
- **AnalysisResults**: Display analysis results and recommendations
- **LoadingSpinner**: Progress tracking during analysis
- **SalesCTA**: Conversion components for business leads

### State Management
- Uses React hooks for local state management
- React Hot Toast for user notifications
- Progress tracking with real-time updates
- Error handling with user-friendly messages

## Performance Considerations

### Frontend Optimization
- Next.js automatic code splitting
- Optimized image loading
- Tailwind CSS purging for minimal bundle size
- React component optimization

### API Orchestration
- Efficient service-to-service communication
- Request/response caching where appropriate
- Error handling with retry logic
- Progress tracking for better UX

### Docker Optimization
- Multi-stage build for minimal image size
- Standalone output for faster startup
- Non-root user for security
- Health checks for container orchestration

## Security Notes

- Environment variable configuration for sensitive data
- CORS configuration for API security
- Request validation and sanitization
- Non-root container execution
- Secure service-to-service communication

## Testing Strategy

The test script (`scripts/test.sh`) runs comprehensive tests including:
- Health checks and service availability
- Home page loading and rendering
- API endpoint functionality
- Performance and load time testing
- Error handling validation

## User Interface Design

### Design System
- **Colors**: Blue and purple gradient theme
- **Typography**: Responsive text sizing with Tailwind classes
- **Components**: Card-based layout with hover effects
- **Icons**: Lucide React icon library
- **Animations**: Subtle transitions and loading states

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Responsive typography and spacing
- Adaptive navigation and layout
- Touch-friendly interface elements

### User Experience
- Progress tracking during analysis
- Real-time status updates
- Error messaging with recovery options
- Quick demo examples for testing

## Integration Architecture

### Service Mesh
- **Frontend**: Serves user interface and handles user interactions
- **API Gateway**: Routes requests to appropriate backend services
- **Service Discovery**: Uses Docker networking for service resolution
- **Error Handling**: Graceful degradation when services are unavailable

### Data Flow
1. User submits website URL via frontend form
2. Frontend calls `/api/analyze` with URL
3. API route orchestrates analyzer service call
4. Results are processed and formatted for display
5. Optional builder service integration for homepage generation
6. Real-time progress updates provided to user

## Monitoring and Logging

- Health endpoint provides service status and dependency checks
- Request/response logging for debugging
- Error tracking and user notification
- Performance monitoring for page load times
- Container logs with rotation and limits

## Business Features

### Analysis Workflow
- URL validation and normalization
- Progress tracking with step-by-step updates
- Result display with business intelligence
- Recommendation prioritization and cost estimation

### User Engagement
- Sample website suggestions for demo
- Clear call-to-action elements
- Contact information capture
- Progress visualization and status updates

### Conversion Optimization
- Professional design and branding
- Trust indicators and social proof
- Clear value proposition presentation
- Easy-to-use interface with minimal friction

## Deployment Patterns

### Development
```bash
npm run dev  # Local development with hot reload
```

### Production
```bash
npm run build && npm start  # Optimized production build
```

### Docker
```bash
docker-compose up -d  # Containerized deployment
```

### Platform Deployment
- Supports Vercel, Netlify, and other Next.js platforms
- Docker deployment for self-hosting
- Coolify integration for simplified deployment
- Environment variable configuration for all platforms