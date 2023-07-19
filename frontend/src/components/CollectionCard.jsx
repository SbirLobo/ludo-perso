import PropTypes from "prop-types";

function CollectionCard({ boxImg, title, year }) {
  console.log(boxImg);
  console.log(title);
  return (
    <>
      <div className="border-blue border-2 rounded-lg w-48 flex flex-col justify-between">
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
};
