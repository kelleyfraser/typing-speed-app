import React from 'react';

const AppHeader = ({getRandomParagraph}) => {
  return (
    <div className="header-container container-fluid">
      <i onClick={getRandomParagraph} className="fa fa-refresh btn-icon fa-lg"></i>
      <h1 className="appName">typing speed test</h1>
    </div>
  );
}

export default AppHeader;