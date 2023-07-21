import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLudo } from "../context/LudoContext";

export default function EditBoardgame() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { setCollection, originalBoardgame, newBoardgame, setNewBoardgame } =
    useLudo();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) =>
    String(currentYear - index)
  );
  const [timeMin, setTimeMin] = useState("");
  const [timeMax, setTimeMax] = useState("");
  const [playerMin, setPlayerMin] = useState("");
  const [playerMax, setPlayerMax] = useState("");

  async function handleSubmitAddingBoardgame(e) {
    e.preventDefault();
    const API = `${import.meta.env.VITE_BACKEND_URL}/boardgames`;
    const APIPUT = `${import.meta.env.VITE_BACKEND_URL}/boardgames/${
      newBoardgame.id
    }`;
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
              .put(APIPUT, nextNewBoardgame)
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
    }
  }
  function handleChangeAddingBoardgame(e) {
    const nextNewBoardgame = newBoardgame;
    nextNewBoardgame[e.target.name] = e.target.value;
    setNewBoardgame(nextNewBoardgame);
  }
  function handleChangeAddingBoardgamePlayer(e) {
    if (e.target.name === "playerMin") {
      setPlayerMin(e.target.value);
    } else {
      setPlayerMax(e.target.value);
    }
  }
  function handleChangeAddingBoardgameTime(e) {
    if (e.target.name === "timeMin") {
      setTimeMin(e.target.value);
    } else {
      setTimeMax(e.target.value);
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
        onSubmit={handleSubmitAddingBoardgame}
      >
        <div className="flex flex-col">
          <label htmlFor="text">{originalBoardgame.title}</label>
          <input
            type="text"
            name="title"
            id="title-register"
            placeholder={originalBoardgame.title}
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeAddingBoardgame}
          />
        </div>
        <div>
          <p>{originalBoardgame.year}</p>
          <select
            name="year"
            id="year"
            onChange={handleChangeAddingBoardgame}
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
                onChange={handleChangeAddingBoardgamePlayer}
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
                onChange={handleChangeAddingBoardgamePlayer}
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
                onChange={handleChangeAddingBoardgameTime}
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
                onChange={handleChangeAddingBoardgameTime}
              />
            </div>
          </div>
        </div>
        <p>{originalBoardgame.standalone ? "standalone" : "extension"}</p>
        <select
          className="border-2 border-blue w-72 p-1 rounded-md bg-white"
          name="standalone"
          id="standalone"
          onChange={handleChangeAddingBoardgame}
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
          onChange={handleChangeAddingBoardgame}
        >
          <option value={originalBoardgame.language}>
            {originalBoardgame.language}
          </option>
          <option value="français">français</option>
          <option value="english">english</option>
          <option value="deutsch">deutsch</option>
        </select>
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
