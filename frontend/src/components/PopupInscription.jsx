import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

export default function PopupInscription({ hidden, setHidden }) {
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

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

  const handleChangeInscription = (e) => {
    if (e.target.name === "password") {
      setPwd(e.target.value);
    } else if (e.target.name === "confirmpassword") {
      setConfirmPwd(e.target.value);
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitInscription = (e) => {
    const APINSCRIPTION = `${import.meta.env.VITE_BACKEND_URL}/inscription`;
    e.preventDefault();
    if (pwd === confirmPwd && user.userName !== "" && user.email !== "") {
      const newUser = { ...user, password: pwd };
      axios
        .post(APINSCRIPTION, newUser, { withCredentials: true })
        .then((res) => {
          console.warn(res.data.message);
          window.location.href = "/";
        })
        .catch((err) => console.error(err.response.data.message));
    }
  };

  return (
    <div className={`${!hidden ? "hidden" : ""} flex`}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="popupLayout bg-dark"
        onClick={handleParentClick}
      >
        <div className="rounded-md border-4 border-yellow bg-white h-[80%] max-w-4xl w-[80%] p-5 cursor-default overflow-scroll">
          <div className="flex flex-row-reverse">
            <button type="button" onClick={handleClickCross}>
              <img
                className="w-10"
                src="/assets/logo/cross.png"
                alt="logo cross"
              />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <form
              className="flex flex-col pt-16 gap-4 items-center"
              onSubmit={handleSubmitInscription}
            >
              <div>
                <label htmlFor="email">Adresse mail</label>
                <br />
                <input
                  type="email"
                  name="email"
                  id="email-register"
                  placeholder="exemple@gmail.com"
                  required
                  className="text-dark w-72 p-1 rounded border-2 border-blue"
                  onChange={handleChangeInscription}
                />
              </div>
              <br />
              <div>
                <label htmlFor="userName">Pseudo</label>
                <br />
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  required
                  className="text-dark w-72 p-1 rounded border-2 border-blue"
                  onChange={handleChangeInscription}
                />
              </div>
              <br />
              <div>
                <label htmlFor="password">Mot de passe</label>
                <br />
                <input
                  type="password"
                  name="password"
                  required
                  className="text-dark w-72 p-1 rounded border-2 border-blue"
                  onChange={handleChangeInscription}
                />
                <br />
                <br />
                <label htmlFor="confirmpassword">Confirmer mot de passe</label>
                <br />
                <input
                  type="password"
                  name="confirmpassword"
                  required
                  className="text-dark w-72 p-1 rounded border-2 border-blue"
                  onChange={handleChangeInscription}
                />
              </div>
              <br />
              <button type="submit" className="blueButton self-center mt-2">
                Valider
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

PopupInscription.propTypes = {
  hidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
};
