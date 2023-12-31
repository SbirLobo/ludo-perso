import axios from "axios";
import { useEffect, useState } from "react";
import { useLudo } from "../context/LudoContext";
import CollectionCard from "../components/collection/CollectionCard";
import PopupCollection from "../components/collection/PopupCollection";
import { Link } from "react-router-dom";

export default function Collection() {
  const {
    loggedInUser,
    setIdOwnedBoardgameList,
    check,
    setCheck,
    collection,
    setCollection,
    favoriteFilter,
    setFavoriteFilter,
    filteredCollection,
    setFilteredCollection,
    selectedUser,
  } = useLudo();
  const [nbPlayerFilter, setNbPlayerFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [boardgameNameFilter, setBoardgameNameFilter] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [idBoardgame, setIdBoardgame] = useState(0);
  const [nbItems, setNbItems] = useState(0);
  const [filteredCollection25, setFilteredCollection25] = useState([]);

  function moreItems() {
    setNbItems(nbItems + 25);
  }

  const [currentBoardgame, setCurrentBoardgame] = useState({
    user_id: 0,
    boardgame_id: 0,
    favorite: 0,
    title: "",
    nbPlayer: "",
    playingTime: "",
    standalone: 0,
    year: 0,
    language: "",
    boxImg: "",
  });

  const nb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleClickCollection = (boardgame_id) => {
    setHidden(!hidden);
    setIdBoardgame(boardgame_id);
  };

  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  useEffect(() => {
    let API = `${import.meta.env.VITE_BACKEND_URL}/user/owned/${
      loggedInUser.id
    }`;
    if (selectedUser !== 0) {
      API = `${import.meta.env.VITE_BACKEND_URL}/user/owned/${selectedUser}`;
    }

    axios
      .get(API)
      .then((res) => {
        setCollection(res.data);
        setFilteredCollection(res.data);
        const data = res.data.map((e) => e.boardgame_id);
        setIdOwnedBoardgameList(data);
      })
      .catch((err) => console.error(err.response.data.message));
  }, [
    check,
    loggedInUser.id,
    setFilteredCollection,
    setIdOwnedBoardgameList,
    setCollection,
    selectedUser,
  ]);

  const handleClickFavorite = async (user_id, boardgame_id, favorite) => {
    if (selectedUser === 0) {
      const API = `${
        import.meta.env.VITE_BACKEND_URL
      }/user/owned/${user_id}/${boardgame_id}`;
      await axios
        .put(API, { favorite: !favorite })
        .then(() => {
          setCheck(!check);
        })
        .catch((err) => console.error(err.response.data));
    }
  };

  const handleChangeNbPlayerFilter = (e) => {
    setNbPlayerFilter(Number(e.target.value));
  };

  const handleClickFavoriteFilter = () => {
    setFavoriteFilter(!favoriteFilter);
  };

  const handleSubmitSearch = (event) => event.preventDefault();

  const handleClickSearch = () => {
    setSearch("");
    setBoardgameNameFilter(false);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setBoardgameNameFilter(false);
    } else {
      setBoardgameNameFilter(true);
    }
  };

  useEffect(() => {
    let nextFilteredCollection = [];
    if (nbPlayerFilter !== 0) {
      nextFilteredCollection = collection.filter((e) => {
        const nbPlayer = e.nbPlayer.split("-");
        if (nbPlayerFilter >= nbPlayer[0] && nbPlayerFilter <= nbPlayer[1]) {
          return e;
        }
      });
    } else {
      nextFilteredCollection = collection;
    }
    if (favoriteFilter) {
      nextFilteredCollection = nextFilteredCollection.filter((e) => {
        if (e.favorite) {
          return e;
        }
      });
    }
    if (boardgameNameFilter) {
      const words = search.toLowerCase();
      nextFilteredCollection = nextFilteredCollection.filter((e) =>
        e.title.toLowerCase().includes(words)
      );
    }
    setFilteredCollection(nextFilteredCollection);
    nextFilteredCollection = nextFilteredCollection.slice(0, nbItems + 25);
    setFilteredCollection25(nextFilteredCollection);
  }, [
    collection,
    nbPlayerFilter,
    favoriteFilter,
    search,
    boardgameNameFilter,
    setFilteredCollection,
    nbItems,
  ]);

  return (
    <>
      <div className="flex flex-start items-center">
        <h2 className="text-2xl py-8 pr-4">Ma collection</h2>
        <img
          className="w-10"
          src="/assets/logo/inCollection.png"
          alt="logo owned boardgame"
        />
      </div>
      <div className="flex justify-between max-md:flex-wrap">
        <div className="flex py-8 gap-3 items-center">
          <p>Joueuse(s)</p>
          <select
            onChange={handleChangeNbPlayerFilter}
            name="playerNumber"
            id="playerNumber"
            className="px-4 my-1 h-8 text-center bg-yellow rounded-md"
          >
            <option className="bg-white" value="0">
              -
            </option>
            {nb.map((e) => (
              <option key={e} className="bg-white" value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className="flex py-8 gap-3 items-center">
          <p>Mes favoris</p>
          <button type="button" onClick={handleClickFavoriteFilter}>
            <img
              className="w-10"
              src={
                favoriteFilter
                  ? "/assets/logo/favori1.png"
                  : "/assets/logo/favori0.png"
              }
              alt="logo favori"
            />
          </button>
        </div>
        <div className="flex flex-row items-center">
          <p>🔎</p>
          <form className="p-1" onSubmit={handleSubmitSearch}>
            <input
              className="text-primary pl-1 border-2 border-blue rounded-md w-40"
              type="search"
              placeholder="rechercher"
              value={search}
              onChange={handleChangeSearch}
            />
          </form>
          {isFirefox && (
            <button
              className="flex justify-center w-8 h-8 text-xl font-bold items-center bg-yellow rounded-full text-dark"
              type="button"
              onClick={handleClickSearch}
            >
              <span className="lexique-button-content">&times;</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 pb-8">
        {filteredCollection25.map((bg) => (
          <CollectionCard
            key={bg.boardgame_id}
            check={check}
            setCheck={setCheck}
            title={bg.title}
            boxImg={bg.boxImg}
            year={bg.year}
            favorite={bg.favorite}
            user_id={bg.user_id}
            boardgame_id={bg.boardgame_id}
            handleClickFavorite={handleClickFavorite}
            handleClickCollection={handleClickCollection}
          />
        ))}
        {!filteredCollection[0] && collection[0] && (
          <>
            <p>Nous n&apos;avons rien trouvé dans cette selection...</p>
            <p>Peut-être faudrait-il songer à faire quelques achats ? ...</p>
          </>
        )}
        {!collection[0] && (
          <div className="flex flex-col items-center gap-8">
            {selectedUser === 0 ? (
              <p className="text-3xl">
                Bienvenue à toi {loggedInUser.userName}
              </p>
            ) : (
              <p className="text-3xl">
                Cet utilisateur n'a pas commencé sa collection
              </p>
            )}
            <p>Pour commencer ton voyage, clique sur le lien suivant :</p>
            <Link to="/univers">
              <button
                type="button"
                className="text-white bg-dark rounded-md py-2 px-1 w-[82] border-2 border-white text-center hover:border-dark hover:bg-yellow hover:text-dark"
              >
                Univers
              </button>
            </Link>
          </div>
        )}
      </div>
      {filteredCollection.length > nbItems + 25 && (
        <div className="flex justify-center pb-4">
          <button
            type="button"
            onClick={moreItems}
            className="px-3 py-1.5 bg-blue rounded-md border-4 border-yellow text-white"
          >
            Plus...
          </button>
        </div>
      )}
      <PopupCollection
        hidden={hidden}
        setHidden={setHidden}
        idBoardgame={idBoardgame}
        setIdBoardgame={setIdBoardgame}
        currentBoardgame={currentBoardgame}
        setCurrentBoardgame={setCurrentBoardgame}
      />
    </>
  );
}
