import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';

import Navbar from 'screens/Navbar';
import Sections from 'screens/Body';

function App() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>

      <Navbar />
      <Sections />
    </>
  );
}

export default App;
