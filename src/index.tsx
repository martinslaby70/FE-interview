import {StrictMode, Suspense} from 'react';
import ReactDOM from 'react-dom';

import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ChakraProvider} from '@chakra-ui/react';

import WebVitals from './WebVitals';
import GlobalStyles from './GlobalStyles';
import App from './App';
import {store, storePersistor} from './redux/store';
import theme from './theme';

import './i18n';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={null}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={storePersistor}>
          <ChakraProvider theme={theme} resetCSS>
            <HelmetProvider>
              <App />
              <GlobalStyles />
              <WebVitals showStatusInConsoleLog />
            </HelmetProvider>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  </StrictMode>,
  MOUNT_NODE
);
