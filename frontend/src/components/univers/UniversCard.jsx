import PropTypes from "prop-types";
import { useLudo } from "../../context/LudoContext";

function UniversCard({
  title,
  boxImg,
  year,
  id,
  handleClickAddBoardgame,
  handleClickUnivers,
}) {
  const { idOwnedBoardgameList } = useLudo();

  return (
    <>
      <div className="border-blue border-2 rounded-lg min-h-[284px] max-sm:w-32 sm:w-48 flex flex-col justify-between">
        <div className="m-1 absolute w-8">
          <button onClick={() => handleClickAddBoardgame(id)} type="button">
            <img
              src={
                idOwnedBoardgameList.includes(id)
                  ? "/assets/logo/inCollection.png"
                  : "/assets/logo/addCollection.png"
              }
              alt="owned bloardgame logo"
            />
          </button>
          <button type="button" onClick={() => handleClickUnivers(id)}>
            <img src="/assets/logo/eye.png" alt="logo eye" />
          </button>
        </div>
        <img
          src={boxImg}
          alt={`image de ${title}`}
          className="w-full object-contain h-3/4"
        />
        <div className="flex flex-col items-center">
          <p className="text-center">{title}</p>
          <p className="text-xs text-[darkgrey] pb-1">{year}</p>
        </div>
      </div>
    </>
  );
}

export default UniversCard;

UniversCard.propTypes = {
  boxImg: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  id: PropTypes.number,
  handleClickAddBoardgame: PropTypes.func,
  handleClickUnivers: PropTypes.func,
};
