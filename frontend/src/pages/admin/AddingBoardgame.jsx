import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLudo } from "../../context/LudoContext";

export default function AddingBoardgame() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { setCollection, creatorsList, editorsList } = useLudo();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) =>
    String(currentYear - index)
  );
  const [timeMin, setTimeMin] = useState("");
  const [timeMax, setTimeMax] = useState("");
  const [playerMin, setPlayerMin] = useState("");
  const [playerMax, setPlayerMax] = useState("");
  const [selectedCreators, setSelectedCreators] = useState([]);
  const [selectedEditors, setSelectedEditors] = useState([]);
  const [newBoardgame, setNewBoardgame] = useState({
    title: "",
    nbPlayer: "",
    playingTime: "",
    standalone: 1,
    year: 0,
    language: "français",
    boxImg: "",
  });

  async function handleSubmitAddingBoardgame(e) {
    e.preventDefault();
    const API = `${import.meta.env.VITE_BACKEND_URL}/boardgames`;
    let newID = 0;
    let check = 0;
    const nextNewBoardgame = newBoardgame;
    if (timeMin <= timeMax) {
      nextNewBoardgame.playingTime = `${timeMin}-${timeMax}`;
      if (playerMin <= playerMax) {
        nextNewBoardgame.nbPlayer = `${playerMin}-${playerMax}`;
        if (nextNewBoardgame.standalone) {
          nextNewBoardgame.standalone = Number(nextNewBoardgame.standalone);
          if (nextNewBoardgame.year) {
            nextNewBoardgame.year = Number(nextNewBoardgame.year);
            await axios
              .post(API, nextNewBoardgame)
              .then((check = 1))
              .catch((err) => console.error(err.response.data.message));
            if (check === 1) {
              await axios
                .get(API)
                .then((res) => {
                  newID = res.data[res.data.length - 1].id;
                })
                .catch((err) => console.error(err.response.data.message));

              selectedCreators.map((creator) => {
                axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/createdBy/creation/${
                    creator.id
                  }/${newID}`
                );
              });
              selectedEditors.map((editor) => {
                axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/editedBy/creation/${
                    editor.id
                  }/${newID}`
                );
              });
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
      }
    }
  }
  function handleChangeAddingBoardgame(e) {
    const nextNewBoardgame = newBoardgame;
    nextNewBoardgame[e.target.name] = e.target.value;
    setNewBoardgame(nextNewBoardgame);
  }
  function handleChangeAddingBoardgamePlayer(e) {
    if (e.target.name === "playerMin") {
      setPlayerMin(Number(e.target.value));
    } else {
      setPlayerMax(Number(e.target.value));
    }
  }
  function handleChangeAddingBoardgameTime(e) {
    if (e.target.name === "timeMin") {
      setTimeMin(Number(e.target.value));
    } else {
      setTimeMax(Number(e.target.value));
    }
  }
  function handleChangeCreators(e) {
    if (e.target.value !== "") {
      if (e.target.value === "reset") {
        setSelectedCreators([]);
      } else {
        if (
          selectedCreators.filter(
            (creator) => creator.id === Number(e.target.value)
          ).length === 0
        ) {
          setSelectedCreators([
            ...selectedCreators,
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
        setSelectedEditors([]);
      } else {
        if (
          selectedEditors.filter(
            (editor) => editor.id === Number(e.target.value)
          ).length === 0
        ) {
          setSelectedEditors([
            ...selectedEditors,
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
        <h1 className="text-center pt-8 text-3xl">Enregistre un nouveau jeu</h1>
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
        onSubmit={handleSubmitAddingBoardgame}
      >
        <div className="flex flex-col">
          <label htmlFor="text">Titre</label>
          <input
            type="text"
            name="title"
            id="title-register"
            placeholder="Titre"
            required
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeAddingBoardgame}
          />
        </div>
        <div>
          <p className="text-left w-72 flex justify-between"></p>
          <select
            required
            name="year"
            id="year"
            onChange={handleChangeAddingBoardgame}
            className="border-2 border-blue w-72 p-1 rounded-md bg-white"
          >
            <option value="0"></option>
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
              <label htmlFor="text">Min.</label>
              <input
                type="number"
                name="playerMin"
                required
                className="text-dark w-16 p-1 mr-4 rounded border-2 border-blue"
                onChange={handleChangeAddingBoardgamePlayer}
              />
            </div>
            <div>
              <label htmlFor="playerMax">Max.</label>
              <input
                type="number"
                name="playerMax"
                required
                className="text-dark w-16 p-1 rounded border-2 border-blue"
                onChange={handleChangeAddingBoardgamePlayer}
              />
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-left w-72 flex justify-between">Durée (en min.)</p>
          <div className="flex justify-evenly">
            <div>
              <label htmlFor="text">Min.</label>
              <input
                type="number"
                name="timeMin"
                required
                className="text-dark w-16 p-1 mr-4 rounded border-2 border-blue"
                onChange={handleChangeAddingBoardgameTime}
              />
            </div>
            <div>
              <label htmlFor="text">Max.</label>
              <input
                type="number"
                name="timeMax"
                required
                className="text-dark w-16 p-1 rounded border-2 border-blue"
                onChange={handleChangeAddingBoardgameTime}
              />
            </div>
          </div>
        </div>
        <select
          required
          className="border-2 border-blue w-72 p-1 rounded-md bg-white"
          name="standalone"
          id="standalone"
          onChange={handleChangeAddingBoardgame}
        >
          <option value="1">standalone</option>
          <option value="0">extension</option>
        </select>
        <select
          required
          className="border-2 border-blue w-72 p-1 rounded-md bg-white"
          name="language"
          id="language"
          onChange={handleChangeAddingBoardgame}
        >
          <option value="français">français</option>
          <option value="english">english</option>
          <option value="deutsch">deutsch</option>
        </select>
        <div className="flex flex-col">
          <label htmlFor="text">Créateur(s)</label>
          {selectedCreators.map((creator) => (
            <p key={creator.id} className="text-[grey] text-sm pl-2">
              {creator.firstname} {creator.lastname}
            </p>
          ))}
          <select
            required
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
          {selectedEditors.map((editor) => (
            <p key={editor.id} className="text-[grey] text-sm pl-2">
              {editor.name}
            </p>
          ))}
          <select
            required
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
          <label htmlFor="text">Source image</label>
          <input
            required
            type="link"
            name="boxImg"
            id="boxImg"
            placeholder="https://www."
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeAddingBoardgame}
          />
        </div>
        <button type="submit" className="blueButton self-center mt-2">
          Enregistrer
        </button>
      </form>
    </>
  );
}
