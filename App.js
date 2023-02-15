import {StatusBar} from 'expo-status-bar';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
      <StatusBar style="auto" />
    </MainProvider>
  );
};

export default App;
