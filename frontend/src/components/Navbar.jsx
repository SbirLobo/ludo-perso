import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [active, setActive] = useState("");

  const handleClick = () => {
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
        <label className="burger text-white absolute z-10 top-[30%] right-5 lg:hidden">
          <input
            type="checkbox"
            onChange={handleClick}
            checked={active === "active"}
          />
          Burger
        </label>
        <nav className="hidden lg:flex z-20 items-center gap-10 mr-14 h-20">
          <Link
            to="/collection"
            className={`text-white w-[128px] text-center ${
              !isActive("/collection") ? "hover:underline" : ""
            } ${isActive("/collection") ? "active-nav" : ""}`}
          >
            Ma collection
          </Link>
          <Link
            to="/univers"
            className={`text-white w-[72px] text-center ${
              !isActive("/univers") ? "hover:underline" : ""
            } ${isActive("/univers") ? "active-nav" : ""}`}
          >
            Univers
          </Link>
          <Link
            to="/profil"
            className={`text-white w-[54px] text-center ${
              !isActive("/profil") ? "hover:underline" : ""
            } ${isActive("/profil") ? "active-nav" : ""}`}
          >
            Profil
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
