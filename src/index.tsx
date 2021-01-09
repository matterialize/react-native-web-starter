import { AppRegistry } from "react-native-web";

// Change repo app path here
import App from "./components/App";

AppRegistry.registerConfig([
  {
    appKey: "App",
    component: () => App,
  },
]);

AppRegistry.runApplication("App", {
  initialProps: {},
  rootTag: document.getElementById("app"),
});
