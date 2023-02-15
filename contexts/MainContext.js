import React from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  // TODO: create state isLoggedIn, set value to false
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [update, setUpdate] = React.useState(true);

  return (
    <MainContext.Provider
      value={{isLoggedIn, setIsLoggedIn, user, setUser, update, setUpdate}}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
