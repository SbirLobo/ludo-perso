import axios from "axios";
import { useEffect, useState } from "react";
import { useLudo } from "../context/LudoContext";
import UniversCard from "../components/UniversCard";

export default function Univers() {
  const { loggedInUser, check, setCheck } = useLudo();
  const [univers, setUnivers] = useState([]);
  const [nbPlayerFilterUnivers, setNbPlayerFilterUnivers] = useState(0);
  const [filteredUnivers, setFilteredUnivers] = useState([]);

  useEffect(() => {
    const API = `${import.meta.env.VITE_BACKEND_URL}/boardgames`;

    axios
      .get(API)
      .then((res) => {
        setUnivers(res.data);
        setFilteredUnivers(res.data);
      })
      .catch((err) => console.error(err.response.data.message));
  }, []);

  const handleChangeNbPlayerFilter = (e) => {
    setNbPlayerFilterUnivers(Number(e.target.value));
  };

  const handleClickAddBoardgame = async (id) => {
    const API = `${import.meta.env.VITE_BACKEND_URL}/user/owned/${
      loggedInUser.id
    }/${id}`;
    await axios
      .post(API)
      .then(() => {
        setCheck(!check);
      })
      .catch((err) => console.error(err.response.data));
  };

  useEffect(() => {
    let nextFilteredCollection = [];
    if (nbPlayerFilterUnivers !== 0) {
      nextFilteredCollection = univers.filter((e) => {
        const nbPlayer = e.nbPlayer.split("-");
        if (
          nbPlayerFilterUnivers >= nbPlayer[0] &&
          nbPlayerFilterUnivers <= nbPlayer[1]
        ) {
          return e;
        }
      });
    } else {
      nextFilteredCollection = univers.map((e) => e);
    }

    setFilteredUnivers(nextFilteredCollection);
  }, [univers, nbPlayerFilterUnivers]);

  return (
    <>
      <div className="flex flex-start items-center">
        <h2 className="text-2xl py-8 pr-4">Univers</h2>
        <img
          className="w-10"
          src="/assets/logo/addCollection.png"
          alt="logo owned boardgame"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex py-8 gap-3 items-center">
          <p>Joueuse(s)</p>
          <select
            onChange={handleChangeNbPlayerFilter}
            name="playerNumber"
            id="playerNumber"
            className="px-4 py-1.5 text-center bg-yellow rounded-md"
          >
            <option className="bg-white" value="0">
              -
            </option>
            <option className="bg-white" value="1">
              solo
            </option>
            <option className="bg-white" value="2">
              duo
            </option>
            <option className="bg-white" value="3">
              3
            </option>
            <option className="bg-white" value="4">
              4
            </option>
            <option className="bg-white" value="5">
              5
            </option>
            <option className="bg-white" value="6">
              6
            </option>
            <option className="bg-white" value="7">
              7
            </option>
            <option className="bg-white" value="8">
              8
            </option>
            <option className="bg-white" value="9">
              9
            </option>
            <option className="bg-white" value="10">
              10
            </option>
          </select>
        </div>
        <div className="flex py-8 gap-3 items-center">
          <p>Recherche</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 pb-8">
        {filteredUnivers.map((bg) => (
          <UniversCard
            key={bg.id}
            title={bg.title}
            boxImg={bg.boxImg}
            year={bg.year}
            id={bg.id}
            handleClickAddBoardgame={handleClickAddBoardgame}
          />
        ))}
        {!filteredUnivers[0] && (
          <>
            <p>Le jeu que tu cherches n&apos;existe pas.</p>
            <p>Soit tu peux le renseigner, soit tu DOIS l&apos;inventer !</p>
          </>
        )}
      </div>
    </>
  );
}