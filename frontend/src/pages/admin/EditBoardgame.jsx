import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLudo } from "../../context/LudoContext";

export default function EditBoardgame() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const {
    setCollection,
    originalBoardgame,
    newBoardgame,
    setNewBoardgame,
    currentBoardgameEditors,
    setCurrentBoardgameEditors,
    currentBoardgameCreators,
    setCurrentBoardgameCreators,
  } = useLudo();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) =>
    String(currentYear - index)
  );
  const [timeMin, setTimeMin] = useState("");
  const [timeMax, setTimeMax] = useState("");
  const [playerMin, setPlayerMin] = useState("");
  const [playerMax, setPlayerMax] = useState("");
  const [creatorsList, setCreatorsList] = useState([]);
  const [editorsList, setEditorsList] = useState([]);
  const [originalCurrentBoardgameEditors] = useState(currentBoardgameEditors);
  const [originalCurrentBoardgameCreators] = useState(currentBoardgameCreators);

  useEffect(() => {
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
  }, []);

  async function handleSubmitEditBoardgame(e) {
    e.preventDefault();
    const API = `${import.meta.env.VITE_BACKEND_URL}/boardgames`;
    const APIone = `${import.meta.env.VITE_BACKEND_URL}/boardgames/${
      newBoardgame.id
    }`;
    let nextTimeMin = "";
    let nextTimeMax = "";
    let nextPlayerMin = "";
    let nextPlayerMax = "";
    const nextNewBoardgame = newBoardgame;

    const originalCurrentBoardgameCreatorsID =
      originalCurrentBoardgameCreators.map((e) => e.id);
    const originalCurrentBoardgameEditorsID =
      originalCurrentBoardgameEditors.map((e) => e.id);
    const currentBoardgameCreatorsID = currentBoardgameCreators.map(
      (e) => e.id
    );
    const currentBoardgameEditorsID = currentBoardgameEditors.map((e) => e.id);

    const exCurrentBoardgameCreators =
      originalCurrentBoardgameCreatorsID.filter(
        (e) => !currentBoardgameCreatorsID.includes(e)
      );
    const exCurrentBoardgameEditors = originalCurrentBoardgameEditorsID.filter(
      (e) => !currentBoardgameEditorsID.includes(e)
    );
    const newCurrentBoardgameCreators = currentBoardgameCreatorsID.filter(
      (e) => !originalCurrentBoardgameCreatorsID.includes(e)
    );
    const newCurrentBoardgameEditors = currentBoardgameEditorsID.filter(
      (e) => !originalCurrentBoardgameEditorsID.includes(e)
    );

    if (nextNewBoardgame.title === "") {
      nextNewBoardgame.title = originalBoardgame.title;
    }
    if (nextNewBoardgame.year === "") {
      nextNewBoardgame.year = originalBoardgame.year;
    }
    if (nextNewBoardgame.standalone === "") {
      nextNewBoardgame.standalone = originalBoardgame.standalone;
    }
    if (nextNewBoardgame.language === "") {
      nextNewBoardgame.language = originalBoardgame.language;
    }
    if (nextNewBoardgame.boxImg === "") {
      nextNewBoardgame.boxImg = originalBoardgame.boxImg;
    }
    if (timeMin === "") {
      nextTimeMin = originalBoardgame.playingTime.split("-")[0];
    } else {
      nextTimeMin = timeMin;
    }
    if (timeMax === "") {
      nextTimeMax = originalBoardgame.playingTime.split("-")[1];
    } else {
      nextTimeMax = timeMax;
    }
    if (playerMin === "") {
      nextPlayerMin = originalBoardgame.nbPlayer.split("-")[0];
    } else {
      nextPlayerMin = playerMin;
    }
    if (playerMax === "") {
      nextPlayerMax = originalBoardgame.nbPlayer.split("-")[1];
    } else {
      nextPlayerMax = playerMax;
    }
    nextNewBoardgame.playingTime = `${nextTimeMin}-${nextTimeMax}`;
    nextNewBoardgame.nbPlayer = `${nextPlayerMin}-${nextPlayerMax}`;

    if (
      Number(nextNewBoardgame.playingTime.split("-")[0]) <=
      Number(nextNewBoardgame.playingTime.split("-")[1])
    ) {
      if (
        Number(nextNewBoardgame.nbPlayer.split("-")[0]) <=
        Number(nextNewBoardgame.nbPlayer.split("-")[1])
      ) {
        nextNewBoardgame.standalone = Number(nextNewBoardgame.standalone);
        nextNewBoardgame.year = Number(nextNewBoardgame.year);

        if (exCurrentBoardgameCreators.length !== 0) {
          exCurrentBoardgameCreators.map((creator) => {
            axios.delete(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/createdBy/delete/${creator}/${newBoardgame.id}`
            );
          });
        }
        if (exCurrentBoardgameEditors.length !== 0) {
          exCurrentBoardgameEditors.map((editor) => {
            axios.delete(
              `${import.meta.env.VITE_BACKEND_URL}/editedBy/delete/${editor}/${
                newBoardgame.id
              }`
            );
          });
        }
        if (newCurrentBoardgameCreators.length !== 0) {
          newCurrentBoardgameCreators.map((creator) => {
            axios.post(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/createdBy/creation/${creator}/${newBoardgame.id}`
            );
          });
        }
        if (newCurrentBoardgameEditors.length !== 0) {
          newCurrentBoardgameEditors.map((editor) => {
            axios.post(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/editedBy/creation/${editor}/${newBoardgame.id}`
            );
          });
        }

        await axios
          .put(APIone, nextNewBoardgame)
          .catch((err) => console.error(err.response.data.message));
        await axios
          .get(API)
          .then((res) => {
            setCollection(res.data);
            navigate("/univers");
          })
          .catch((err) => console.error(err.response.data.message));
      }
    }
  }

  function handleChangeEditBoardgame(e) {
    const nextNewBoardgame = newBoardgame;
    if (e.target.name === "standalone" || e.target.name === "year") {
      nextNewBoardgame[e.target.name] = Number(e.target.value);
    } else {
      nextNewBoardgame[e.target.name] = e.target.value;
    }
    setNewBoardgame(nextNewBoardgame);
  }
  function handleChangeEditBoardgamePlayer(e) {
    if (e.target.name === "playerMin") {
      setPlayerMin(Number(e.target.value));
    } else {
      setPlayerMax(Number(e.target.value));
    }
  }
  function handleChangeEditBoardgameTime(e) {
    if (e.target.name === "timeMin") {
      setTimeMin(Number(e.target.value));
    } else {
      setTimeMax(Number(e.target.value));
    }
  }

  function handleChangeCreators(e) {
    if (e.target.value !== "") {
      if (e.target.value === "reset") {
        setCurrentBoardgameCreators([]);
      } else {
        if (
          currentBoardgameCreators.filter(
            (creator) => creator.id === Number(e.target.value)
          ).length === 0
        ) {
          setCurrentBoardgameCreators([
            ...currentBoardgameCreators,
            creatorsList.filter(
              (creator) => creator.id === Number(e.target.value)
            )[0],
          ]);
        }
      }
    }
  }
  function handleChangeEditors(e) {
    if (e.target.value !== "") {
      if (e.target.value === "reset") {
        setCurrentBoardgameEditors([]);
      } else {
        if (
          currentBoardgameEditors.filter(
            (editor) => editor.id === Number(e.target.value)
          ).length === 0
        ) {
          setCurrentBoardgameEditors([
            ...currentBoardgameEditors,
            editorsList.filter(
              (editor) => editor.id === Number(e.target.value)
            )[0],
          ]);
        }
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center pt-8 text-3xl">
          Mise à jour d&apos;un jeu.
        </h1>
        <hr className="border-[1.5px] my-8 border-pink w-1/2 max-72 text-center"></hr>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={goBack}
          className="px-3 py-1.5 bg-blue rounded-md border-4 border-yellow text-white"
        >
          Retour
        </button>
      </div>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmitEditBoardgame}
      >
        <div className="flex flex-col">
          <label htmlFor="text">{originalBoardgame.title}</label>
          <input
            type="text"
            name="title"
            id="title-register"
            placeholder={originalBoardgame.title}
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeEditBoardgame}
          />
        </div>
        <div>
          <p>{originalBoardgame.year}</p>
          <select
            name="year"
            id="year"
            onChange={handleChangeEditBoardgame}
            className="border-2 border-blue w-72 p-1 rounded-md bg-white"
          >
            <option value={originalBoardgame.year}>
              {originalBoardgame.year}
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <p className="text-left w-72 flex justify-between">Joueuse(s)</p>
          <div className="flex justify-evenly">
            <div>
              <label htmlFor="text" className="pr-2">
                {originalBoardgame.nbPlayer.split("-")[0]}
              </label>
              <input
                type="number"
                name="playerMin"
                placeholder={originalBoardgame.nbPlayer.split("-")[0]}
                className="text-dark w-16 p-1 mr-4 rounded border-2 border-blue"
                onChange={handleChangeEditBoardgamePlayer}
              />
            </div>
            <div>
              <label htmlFor="text" className="pr-2">
                {originalBoardgame.nbPlayer.split("-")[1]}
              </label>
              <input
                type="number"
                name="playerMax"
                placeholder={originalBoardgame.nbPlayer.split("-")[1]}
                className="text-dark w-16 p-1 rounded border-2 border-blue"
                onChange={handleChangeEditBoardgamePlayer}
              />
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-left w-72 flex justify-between">Durée (en min.)</p>
          <div className="flex justify-evenly">
            <div>
              <label htmlFor="text" className="pr-2">
                {originalBoardgame.playingTime.split("-")[0]}
              </label>
              <input
                type="number"
                name="timeMin"
                placeholder={originalBoardgame.playingTime.split("-")[0]}
                className="text-dark w-16 p-1 mr-4 rounded border-2 border-blue"
                onChange={handleChangeEditBoardgameTime}
              />
            </div>
            <div>
              <label htmlFor="text" className="pr-2">
                {originalBoardgame.playingTime.split("-")[1]}
              </label>
              <input
                type="number"
                name="timeMax"
                placeholder={originalBoardgame.playingTime.split("-")[1]}
                className="text-dark w-16 p-1 rounded border-2 border-blue"
                onChange={handleChangeEditBoardgameTime}
              />
            </div>
          </div>
        </div>
        <p>{originalBoardgame.standalone ? "standalone" : "extension"}</p>
        <select
          className="border-2 border-blue w-72 p-1 rounded-md bg-white"
          name="standalone"
          id="standalone"
          onChange={handleChangeEditBoardgame}
        >
          <option
            value={originalBoardgame.standalone ? "standalone" : "extension"}
          >
            {originalBoardgame.standalone ? "standalone" : "extension"}
          </option>
          <option value="1">standalone</option>
          <option value="0">extension</option>
        </select>
        <p>{originalBoardgame.language}</p>
        <select
          className="border-2 border-blue w-72 p-1 rounded-md bg-white"
          name="language"
          id="language"
          onChange={handleChangeEditBoardgame}
        >
          <option value={originalBoardgame.language}>
            {originalBoardgame.language}
          </option>
          <option value="français">français</option>
          <option value="english">english</option>
          <option value="deutsch">deutsch</option>
        </select>
        <div className="flex flex-col">
          <label htmlFor="text">Créateur(s)</label>
          {currentBoardgameCreators.map((creator) => (
            <p key={creator.id} className="text-[grey] text-sm pl-2">
              {creator.firstname} {creator.lastname}
            </p>
          ))}
          <select
            className="border-2 border-blue w-72 p-1 rounded-md bg-white"
            name="creators"
            id="creators"
            onChange={handleChangeCreators}
          >
            <option value=""></option>
            {creatorsList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.firstname} {e.lastname}
              </option>
            ))}
            <option value="reset">- Reset -</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="text">Editeur(s)</label>
          {currentBoardgameEditors.map((editor) => (
            <p key={editor.id} className="text-[grey] text-sm pl-2">
              {editor.name}
            </p>
          ))}
          <select
            className="border-2 border-blue w-72 p-1 rounded-md bg-white"
            name="editors"
            id="editors"
            onChange={handleChangeEditors}
          >
            <option value=""></option>
            {editorsList.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
            <option value="reset">- Reset -</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="boxImg" className="w-72">
            {originalBoardgame.boxImg}
          </label>
          <input
            type="link"
            name="boxImg"
            id="boxImg"
            placeholder={originalBoardgame.boxImg}
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeEditBoardgame}
          />
        </div>
        <button type="submit" className="blueButton self-center mt-2">
          Enregistrer
        </button>
      </form>
    </>
  );
}
