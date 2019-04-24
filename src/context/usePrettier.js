import { useState } from 'react';
import { UserProvider } from './user';

const usePrettier = (code, language) => {
  const [prettierCode, setPrettierCode] = useState('');

  Promise.all([
    import('prettier/standalone' /* webpackChunkName: "Prettier" */),
    import('prettier/parser-graphql' /* webpackChunkName: "Prettier-graphql" */),
    import('prettier/parser-babylon' /* webpackChunkName: "Prettier-babylon" */),
    import('prettier/parser-markdown' /* webpackChunkName: "Prettier-markdown" */)
  ]).then(([prettier, ...plugins]) => {
    try {
      setPrettierCode(
        prettier.format(code, {
          parser: language === 'javascript' ? 'babel' : language,
          plugins
        })
      );
    } catch {
      setPrettierCode(code);
    }
  });

  return prettierCode;
};

export default usePrettier;
