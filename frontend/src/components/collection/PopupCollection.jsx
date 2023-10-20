import PropTypes from "prop-types";
import { useLudo } from "../../context/LudoContext";
import { useEffect } from "react";
import axios from "axios";

export default function PopupCollection({
  hidden,
  setHidden,
  idBoardgame,
  setIdBoardgame,
  currentBoardgame,
  setCurrentBoardgame,
}) {
  const {
    collection,
    loggedInUser,
    check,
    setCheck,
    currentBoardgameEditors,
    setCurrentBoardgameEditors,
    currentBoardgameCreators,
    setCurrentBoardgameCreators,
  } = useLudo();

  useEffect(() => {
    if (Number(idBoardgame) !== 0) {
      const [newCurrentBoardgame] = collection.filter(
        (e) => e.boardgame_id === Number(idBoardgame)
      );
      setCurrentBoardgame(newCurrentBoardgame);

      const reqCreators = axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/createdBy/boardgame/${Number(
          idBoardgame
        )}`
      );
      const reqEditors = axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/editedBy/boardgame/${Number(
          idBoardgame
        )}`
      );

      axios.all([reqCreators, reqEditors]).then(
        axios.spread((...res) => {
          setCurrentBoardgameCreators(res[0].data);
          setCurrentBoardgameEditors(res[1].data);
        })
      );
    }
  }, [
    idBoardgame,
    collection,
    setCurrentBoardgame,
    setCurrentBoardgameCreators,
    setCurrentBoardgameEditors,
  ]);

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
    const API = `${import.meta.env.VITE_BACKEND_URL}/user/owned/${
      loggedInUser.id
    }/${id}`;
    await axios
      .delete(API)
      .catch((err) => console.error(err.response.data.message));
    await setCheck(!check);
    await setHidden(!hidden);
    await setIdBoardgame(0);
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
        <div className="flex flex-col border-4 border-pink justify-between rounded-md bg-white max-w-4xl h-[80%] w-[80%] p-5 cursor-default overflow-hidden">
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
                className="sm:w-60 max-sm:h-28"
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
                    <p>Type :</p>
                    <p>
                      Editeur(s) :
                      {currentBoardgameEditors.map((e) => (
                        <br key={e.id} />
                      ))}
                    </p>
                    <p>
                      Créateur(s) :
                      {currentBoardgameCreators.map((e) => (
                        <br key={e.id} />
                      ))}
                    </p>
                  </div>
                  <div>
                    <p>{currentBoardgame.year}</p>
                    <p>{currentBoardgame.language}</p>
                    <p>{currentBoardgame.nbPlayer}</p>
                    <p>{currentBoardgame.playingTime}</p>
                    <p>
                      {currentBoardgame.standalone ? "standalone" : "extension"}
                    </p>
                    {currentBoardgameEditors.map((e) => (
                      <p key={e.id}>{e.name}</p>
                    ))}
                    {currentBoardgameCreators.map((e) => (
                      <p key={e.id}>
                        {e.firstname} {e.lastname}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button
              type="button"
              onClick={() => handleClickBin(currentBoardgame.boardgame_id)}
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

PopupCollection.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
  idBoardgame: PropTypes.number,
  currentBoardgame: PropTypes.object,
  setCurrentBoardgame: PropTypes.func,
  setIdBoardgame: PropTypes.func,
};
