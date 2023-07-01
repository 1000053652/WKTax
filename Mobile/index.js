/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry,LogBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
if(__DEV__) {
    import('./src/config/reactotron').then(() => console.log('Reactotron Configured'))
  }
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
