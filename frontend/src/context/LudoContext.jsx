import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const LudoContext = createContext();

export function LudoProvider({ children }) {
  const [allBoardgames, setAllBoardgames] = useState([]);

  const propsPassing = useMemo(
    () => ({
      allBoardgames,
      setAllBoardgames,
    }),
    [allBoardgames, setAllBoardgames]
  );

  return (
    <LudoContext.Provider value={propsPassing}>{children}</LudoContext.Provider>
  );
}

LudoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLudo = () => useContext(LudoContext);
