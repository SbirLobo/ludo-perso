import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLudo } from "../context/LudoContext";

function Navbar() {
  const { loggedInUser } = useLudo();
  const location = useLocation();
  const [active, setActive] = useState("");

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setActive(active === "" ? "active" : "");
  };
  const handleClickLink = () => {
    setActive("");
  };
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="bg-dark h-24 w-full fixed z-30 flex items-center justify-between">
        <Link
          to="/collection"
          className="flex items-center"
          onClick={handleClickLink}
        >
          <img
            src="/assets/logo/logo.png"
            className="pl-6 h-16 w-23"
            alt="Logo Ludo-perso"
          />
          <span className="text-white text-2xl font-bold ml-4">Ludo-perso</span>
        </Link>
        <button
          onClick={handleClick}
          type="button"
          className="burger text-white absolute z-10 top-[30%] right-5 md:hidden"
        >
          <img
            src={
              active === "active"
                ? "/assets/logo/menu0.png"
                : "/assets/logo/menu1.png"
            }
            alt="menu"
          />
        </button>
        <nav className="hidden md:flex z-20 items-center gap-10 mr-14 h-20">
          <Link
            to="/collection"
            className={`text-white rounded-md py-2 px-1 w-[128px] text-center ${
              !isActive("/collection") ? "hover:underline" : ""
            } ${isActive("/collection") ? "active-nav" : ""}`}
          >
            Ma collection
          </Link>
          <Link
            to="/univers"
            className={`text-white rounded-md py-2 px-1 w-[82px] text-center ${
              !isActive("/univers") ? "hover:underline" : ""
            } ${isActive("/univers") ? "active-nav" : ""}`}
          >
            Univers
          </Link>
          <Link
            to="/profil"
            className={`text-white rounded-md py-2 px-1 w-[64px] text-center ${
              !isActive("/profil") ? "hover:underline" : ""
            } ${isActive("/profil") ? "active-nav" : ""}`}
          >
            {loggedInUser.userName ? loggedInUser.userName : "profil"}
          </Link>
        </nav>
      </header>
      <nav
        className={`md:hidden bg-dark w-[150px] flex flex-col z-20 py-10 absolute right-0 top-[96px] rounded-bl-md menu translate-y-[-110%] ${active} bg-primary items-center gap-10`}
      >
        <Link
          to="/collection"
          onClick={handleClickLink}
          className={`text-white rounded-md py-2 px-1 w-[128px] text-center ${
            !isActive("/collection") ? "hover:underline" : ""
          } ${isActive("/collection") ? "active-nav" : ""}`}
        >
          Ma collection
        </Link>
        <Link
          to="/univers"
          onClick={handleClickLink}
          className={`text-white rounded-md py-2 px-1 w-[82px] text-center ${
            !isActive("/univers") ? "hover:underline" : ""
          } ${isActive("/univers") ? "active-nav" : ""}`}
        >
          Univers
        </Link>
        <Link
          to="/profil"
          onClick={handleClickLink}
          className={`text-white rounded-md py-2 px-1 w-[64px] text-center ${
            !isActive("/profil") ? "hover:underline" : ""
          } ${isActive("/profil") ? "active-nav" : ""}`}
        >
          Profil
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
