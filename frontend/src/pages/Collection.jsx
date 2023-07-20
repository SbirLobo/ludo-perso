import axios from "axios";
import { useLudo } from "../context/LudoContext";
import { useEffect, useState } from "react";
import CollectionCard from "../components/CollectionCard";

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
  } = useLudo();
  const [nbPlayerFilter, setNbPlayerFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [boardgameNameFilter, setBoardgameNameFilter] = useState(false);

  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

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
  }, [check]);

  const handleClickFavorite = async (user_id, boardgame_id, favorite) => {
    const API = `${
      import.meta.env.VITE_BACKEND_URL
    }/user/owned/${user_id}/${boardgame_id}`;
    await axios
      .put(API, { favorite: !favorite })
      .then(() => {
        setCheck(!check);
      })
      .catch((err) => console.error(err.response.data));
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
      nextFilteredCollection = collection.map((e) => e);
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
  }, [collection, nbPlayerFilter, favoriteFilter, search, boardgameNameFilter]);

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
            className="px-4 py-1.5 text-center bg-yellow rounded-md"
          >
            <option className="bg-white" value="0">
              -
            </option>
            <option className="bg-white" value="1">
              solo
            </option>
            <option className="bg-white" value="2">
              duo
            </option>
            <option className="bg-white" value="3">
              3
            </option>
            <option className="bg-white" value="4">
              4
            </option>
            <option className="bg-white" value="5">
              5
            </option>
            <option className="bg-white" value="6">
              6
            </option>
            <option className="bg-white" value="7">
              7
            </option>
            <option className="bg-white" value="8">
              8
            </option>
            <option className="bg-white" value="9">
              9
            </option>
            <option className="bg-white" value="10">
              10
            </option>
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
        {filteredCollection.map((bg) => (
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
          />
        ))}
        {!filteredCollection[0] && (
          <>
            <p>Nous n&apos;avons rien trouvé dans cette selection...</p>
            <p>Peut-être faudrait-il songer à faire quelques achats ? ...</p>
          </>
        )}
      </div>
    </>
  );
}
