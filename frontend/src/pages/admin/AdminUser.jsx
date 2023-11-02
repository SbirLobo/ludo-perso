import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLudo } from "../../context/LudoContext";

export default function AdminUser() {
  const navigate = useNavigate();
  const { selectedUser } = useLudo();
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({});

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const API = `${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser}`;
    axios
      .get(API)
      .then((res) => {
        setUser(res.data);
        setRefresh(!refresh);
      })
      .catch((err) => console.error(err.response.data.message));
  }, [setUser, selectedUser, refresh, setRefresh]);

  function changeAdminStatus() {
    const API = `${
      import.meta.env.VITE_BACKEND_URL
    }/users/admin/${selectedUser}`;
    axios
      .put(API, { admin: !user.admin, id: selectedUser })
      .then(setRefresh(!refresh))
      .catch((err) => console.error(err.response.data.message));
  }

  function goCollection() {
    navigate("/collection");
  }

  function deleteUser() {
    const API = `${import.meta.env.VITE_BACKEND_URL}/users/${selectedUser}`;
    user.admin && changeAdminStatus();
    axios
      .delete(API)
      .then(goBack())
      .catch((err) => console.error(err.response.data.message));
  }

  return (
    <>
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={goBack}
          className="px-3 py-1.5 bg-blue rounded-md border-4 border-yellow text-white"
        >
          Retour
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-start items-start border-blue bg-yellow rounded border-4 p-1">
          <p>{user.userName}</p>
          <p>{user.email}</p>
          {user.admin ? <p>admin</p> : <p>user</p>}
        </div>
      </div>
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={goCollection}
          className="px-3 py-1.5 bg-blue rounded-md border-4 border-yellow text-white"
        >
          Voir sa collection
        </button>
      </div>
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={changeAdminStatus}
          className="px-3 py-1.5 bg-blue rounded-md border-4 border-pink text-white"
        >
          {user.admin ? "Retirer " : "Donner "}
          les droits administrateurs
        </button>
      </div>
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={deleteUser}
          className="px-3 py-1.5 bg-pink rounded-md border-4 border-dark text-dark"
        >
          Supprimer cet utilisateur
        </button>
      </div>
    </>
  );
}
