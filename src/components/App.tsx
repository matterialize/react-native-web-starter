import React, { FunctionComponent } from "react";
import { hot } from "react-hot-loader";
import { Text, View } from "react-native";

const App: FunctionComponent = () => (
  <View>
    <Text>Welcome react-native-web-starter!</Text>
  </View>
);

declare let module: Record<string, unknown>;

export default hot(module)(App);
