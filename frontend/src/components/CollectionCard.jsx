import PropTypes from "prop-types";

function CollectionCard({
  handleClickFavorite,
  boxImg,
  title,
  year,
  favorite,
  boardgame_id,
  user_id,
  handleClickCollection,
}) {
  return (
    <>
      <div className="border-blue border-2 rounded-lg min-h-[284px] w-48 flex flex-col justify-between">
        <div className="m-1 absolute w-8">
          <button
            type="button"
            onClick={() => handleClickFavorite(user_id, boardgame_id, favorite)}
          >
            <img
              src={
                favorite
                  ? "/assets/logo/favori1.png"
                  : "/assets/logo/favori0.png"
              }
              alt="logo favori"
            />
          </button>
          <button
            type="button"
            onClick={() => handleClickCollection(boardgame_id)}
          >
            <img src="/assets/logo/eye.png" alt="logo eye" />
          </button>
        </div>
        <img src={boxImg} alt={`image de ${title}`} className="w-full h-3/4" />
        <div className="flex flex-col items-center">
          <p className="text-center">{title}</p>
          <p className="text-xs text-[darkgrey] pb-1">{year}</p>
        </div>
      </div>
    </>
  );
}

export default CollectionCard;

CollectionCard.propTypes = {
  boxImg: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  favorite: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.boolean,
  ]),
  boardgame_id: PropTypes.number,
  user_id: PropTypes.number,
  handleClickFavorite: PropTypes.func,
  handleClickCollection: PropTypes.func,
};
