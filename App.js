import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './src/contexts/MainContext';
import Navigator from './src/navigators/Navigator';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default App;
