#!/bin/bash

# Stop on error
set -e

echo "🔧 Setting up Android SDK environment..."

# Detect home and SDK path
ANDROID_SDK_PATH="$HOME/Android/Sdk"

# 1️⃣ Set environment variables for this shell session
export ANDROID_HOME=$ANDROID_SDK_PATH
export ANDROID_SDK_ROOT=$ANDROID_SDK_PATH
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin

# 2️⃣ Ensure local.properties exists
LOCAL_PROPERTIES_FILE="./android/local.properties"

if [ ! -f "$LOCAL_PROPERTIES_FILE" ]; then
  echo "📄 Creating android/local.properties..."
  mkdir -p ./android
  echo "sdk.dir=$ANDROID_SDK_PATH" > "$LOCAL_PROPERTIES_FILE"
else
  echo "✅ Found existing android/local.properties"
fi

# 3️⃣ Check sdkmanager and licenses
if [ -f "$ANDROID_SDK_PATH/cmdline-tools/latest/bin/sdkmanager" ]; then
  echo "✅ SDK Manager found — accepting licenses..."
  yes | "$ANDROID_SDK_PATH/cmdline-tools/latest/bin/sdkmanager" --licenses > /dev/null
else
  echo "⚠️  sdkmanager not found at $ANDROID_SDK_PATH/cmdline-tools/latest/bin/"
  echo "    Please reinstall Android command-line tools via Android Studio or:"
  echo "    mkdir -p $ANDROID_SDK_PATH/cmdline-tools/latest"
  echo "    Then extract cmdline-tools into that folder."
  exit 1
fi

# 4️⃣ Run EAS local build
echo "🚀 Starting EAS local Android build..."
eas build --platform android --local --profile production

echo "✅ Build finished!"

