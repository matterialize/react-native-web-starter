import { Image, View } from "react-native-web";

// Custom react-native exports
export const requireNativeComponent = () => ({ children, ...props }) => (
  <View {...props}>{children}</View>
);

Image.resolveAssetSource = ({ uri, width, height }) => ({
  uri,
  width,
  height,
});

export * from "react-native-web";
