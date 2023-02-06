import {ThemeProvider} from '@mui/material/styles';
import {useRoutes} from 'react-router-dom';
import routes from './route/index';
import theme from './theme';
import {Provider} from 'react-redux';
import store from './store/index';
import {Toaster} from 'react-hot-toast';
const App = () => {
  const routing = useRoutes(routes(false));
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" />
        {routing}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
