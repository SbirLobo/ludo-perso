import { createContext, useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const LudoContext = createContext();

export function LudoProvider({ children }) {
  const [allBoardgames, setAllBoardgames] = useState([]);
  const [idOwnedBoardgameList, setIdOwnedBoardgameList] = useState([]);
  const [collection, setCollection] = useState([]);
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [check, setCheck] = useState(false);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [univers, setUnivers] = useState([]);
  const [creatorsList, setCreatorsList] = useState([]);
  const [editorsList, setEditorsList] = useState([]);
  const [originalBoardgame, setOriginalBoardgame] = useState({});
  const [currentBoardgameEditors, setCurrentBoardgameEditors] = useState([]);
  const [currentBoardgameCreators, setCurrentBoardgameCreators] = useState([]);
  const [currentEditor, setCurrentEditor] = useState({});
  const [currentCreator, setCurrentCreator] = useState({});
  const [newBoardgame, setNewBoardgame] = useState({
    title: "",
    nbPlayer: "",
    playingTime: "",
    standalone: "",
    year: 0,
    language: "",
    boxImg: "",
  });
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loggedInUser, setLoggedInUser] = useState({
    id: "",
    userName: "",
    email: "",
    admin: 0,
  });

  useEffect(() => {
    const API = `${import.meta.env.VITE_BACKEND_URL}/user/owned/${
      loggedInUser.id
    }`;
    axios
      .get(API)
      .then((res) => {
        setCollection(res.data);
        setFilteredCollection(res.data);
        const data = res.data.map((e) => e.boardgame_id);
        setIdOwnedBoardgameList(data);
      })
      .catch((err) => console.error(err.response.data.message));

    const reqCreators = axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/creators`
    );
    const reqEditors = axios.get(`${import.meta.env.VITE_BACKEND_URL}/editors`);
    axios.all([reqCreators, reqEditors]).then(
      axios.spread((...res) => {
        setCreatorsList(res[0].data);
        setEditorsList(res[1].data);
      })
    );
  }, [check, loggedInUser]);

  const propsPassing = useMemo(
    () => ({
      allBoardgames,
      setAllBoardgames,
      user,
      setUser,
      loggedInUser,
      setLoggedInUser,
      idOwnedBoardgameList,
      setIdOwnedBoardgameList,
      check,
      setCheck,
      collection,
      setCollection,
      favoriteFilter,
      setFavoriteFilter,
      filteredCollection,
      setFilteredCollection,
      univers,
      setUnivers,
      originalBoardgame,
      setOriginalBoardgame,
      newBoardgame,
      setNewBoardgame,
      currentBoardgameEditors,
      setCurrentBoardgameEditors,
      currentBoardgameCreators,
      setCurrentBoardgameCreators,
      currentEditor,
      setCurrentEditor,
      currentCreator,
      setCurrentCreator,
      creatorsList,
      setCreatorsList,
      editorsList,
      setEditorsList,
    }),
    [
      allBoardgames,
      setAllBoardgames,
      user,
      setUser,
      loggedInUser,
      setLoggedInUser,
      idOwnedBoardgameList,
      setIdOwnedBoardgameList,
      check,
      setCheck,
      collection,
      setCollection,
      favoriteFilter,
      setFavoriteFilter,
      filteredCollection,
      setFilteredCollection,
      univers,
      setUnivers,
      originalBoardgame,
      setOriginalBoardgame,
      newBoardgame,
      setNewBoardgame,
      currentBoardgameEditors,
      setCurrentBoardgameEditors,
      currentBoardgameCreators,
      setCurrentBoardgameCreators,
      currentEditor,
      setCurrentEditor,
      currentCreator,
      setCurrentCreator,
      creatorsList,
      setCreatorsList,
      editorsList,
      setEditorsList,
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
