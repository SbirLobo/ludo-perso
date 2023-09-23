import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLudo } from "../../context/LudoContext";

export default function AddingCreator() {
  const { setCurrentCreator } = useLudo();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [creatorsList, setCreatorsList] = useState([]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const reqCreators = `${import.meta.env.VITE_BACKEND_URL}/creators`;
    axios
      .get(reqCreators)
      .then((res) => setCreatorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
  }, []);

  function handleChangeFirstname(e) {
    setFirstname(e.target.value);
  }

  function handleChangeLastname(e) {
    setLastname(e.target.value);
  }

  async function handleSubmitAddingCreator(e) {
    e.preventDefault();

    const API = `${import.meta.env.VITE_BACKEND_URL}/creators`;
    const reqCreators = `${import.meta.env.VITE_BACKEND_URL}/creators`;
    const data = { firstname: firstname, lastname: lastname };

    await axios
      .post(API, data)
      .then(() => {
        setFirstname("");
        setLastname("");
      })
      .catch((err) => console.error(err.response.data.message));
    await axios
      .get(reqCreators)
      .then((res) => setCreatorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
  }

  function handleClickEdit(id) {
    const creatorRegister = creatorsList.filter((e) => e.id === id)[0];
    setCurrentCreator(creatorRegister);
    navigate("/admin/editCreator");
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center pt-8 text-3xl">
          Enregistre un nouveau créateur
        </h1>
        <hr className="border-[1.5px] my-8 border-pink w-1/2 max-72 text-center"></hr>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={goBack}
          className="px-3 py-1.5 bg-blue rounded-md border-4 border-yellow text-white"
        >
          Retour
        </button>
      </div>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmitAddingCreator}
      >
        <div className="flex flex-col">
          <label htmlFor="text">Prénom</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstname}
            required
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeFirstname}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="text">Nom</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastname}
            required
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeLastname}
          />
        </div>
        <button type="submit" className="blueButton self-center mt-2">
          Enregistrer
        </button>
      </form>
      <div className="flex flex-col items-center">
        <h1 className="text-center pt-8 text-3xl">Liste des créateurs</h1>
        <hr className="border-[1.5px] my-8 border-pink w-1/2 max-72 text-center"></hr>
      </div>
      <div className="flex flex-wrap gap-6">
        {creatorsList.map((e) => (
          <button
            key={e.id}
            onClick={() => handleClickEdit(e.id)}
            className="border-blue bg-yellow rounded border-4 p-1"
          >
            {e.firstname} {e.lastname}
          </button>
        ))}
      </div>
    </>
  );
}
