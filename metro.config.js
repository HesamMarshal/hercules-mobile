const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for RTL
config.resolver.assetExts.push('ttf', 'otf');

module.exports = config;
