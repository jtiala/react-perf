import React, { useState } from 'react';
import { Link } from '@reach/router';
import moment from 'moment';
import Code from './code';
import Controls from './controls';
import usePrettier from '../../context/usePrettier';

export default ({
  id,
  language,
  code,
  user,
  title,
  showUserDetails,
  created,
  showControls,
  deleteShamecap
}) => {
  const prettierCode = usePrettier(code, language);

  return (
    <section className="shame-wrapper">
      <div className="shame">
        <div className="terminal">
          <Controls />
          <Code language={language} code={prettierCode} />
        </div>
      </div>
      <h3 className="title">{title}</h3>
      {showUserDetails && (
        <span className="details">
          Posted by{' '}
          <Link to={`/${user.name}`} state={{ username: user.displayName }}>
            @{user.name}
          </Link>{' '}
          {moment(created).fromNow()}
        </span>
      )}
      {showControls && (
        <span className="details">
          <button onClick={() => deleteShamecap(id)} className="delete-button">
            delete this shamecap
          </button>
        </span>
      )}
    </section>
  );
};
