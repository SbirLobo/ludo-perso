import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const LudoContext = createContext();

export function LudoProvider({ children }) {
  const [allBoardgames, setAllBoardgames] = useState([]);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loggedInUser, setLoggedInUser] = useState({
    id: "",
    userName: "",
    email: "",
  });

  const propsPassing = useMemo(
    () => ({
      allBoardgames,
      setAllBoardgames,
      user,
      setUser,
      loggedInUser,
      setLoggedInUser,
    }),
    [
      allBoardgames,
      setAllBoardgames,
      user,
      setUser,
      loggedInUser,
      setLoggedInUser,
    ]
  );

  return (
    <LudoContext.Provider value={propsPassing}>{children}</LudoContext.Provider>
  );
}

LudoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLudo = () => useContext(LudoContext);
