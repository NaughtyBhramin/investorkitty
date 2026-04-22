#!/bin/bash

# InvestorKitty Demo Setup Script
# This script initializes demo accounts for testing

set -e

echo "🚀 InvestorKitty Demo Setup"
echo "================================"
echo ""

# Check if the server is running
echo "📍 Checking if server is running on http://localhost:3000..."
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "❌ Server is not running!"
    echo "   Please start the server first: npm run dev"
    exit 1
fi

echo "✅ Server is running"
echo ""

# Set up demo accounts
echo "📝 Setting up demo accounts..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/setup-demo \
  -H "Content-Type: application/json" \
  -H "x-setup-token: dev-token")

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "✅ Demo accounts created successfully!"
    echo ""
    echo "🎯 You can now test with:"
    echo ""
    echo "Founder Account:"
    echo "  📧 Email: demo-founder@investorkitty.com"
    echo "  🔑 Password: DemoPassword123!"
    echo ""
    echo "Investor Account:"
    echo "  📧 Email: demo-investor@investorkitty.com"
    echo "  🔑 Password: DemoPassword123!"
    echo ""
    echo "🔗 Go to: http://localhost:3000/sign-in"
else
    echo "❌ Failed to create demo accounts"
    echo "Response: $RESPONSE"
    exit 1
fi
