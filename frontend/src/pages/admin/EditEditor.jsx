import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useLudo } from "../../context/LudoContext";

export default function EditEditor() {
  const { currentEditor, setEditorsList } = useLudo();
  const [name, setName] = useState(currentEditor.name);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  function handleChangeName(e) {
    setName(e.target.value);
  }

  async function handleClickBin(id) {
    const API = `${import.meta.env.VITE_BACKEND_URL}/editors/${id}`;
    const reqEditors = `${import.meta.env.VITE_BACKEND_URL}/editors`;
    await axios
      .delete(API)
      .catch((err) => console.error(err.response.data.message));
    await axios
      .get(reqEditors)
      .then((res) => setEditorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
    navigate(-1);
  }

  async function handleSubmitEditEditor(e) {
    e.preventDefault();

    const API = `${import.meta.env.VITE_BACKEND_URL}/editors/${
      currentEditor.id
    }`;
    const reqEditors = `${import.meta.env.VITE_BACKEND_URL}/editors`;
    const data = { name: name };

    await axios
      .put(API, data)
      .then(navigate("/admin/addingEditor"))
      .catch((err) => console.error(err.response.data.message));
    await axios
      .get(reqEditors)
      .then((res) => setEditorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center pt-8 text-3xl">Modifie un éditeur</h1>
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
        onSubmit={handleSubmitEditEditor}
      >
        <div className="flex flex-col">
          <label htmlFor="text">Nom</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={name}
            required
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeName}
          />
        </div>
        <button type="button" onClick={() => handleClickBin(currentEditor.id)}>
          <img className="w-14" src="/assets/logo/bin.png" alt="logo cross" />
        </button>
        <button type="submit" className="blueButton self-center mt-2">
          Enregistrer
        </button>
      </form>
    </>
  );
}
