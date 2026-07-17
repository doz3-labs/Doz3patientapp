const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("cjs");

// NativeWind v4 metro wrapper: uncomment below on macOS/Linux.
// On Windows, the ESM loader has a known incompatibility with absolute paths.
// const { withNativeWind } = require("nativewind/metro");
// module.exports = withNativeWind(config, { input: "./global.css" });
module.exports = config;

