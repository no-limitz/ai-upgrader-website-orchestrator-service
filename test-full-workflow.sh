#!/bin/bash

echo "🧪 Testing full workflow with homepage generation..."

# Test URL
URL="https://example.com"

# Make the request with homepage generation enabled
echo "📡 Sending request to orchestrator..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "'$URL'",
    "include_seo": true,
    "max_pages": 3,
    "generate_homepage": true,
    "style_preference": "modern",
    "include_booking": false
  }')

# Check if successful
SUCCESS=$(echo "$RESPONSE" | jq -r '.success')
if [ "$SUCCESS" = "true" ]; then
  echo "✅ Request successful!"
  
  # Extract key data
  WORKFLOW_ID=$(echo "$RESPONSE" | jq -r '.data.workflow_id')
  BUSINESS_NAME=$(echo "$RESPONSE" | jq -r '.data.analysis.business_info.name')
  HOMEPAGE_ID=$(echo "$RESPONSE" | jq -r '.data.homepage.id // "N/A"')
  HTML_LENGTH=$(echo "$RESPONSE" | jq -r '.data.homepage.html_code // "" | length')
  FEATURES=$(echo "$RESPONSE" | jq -r '.data.homepage.features_included // [] | length')
  
  echo "📊 Results:"
  echo "   Workflow ID: $WORKFLOW_ID"
  echo "   Business: $BUSINESS_NAME"
  echo "   Homepage ID: $HOMEPAGE_ID"
  echo "   HTML Length: $HTML_LENGTH chars"
  echo "   Features: $FEATURES"
  
  # Check if homepage was generated
  if [ "$HOMEPAGE_ID" != "N/A" ] && [ "$HTML_LENGTH" -gt 0 ]; then
    echo "🎉 Homepage generation successful!"
    echo "📄 Homepage data is present in the response"
  else
    echo "❌ Homepage generation failed or missing"
    echo "🔍 Debugging info:"
    echo "$RESPONSE" | jq '.data.homepage'
  fi
else
  echo "❌ Request failed!"
  ERROR=$(echo "$RESPONSE" | jq -r '.error.message // "Unknown error"')
  echo "   Error: $ERROR"
  echo "🔍 Full response:"
  echo "$RESPONSE" | jq
fi

echo "✅ Test complete!"