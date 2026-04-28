#!/bin/bash

# NexaSphere Clean: VPS Setup Script
# Run this on your Hostinger VPS (root@72.62.162.228)

echo "🚀 Starting VPS Setup for NexaSphere Clean..."

# 1. Update System
apt-get update && apt-get upgrade -y

# 2. Install Docker
echo "📦 Installing Docker..."
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce

# 3. Install Docker Compose
echo "🐳 Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 4. Install Git
echo "Git check..."
apt-get install -y git

# 5. Setup Firewall
echo "🔥 Setting up Firewall..."
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

echo "✅ VPS Setup Complete! You can now deploy via GitHub Actions."
