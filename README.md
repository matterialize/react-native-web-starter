# react-native-web-starter

## Preface

This starter is for react-native projects that have a lot of native integrations and need a web project that allows for full customization.

## React Native Repo Integration

1. While in the root directory add React Native repo by submodule with

```bash
git submodule add {repo url}
```

2. Include repo in `tsconfig.json`:

```js
{
  ...,
  "include": [
    "./src/**/*",
    // Add your repo source files
    "./{repo name}/src/**/*"
  ],
  ...
}
```

3. Change the imported App file in `index.tsx` to react-native app:

```typescript
import App from "../{repo name}/src/components/App";
```

4. Install packages in this repo and react-native repo

```bash
yarn install && cd ./{repo name} && yarn install
```

5. Trickiest step that depends on your native integrations. The basic formula is to override native node_modules with a custom integration until the project runs. Examples are shown below:

### Example of common overridden modules

#### react-native-config

1. Create a node module override file: `node_module_overrides/react-native-config.ts`:

```typescript
const { env } = process;

export default env;
```

2. Add resolve to `node_module_overrides/webpack-alias.js`:

```javascript
{
  "react-native-config": resolve(
    ...directoryLocation,
    "node_module_overrides",
    "react-native-config",
  ),
}
```

3. Add the dotenv webpack integration package in this repo:

```bash
yarn add -D dotenv dotenv-webpack
```

4. Update the webpack configs:

`webpack/dev.js`

```javascript
const dotenv = require("dotenv");

...

{
  ...,
  plugins: [
    ...,
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        ...dotenv.config({
          path: resolve(__dirname, "..", "{repo name}", ".env"),
        }).parsed,
      },
    }),
  ]
  ...
}
```

`webpack/prod.js`

```javascript
const dotenv = require("dotenv");

...

{
  ...,
  plugins: [
    ...,
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        ...dotenv.config({
          path: resolve(__dirname, "..", "{repo name}", ".env.prod"),
        }).parsed,
      },
    }),
  ]
  ...
}
```

#### react-native-device-info
1. Create a node module override file: `node_module_overrides/react-native-device-info.ts`:

```typescript
export default {
  hasNotch: () => false,
  getDevice: () => navigator.userAgent,
};
```

2. Add resolve to `node_module_overrides/webpack-alias.js`:

```javascript
{
  "react-native-device-info": resolve(
    ...directoryLocation,
    "node_module_overrides",
    "react-native-device-info",
  ),
}
```

### Development

`yarn run start-dev`

- Build app continuously (HMR enabled)
- App served at `http://localhost:8080`

### Production

`yarn run start-prod`

- Build app once (HMR disabled) to `/dist/`
- App served at `http://localhost:3000`

---

### All commands

| Command               | Description                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `yarn run start-dev`  | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`      |
| `yarn run start-prod` | Build app once (HMR disabled) to `/dist/` and serve @ `http://localhost:3000` |
| `yarn run build`      | Build app to `/dist/`                                                         |
| `yarn run lint`       | Run linter                                                                    |
| `yarn run lint --fix` | Run linter and fix issues                                                     |
| `yarn run start`      | (alias of `yarn run start-dev`)                                               |

**Note**: replace `yarn` with `npm` in `package.json` if you use npm.

## How it Works

There are custom babel and webpack configs the compile all of the source code from mydoh-mobile with node module overrides.

## Important files for adding more custom features

| File location | Description |
| - | - |
| babel.config.js | Babel configuration |
| webpack/common.js | Webpack overall configuration |
| webpack/dev.js | Webpack dev only configuration |
| webpack/prod.js | Webpack prod only configuration |
| node_module_overrides/\* | Files used in webpack aliasing to override node_module packages |
| patches | Patches used to override node_modules that cannot be overriden in webpack aliasing |
| src/\*/ | Directory with all of the local files. Please import "react-native-web" for this files when possible. |
