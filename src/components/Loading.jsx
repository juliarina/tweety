import React from 'react';
import LoadingBar from '@dimasmds/react-redux-loading-bar';

function Loading() {
  return (
    <div className="loading-bar_container">
      <LoadingBar.default style={{ backgroundColor: '#838383' }}/>
    </div>
  );
}

export default Loading;