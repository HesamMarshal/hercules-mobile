import { registerRootComponent } from 'expo';

import { AppRegistry, I18nManager } from 'react-native';

import App from './App';

// import { expo as appName } from './app.json';
const appName = 'Arnad'; // Use the same name as in app.json

// Force RTL on startup for Persian
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// AppRegistry.registerComponent(appName, () => App);
