import {StrictMode, Suspense} from 'react';
import ReactDOM from 'react-dom';

import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';

import WebVitals from './WebVitals';
import GlobalStyles from './GlobalStyles';
import App from './App';
import {store} from './store';
import theme from './theme';

import './i18n';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={null}>
      <Provider store={store}>
        <ChakraProvider theme={theme} resetCSS>
          <HelmetProvider>
            <App />
            <GlobalStyles />
            <WebVitals showStatusInConsoleLog />
          </HelmetProvider>
        </ChakraProvider>
      </Provider>
    </Suspense>
  </StrictMode>,
  MOUNT_NODE
);
