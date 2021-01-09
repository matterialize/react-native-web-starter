const { resolve } = require("path");

const directoryLocation = [__dirname, ".."];

module.exports = {
  // react-native-web integration
  "react-native$": resolve(
    ...directoryLocation,
    "node_module_overrides",
    "react-native-web",
  ),

  // react-native-gesture-handler integration
  // (comment this out if not using react native gesture handler)
  "./RNGestureHandlerModule": resolve(
    ...directoryLocation,
    "node_modules",
    "react-native-gesture-handler",
    "RNGestureHandlerModule.web.js",
  ),
  "./GestureHandlerButton": resolve(
    ...directoryLocation,
    "node_modules",
    "react-native-gesture-handler",
    "GestureHandlerButton.web.js",
  ),
  "./GestureComponents": resolve(
    ...directoryLocation,
    "node_modules",
    "react-native-gesture-handler",
    "GestureComponents.web.js",
  ),
  "./PlatformConstants": resolve(
    ...directoryLocation,
    "node_modules",
    "react-native-gesture-handler",
    "PlatformConstants.web.js",
  ),

  // Add all custom integrations here
};
