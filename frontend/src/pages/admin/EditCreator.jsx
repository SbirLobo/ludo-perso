import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useLudo } from "../../context/LudoContext";

export default function EditCreator() {
  const { currentCreator, setCreatorsList } = useLudo();
  const [firstname, setFirstname] = useState(currentCreator.firstname);
  const [lastname, setLastname] = useState(currentCreator.lastname);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  function handleChangeFirstname(e) {
    setFirstname(e.target.value);
  }

  function handleChangeLastname(e) {
    setLastname(e.target.value);
  }

  async function handleClickBin(id) {
    const API = `${import.meta.env.VITE_BACKEND_URL}/creators/${id}`;
    const reqCreators = `${import.meta.env.VITE_BACKEND_URL}/creators`;
    await axios
      .delete(API)
      .catch((err) => console.error(err.response.data.message));
    await axios
      .get(reqCreators)
      .then((res) => setCreatorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
    navigate(-1);
  }

  async function handleSubmitEditCreator(e) {
    e.preventDefault();

    const API = `${import.meta.env.VITE_BACKEND_URL}/creators/${
      currentCreator.id
    }`;
    const reqCreators = `${import.meta.env.VITE_BACKEND_URL}/creators`;
    const data = { firstname: firstname, lastname: lastname };

    await axios
      .put(API, data)
      .then(navigate("/admin/addingCreator"))
      .catch((err) => console.error(err.response.data.message));
    await axios
      .get(reqCreators)
      .then((res) => setCreatorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center pt-8 text-3xl">Modifie un créateur</h1>
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
        onSubmit={handleSubmitEditCreator}
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
        <button type="button" onClick={() => handleClickBin(currentCreator.id)}>
          <img className="w-14" src="/assets/logo/bin.png" alt="logo cross" />
        </button>
        <button type="submit" className="blueButton self-center mt-2">
          Enregistrer
        </button>
      </form>
    </>
  );
}
