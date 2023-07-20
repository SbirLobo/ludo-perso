import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";

export default function PopupUnivers({
  hidden,
  setHidden,
  idBoardgameUnivers,
  setIdBoardgameUnivers,
  currentBoardgame,
  setCurrentBoardgame,
  univers,
  check2,
  setCheck2,
}) {
  useEffect(() => {
    if (Number(idBoardgameUnivers) !== 0) {
      const [newCurrentBoardgame] = univers.filter(
        (e) => e.id === Number(idBoardgameUnivers)
      );
      setCurrentBoardgame(newCurrentBoardgame);
    }
    ////axios editor et creator à faire ici
  }, [idBoardgameUnivers, setCurrentBoardgame, univers]);

  function handleKeyDown(e) {
    if (e.keyCode === 27) {
      setHidden(!hidden);
    }
  }
  function handleParentClick(e) {
    if (e.target === e.currentTarget) {
      setHidden(!hidden);
    }
  }
  function handleClickCross() {
    setHidden(!hidden);
  }

  async function handleClickBin(id) {
    const API = `${import.meta.env.VITE_BACKEND_URL}/boardgames/${id}`;
    await axios
      .delete(API)
      .catch((err) => console.error(err.response.data.message));
    await setHidden(!hidden);
    await setCheck2(!check2);
    await setIdBoardgameUnivers(0);
    console.log(hidden);
  }

  return (
    <div className={`${!hidden ? "hidden" : ""} flex`}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="popupLayout bg-dark"
        onClick={handleParentClick}
      >
        <div className="rounded bg-white h-[80%] w-[80%] max-w-4xl p-5 cursor-default overflow-scroll">
          <div className="flex flex-row-reverse">
            <button type="button" onClick={() => handleClickCross()}>
              <img
                className="w-10"
                src="/assets/logo/cross.png"
                alt="logo cross"
              />
            </button>
          </div>
          <div className="flex flex-col px-8 pt-8">
            <div className="flex max-sm:flex-col flex-row items-center justify-between">
              <img
                className="w-60"
                src={currentBoardgame.boxImg}
                alt={`image de la boite de ${currentBoardgame.title}`}
              />
              <div className="flex flex-col">
                <p className=" rounded-md p-2 w-[82] border-2 text-center border-dark bg-yellow text-dark">
                  {currentBoardgame.title}
                </p>
                <div className="flex flex-rox justify-center gap-4">
                  <div className="text-right">
                    <p>Année :</p>
                    <p>Langue :</p>
                    <p>Joueuse(s) :</p>
                    <p>Durée :</p>
                    <p>type :</p>
                  </div>
                  <div>
                    <p>{currentBoardgame.year}</p>
                    <p>{currentBoardgame.language}</p>
                    <p>{currentBoardgame.nbPlayer}</p>
                    <p>{currentBoardgame.playingTime}</p>
                    <p>
                      {currentBoardgame.standalone ? "standalone" : "extension"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button
              type="button"
              onClick={() => handleClickBin(currentBoardgame.id)}
            >
              <img
                className="w-14"
                src="/assets/logo/bin.png"
                alt="logo cross"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

PopupUnivers.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
  idBoardgameUnivers: PropTypes.number,
  setIdBoardgameUnivers: PropTypes.func,
  currentBoardgame: PropTypes.object,
  setCurrentBoardgame: PropTypes.func,
  univers: PropTypes.array,
  check2: PropTypes.bool,
  setCheck2: PropTypes.func,
};
