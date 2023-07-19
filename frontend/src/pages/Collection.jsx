import axios from "axios";
import { useLudo } from "../context/LudoContext";
import { useEffect, useState } from "react";
import CollectionCard from "../components/CollectionCard";

export default function Collection() {
  const { loggedInUser } = useLudo();
  const [collection, setCollection] = useState([]);

  const API = `${import.meta.env.VITE_BACKEND_URL}/user/owned/${
    loggedInUser.id
  }`;

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setCollection(res.data);
      })
      .catch((err) => console.error(err.response.data.message));
  }, [API]);

  return (
    <>
      <h2 className="text-2xl py-8">Ma collection</h2>
      <div className="flex flex-wrap gap-4">
        {collection.map((bg) => (
          <CollectionCard
            key={bg.boardgame_id}
            title={bg.title}
            boxImg={bg.boxImg}
            year={bg.year}
          />
        ))}
      </div>
    </>
  );
}
