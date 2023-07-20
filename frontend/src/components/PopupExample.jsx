import PopupBLABLA from "../components/PopupBLABLA";

const [hidden, setHidden] = useState(false);

const handleClickBLABLA = () => {
  setHidden(!hidden);
};

<PopupBLABLA
  hidden={hidden}
  setHidden={setHidden}
  handleClickBLABLA={handleClickBLABLA}
/>;

import PropTypes from "prop-types";

///////////////////////////////////////////////////////////////

export default function PopupBLABLA({ hidden, setHidden }) {
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
          <div className="flex flex-col items-center"></div>
        </div>
      </div>
    </div>
  );
}

PopupBLABLA.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
};
