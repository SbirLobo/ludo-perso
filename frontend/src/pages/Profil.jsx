import { useLudo } from "../context/LudoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profil() {
  const { loggedInUser, setLoggedInUser, collection } = useLudo();
  const navigate = useNavigate();

  function handleClickLogout() {
    const APILOGOUT = `${import.meta.env.VITE_BACKEND_URL}/logout`;
    axios
      .get(APILOGOUT, { withCredentials: true })
      .then((res) => {
        console.warn(res.data.message);
        setLoggedInUser({
          id: "",
          userName: "",
          email: "",
        });
        navigate("/");
      })
      .catch((err) => console.error(err.response.data.message));
  }

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between py-8">
        <div className="flex justify-center">
          <img
            className="object-contain max-w-1/2 max-w-[75%] md:max-w-[50%]"
            src="/assets/logo/logo.png"
            alt="logo ludo-perso"
          />
        </div>
        <div className="flex flex-col justify-between pb-6">
          <div className="pb-6">
            <p className="text-3xl">Bienvenue {loggedInUser.userName}</p>
            <p className="text-xl">{loggedInUser.email}</p>
          </div>
          <p className="text-xl pb-6">
            Tu possèdes{" "}
            <span className="font-bold text-2xl text-pink">
              {collection.length}
            </span>{" "}
            {collection.length <= 1 ? "jeu" : "jeux"} dans ta collection.
          </p>
          <button
            className="flex justify-center pb-6"
            type="button"
            onClick={handleClickLogout}
          >
            <img src="/assets/logo/logout.png" alt="logo logout" />
          </button>
        </div>
      </div>
    </>
  );
}
