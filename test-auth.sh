#!/bin/bash

# Test authentication for orchestrator service

echo "🔐 Testing Authentication for Orchestrator Service"
echo "================================================"

# Base URL - update if running on different port
BASE_URL="http://localhost:3000"
API_ENDPOINT="$BASE_URL/api/analyze"

# Test URL to analyze
TEST_URL="https://example.com"

# Token from .env file (you'll need to update this)
AUTH_TOKEN="dfee8ad40f966506d0be30636951fbfa555773d9ef6e6233d0adff6078eab946"

echo ""
echo "📍 Testing endpoint: $API_ENDPOINT"
echo ""

# Test 1: No authentication token
echo "1️⃣ Test without authentication token:"
echo "-------------------------------------"
curl -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$TEST_URL\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "2️⃣ Test with invalid token:"
echo "---------------------------"
curl -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer invalid-token-12345" \
  -d "{\"url\": \"$TEST_URL\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "3️⃣ Test with valid token:"
echo "------------------------"
curl -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -d "{\"url\": \"$TEST_URL\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "4️⃣ Test health endpoint (should be public):"
echo "------------------------------------------"
curl -X GET "$BASE_URL/api/health" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo ""
echo "✅ Authentication tests complete!"
echo ""
echo "Expected results:"
echo "- Test 1: 401 Unauthorized (missing token)"
echo "- Test 2: 401 Unauthorized (invalid token)"
echo "- Test 3: 200 OK or service error (valid token)"
echo "- Test 4: 200 OK (public endpoint)"