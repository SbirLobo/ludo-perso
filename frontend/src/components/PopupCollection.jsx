import PropTypes from "prop-types";
import { useLudo } from "../context/LudoContext";
import { useState, useEffect } from "react";

export default function PopupCollection({ hidden, setHidden, idBoardgame }) {
  const { collection } = useLudo();
  const [currentBoardgame, setCurrentBoardgame] = useState({});

  useEffect(() => {
    const [newCurrentBoardgame] = collection.filter(
      (e) => e.boardgame_id === Number(idBoardgame)
    );
    setCurrentBoardgame(newCurrentBoardgame);
  }, []);

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
  console.log(currentBoardgame);
  console.log(idBoardgame);
  return (
    <div className={`${!hidden ? "hidden" : ""} flex`}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="popupLayout bg-dark"
        onClick={handleParentClick}
      >
        <div className="rounded bg-white h-[80%] w-[80%] p-5 cursor-default overflow-scroll">
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
            <div className="flex flex-row items-center justify-between">
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
        </div>
      </div>
    </div>
  );
}

PopupCollection.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
  idBoardgame: PropTypes.number,
};
