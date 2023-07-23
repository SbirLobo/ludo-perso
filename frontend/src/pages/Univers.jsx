import axios from "axios";
import { useEffect, useState } from "react";
import { useLudo } from "../context/LudoContext";
import UniversCard from "../components/UniversCard";
import PopupUnivers from "../components/PopupUnivers";
import { Link } from "react-router-dom";

export default function Univers() {
  const { loggedInUser, check, setCheck, univers, setUnivers } = useLudo();
  const [nbPlayerFilterUnivers, setNbPlayerFilterUnivers] = useState(0);
  const [filteredUnivers, setFilteredUnivers] = useState([]);
  const [search, setSearch] = useState("");
  const [boardgameNameFilter, setBoardgameNameFilter] = useState(false);
  const [idBoardgameUnivers, setIdBoardgameUnivers] = useState(0);
  const [check2, setCheck2] = useState(false);
  const [currentBoardgame, setCurrentBoardgame] = useState({
    id: 0,
    title: "",
    nbPlayer: "",
    playingTime: "",
    standalone: 0,
    year: 0,
    language: "",
    boxImg: "",
  });

  const nb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [hidden, setHidden] = useState(false);

  function handleClickUnivers(id) {
    setHidden(!hidden);
    setIdBoardgameUnivers(Number(id));
  }

  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  useEffect(() => {
    const API = `${import.meta.env.VITE_BACKEND_URL}/boardgames`;
    axios
      .get(API)
      .then((res) => {
        setUnivers(res.data);
        setFilteredUnivers(res.data);
      })
      .catch((err) => console.error(err.response.data.message));
  }, [check2, setUnivers]);

  const handleChangeNbPlayerFilter = (e) => {
    setNbPlayerFilterUnivers(Number(e.target.value));
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

  const handleClickAddBoardgame = async (id) => {
    const API = `${import.meta.env.VITE_BACKEND_URL}/user/owned/${
      loggedInUser.id
    }/${id}`;
    await axios
      .post(API)
      .then(() => {
        setCheck(!check);
      })
      .catch((err) => console.error(err.response.data));
  };

  useEffect(() => {
    let nextFilteredCollection = [];
    if (nbPlayerFilterUnivers !== 0) {
      nextFilteredCollection = univers.filter((e) => {
        const nbPlayer = e.nbPlayer.split("-");
        if (
          nbPlayerFilterUnivers >= nbPlayer[0] &&
          nbPlayerFilterUnivers <= nbPlayer[1]
        ) {
          return e;
        }
      });
    } else {
      nextFilteredCollection = univers.map((e) => e);
    }
    if (boardgameNameFilter) {
      const words = search.toLowerCase();
      nextFilteredCollection = nextFilteredCollection.filter((e) =>
        e.title.toLowerCase().includes(words)
      );
    }
    setFilteredUnivers(nextFilteredCollection);
  }, [univers, nbPlayerFilterUnivers, search, boardgameNameFilter]);

  return (
    <>
      <div className="flex flex-start items-center">
        <h2 className="text-2xl py-8 pr-4">Univers</h2>
        <img
          className="w-10"
          src="/assets/logo/addCollection.png"
          alt="logo owned boardgame"
        />
      </div>
      <div className="flex justify-between max-md:flex-col max-md:items-center max-md:justify-around gap-4">
        <div className="flex my-1 gap-3 items-center">
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
        {loggedInUser.admin === 1 && (
          <Link to="/admin/addingBoardgame">
            <button
              className="rounded-md h-10 px-2 py-1 my-1 border-2 text-center border-dark bg-blue text-white"
              type="button"
            >
              + Ajouter un jeu +
            </button>
          </Link>
        )}
        <div className="flex flex-row mb-4 items-center">
          <p>🔎</p>
          <form className="p-1" onSubmit={handleSubmitSearch}>
            <input
              className="text-primary h-8 pl-1 border-2 border-blue rounded-md w-40"
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
        {filteredUnivers.map((bg) => (
          <UniversCard
            key={bg.id}
            title={bg.title}
            boxImg={bg.boxImg}
            year={bg.year}
            id={bg.id}
            handleClickAddBoardgame={handleClickAddBoardgame}
            handleClickUnivers={handleClickUnivers}
          />
        ))}
        {!filteredUnivers[0] && (
          <>
            <p>Le jeu que tu cherches n&apos;existe pas.</p>
            <p>Soit tu peux le renseigner, soit tu DOIS l&apos;inventer !</p>
          </>
        )}
      </div>
      <PopupUnivers
        hidden={hidden}
        setHidden={setHidden}
        idBoardgameUnivers={idBoardgameUnivers}
        setIdBoardgameUnivers={setIdBoardgameUnivers}
        currentBoardgame={currentBoardgame}
        setCurrentBoardgame={setCurrentBoardgame}
        univers={univers}
        check2={check2}
        setCheck2={setCheck2}
      />
    </>
  );
}
