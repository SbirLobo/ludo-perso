import PropTypes from "prop-types";

function UniversCard({ title, boxImg, year, id }) {
  console.log(id);
  return (
    <>
      <div className="border-blue border-2 rounded-lg w-48 flex flex-col justify-between">
        <div className="m-1 absolute w-8">
          <button type="button">
            <img src="/assets/logo/addCollection.png" alt="logo favori" />
          </button>
          <button type="button">
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

export default UniversCard;

UniversCard.propTypes = {
  boxImg: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  id: PropTypes.number,
};
