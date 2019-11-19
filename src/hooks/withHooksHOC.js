import React from 'react';
import { windowWidth } from './windowWidth';

export const withHooksHOC = (Component) => {
  return (props) => {
    const screenWidth = windowWidth();

    return <Component width={screenWidth} {...props} />;
  };
};