import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../../components/userManager/UserCard";
import { useLudo } from "../../context/LudoContext";

export default function UserManager() {
  const { setSelectedUser } = useLudo();
  const [usersList, setUsersList] = useState([]);
  const [usersListFilter, setUsersListFilter] = useState([]);
  const [search, setSearch] = useState("");

  const isFirefox = navigator.userAgent.indexOf("Firefox") !== -1;

  useEffect(() => {
    const API = `${import.meta.env.VITE_BACKEND_URL}/users`;
    setSelectedUser(0);
    axios
      .get(API)
      .then((res) => {
        setUsersList(res.data);
        setUsersListFilter(res.data);
      })
      .catch((err) => console.error(err.response.data.message));
  }, [setSelectedUser]);

  const handleSubmitSearch = (event) => event.preventDefault();

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    const words = event.target.value.toLowerCase();
    let nextUsersListFilter = usersList;
    if (event.target.value === "") {
      setUsersListFilter(usersList);
    } else {
      nextUsersListFilter = nextUsersListFilter.filter(
        (user) =>
          user.userName.toLowerCase().includes(words) ||
          user.email.toLowerCase().includes(words)
      );
    }
    setUsersListFilter(nextUsersListFilter);
  };

  const handleClickSearch = () => {
    setSearch("");
    setUsersListFilter(usersList);
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <p>🔎</p>
        <form className="p-1" onSubmit={handleSubmitSearch}>
          <input
            className="text-primary pl-1 border-2 border-blue rounded-md w-40"
            type="search"
            placeholder="rechercher"
            value={search}
            onChange={handleChangeSearch}
          />
        </form>
        {isFirefox && (
          <button
            className="flex justify-center w-8 h-8 text-xl font-bold items-center bg-yellow rounded-full text-dark"
            type="button"
            onClick={handleClickSearch}
          >
            <span className="lexique-button-content">&times;</span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 py-8">
        {usersListFilter.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            userName={user.userName}
            email={user.email}
            admin={user.admin}
          />
        ))}
      </div>
    </>
  );
}
