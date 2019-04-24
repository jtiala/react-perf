import { useState } from 'react';
import { UserProvider } from './user';

const usePrettier = (code, language) => {
  const [prettierCode, setPrettierCode] = useState('');

  Promise.all([
    import('prettier/standalone' /* webpackChunkName: "prettier" */),
    import('prettier/parser-graphql' /* webpackChunkName: "prettier-graphql" */),
    import('prettier/parser-babylon' /* webpackChunkName: "prettier-babylon" */),
    import('prettier/parser-markdown' /* webpackChunkName: "prettier-markdown" */)
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
