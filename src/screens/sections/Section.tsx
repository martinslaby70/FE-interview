import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Section as SectionType} from 'redux/types';

const Section: FC<SectionType> = (section) => {
  const {t} = useTranslation();

  return <div>{section.title}</div>;
};

export default Section;
