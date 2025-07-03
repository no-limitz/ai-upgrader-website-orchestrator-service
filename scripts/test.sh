#!/bin/bash

# AI Web Upgrader - Orchestrator Service Testing Script

set -e

echo "🧪 Testing AI Web Upgrader Orchestrator Service..."

# Set default port if not provided
PORT=${PORT:-3000}
BASE_URL="http://localhost:${PORT}"

# Function to test endpoint
test_endpoint() {
    local endpoint=$1
    local method=${2:-GET}
    local expected_status=${3:-200}
    local description=$4
    
    echo "Testing ${method} ${endpoint} - ${description}"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "${BASE_URL}${endpoint}")
    else
        response=$(curl -s -w "\n%{http_code}" -X "${method}" -H "Content-Type: application/json" "${BASE_URL}${endpoint}")
    fi
    
    status_code=$(echo "$response" | tail -n1)
    response_body=$(echo "$response" | head -n -1)
    
    if [ "$status_code" = "$expected_status" ]; then
        echo "✅ ${description} - Status: ${status_code}"
    else
        echo "❌ ${description} - Expected: ${expected_status}, Got: ${status_code}"
        echo "Response: ${response_body}"
        return 1
    fi
}

# Test 1: Health Check
echo "1️⃣ Testing Health Check..."
test_endpoint "/api/health" "GET" "200" "Health check endpoint"

# Test 2: Home page
echo "2️⃣ Testing Home Page..."
test_endpoint "/" "GET" "200" "Home page"

# Test 3: Next.js API health check
echo "3️⃣ Testing Next.js API..."
test_endpoint "/api/health" "GET" "200" "Next.js API health"

# Test 4: Invalid endpoint (404 test)
echo "4️⃣ Testing 404 Handling..."
test_endpoint "/invalid-endpoint" "GET" "404" "404 error handling"

# Test 5: Check if static assets load
echo "5️⃣ Testing Static Assets..."
test_endpoint "/_next/static/css" "GET" "404" "CSS assets (expected 404 for specific file)"

# Performance test - check page load times
echo "6️⃣ Testing Performance..."
for i in {1..3}; do
    start_time=$(date +%s%N)
    curl -s "${BASE_URL}/" > /dev/null
    end_time=$(date +%s%N)
    duration=$((($end_time - $start_time) / 1000000))
    echo "Load time attempt $i: ${duration}ms"
done

echo ""
echo "🎉 All tests completed!"
echo "📊 Service Status:"
curl -s "${BASE_URL}/api/health" | grep -o '"status":"[^"]*"' || echo "Could not get status"

echo ""
echo "🌐 Open the application at: ${BASE_URL}"