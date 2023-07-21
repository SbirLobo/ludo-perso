import axios from "axios";
import { useLudo } from "../context/LudoContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopupInscription from "../components/PopupInscription";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser, setLoggedInUser } = useLudo();
  const [hidden, setHidden] = useState(false);
  const APILOGIN = `${import.meta.env.VITE_BACKEND_URL}/login`;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitLogIn = (e) => {
    e.preventDefault();
    axios
      .post(APILOGIN, { ...user }, { withCredentials: true })
      .then((res) => {
        setLoggedInUser({
          id: res.data.user.id,
          userName: res.data.user.userName,
          email: res.data.user.email,
          admin: res.data.user.admin,
        });
        navigate("/collection");
      })
      .catch((err) => console.error(err.response.data.message));
  };

  const handleClickInscription = () => {
    setHidden(!hidden);
  };

  return (
    <>
      <h1 className="text-center pt-8 text-3xl">
        Bienvenue dans ta ludothèque virtuelle.
      </h1>
      <form
        className="flex flex-col pt-16 gap-4 items-center"
        onSubmit={handleSubmitLogIn}
      >
        <div className="">
          <label htmlFor="email">Adresse mail</label>
          <br />
          <input
            type="email"
            name="email"
            id="email-connection"
            placeholder="exemple@gmail.com"
            required
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit" className="blueButton self-center mt-2">
          Go !
        </button>
        <hr className="border-[1.5px] mt-8 border-pink w-1/2 max-w-72 text-center"></hr>
      </form>
      <div className="flex flex-col items-center ">
        <p className="py-8">C&apos;est ta première fois ?</p>
        <button
          type="button"
          onClick={handleClickInscription}
          className="pinkButton text-xs"
        >
          PAR ICI
        </button>
        <hr className="border-[1.5px] my-8 border-pink w-1/2 max-72 text-center"></hr>
      </div>
      <PopupInscription hidden={hidden} setHidden={setHidden} />
    </>
  );
}
