import axios from "axios";
import { useEffect, useState } from "react";
import { useLudo } from "../context/LudoContext";
import UniversCard from "../components/univers/UniversCard";
import PopupUnivers from "../components/univers/PopupUnivers";
import { Link } from "react-router-dom";

export default function Univers() {
  const { loggedInUser, check, setCheck, univers, setUnivers } = useLudo();
  const [nbPlayerFilterUnivers, setNbPlayerFilterUnivers] = useState(0);
  const [filteredUnivers, setFilteredUnivers] = useState([]);
  const [search, setSearch] = useState("");
  const [boardgameNameFilter, setBoardgameNameFilter] = useState(false);
  const [idBoardgameUnivers, setIdBoardgameUnivers] = useState(0);
  const [check2, setCheck2] = useState(false);
  const [boardgameList, setBoardgameList] = useState([]);
  const [creatorsList, setCreatorsList] = useState([]);
  const [editorsList, setEditorsList] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState(0);
  const [selectedEditor, setSelectedEditor] = useState(0);
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
    const reqBoardgames = axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/boardgames`
    );
    const reqCreators = axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/creators`
    );
    const reqEditors = axios.get(`${import.meta.env.VITE_BACKEND_URL}/editors`);
    axios
      .all([reqBoardgames, reqCreators, reqEditors])
      .then(
        axios.spread((...res) => {
          setUnivers(res[0].data);
          setFilteredUnivers(res[0].data);
          setCreatorsList(res[1].data);
          setEditorsList(res[2].data);
        })
      )
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

  const handleChangeCreator = async (e) => {
    setSelectedCreator(Number(e.target.value));
    setSelectedEditor(0);
    setNbPlayerFilterUnivers(0);
    setSearch("");

    const API = `${import.meta.env.VITE_BACKEND_URL}/createdBy/${Number(
      e.target.value
    )}`;
    await axios
      .get(API)
      .then((res) => {
        setBoardgameList(res.data);
      })
      .catch((err) => console.error(err.response.data));
  };
  const handleChangeEditor = async (e) => {
    setSelectedCreator(0);
    setSelectedEditor(Number(e.target.value));
    setNbPlayerFilterUnivers(0);
    setSearch("");

    const API = `${import.meta.env.VITE_BACKEND_URL}/editedBy/${Number(
      e.target.value
    )}`;
    await axios
      .get(API)
      .then((res) => {
        setBoardgameList(res.data);
      })
      .catch((err) => console.error(err.response.data));
  };

  useEffect(() => {
    let nextFilteredCollection = [];
    if (selectedCreator !== 0 || selectedEditor !== 0) {
      nextFilteredCollection = boardgameList;
    } else {
      nextFilteredCollection = univers;
    }
    if (nbPlayerFilterUnivers !== 0) {
      nextFilteredCollection = nextFilteredCollection.filter((e) => {
        const nbPlayer = e.nbPlayer.split("-");
        if (
          nbPlayerFilterUnivers >= nbPlayer[0] &&
          nbPlayerFilterUnivers <= nbPlayer[1]
        ) {
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

    setFilteredUnivers(nextFilteredCollection);
  }, [
    univers,
    nbPlayerFilterUnivers,
    search,
    boardgameNameFilter,
    boardgameList,
    selectedCreator,
    selectedEditor,
  ]);

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
      <div className="flex flex-col items-center md:flex-row md:justify-evenly">
        <div className="flex flex-col py-8 gap-3 items-center">
          {loggedInUser.admin === 1 && (
            <Link to="/admin/addingCreator">
              <button
                className="rounded-md h-10 px-2 py-1 my-1 border-2 text-center border-dark bg-blue text-white"
                type="button"
              >
                + créateur +
              </button>
            </Link>
          )}
          <p>Créateurs</p>
          <select
            name="creator"
            id="creator"
            className="px-4 my-1 h-8 text-center bg-yellow rounded-md"
            onChange={handleChangeCreator}
          >
            {selectedCreator === 0 ? (
              <option className="bg-white" value="0" selected></option>
            ) : (
              <option className="bg-white" value="0"></option>
            )}
            {creatorsList.map((e) => (
              <option className="bg-white" key={e.id} value={e.id}>
                {e.firstname} {e.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col py-8 gap-3 items-center">
          {loggedInUser.admin === 1 && (
            <Link to="/admin/addingEditor">
              <button
                className="rounded-md h-10 px-2 py-1 my-1 border-2 text-center border-dark bg-blue text-white"
                type="button"
              >
                + éditeur +
              </button>
            </Link>
          )}
          <p>Editeurs</p>
          <select
            name="editor"
            id="editor"
            className="px-4 my-1 h-8 text-center bg-yellow rounded-md"
            onChange={handleChangeEditor}
          >
            {selectedEditor === 0 ? (
              <option className="bg-white" value="0" selected></option>
            ) : (
              <option className="bg-white" value="0"></option>
            )}
            {editorsList.map((e) => (
              <option className="bg-white" key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
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
            {nbPlayerFilterUnivers === 0 ? (
              <option className="bg-white" value="0" selected>
                -
              </option>
            ) : (
              <option className="bg-white" value="0">
                -
              </option>
            )}

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
