import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLudo } from "../../context/LudoContext";

export default function AddingEditor() {
  const { setCurrentEditor } = useLudo();
  const [name, setName] = useState("");
  const [editorsList, setEditorsList] = useState([]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const reqCreators = `${import.meta.env.VITE_BACKEND_URL}/editors`;
    axios
      .get(reqCreators)
      .then((res) => setEditorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
  }, []);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  async function handleSubmitAddingEditor(e) {
    e.preventDefault();

    const API = `${import.meta.env.VITE_BACKEND_URL}/editors`;
    const data = { name: name };
    const reqEditors = `${import.meta.env.VITE_BACKEND_URL}/editors`;

    await axios
      .post(API, data)
      .then(setName(""))
      .catch((err) => console.error(err.response.data.message));
    await axios
      .get(reqEditors)
      .then((res) => setEditorsList(res.data))
      .catch((err) => console.error(err.response.data.message));
  }

  function handleClickEdit(id) {
    const editorRegister = editorsList.filter((e) => e.id === id)[0];
    setCurrentEditor(editorRegister);
    navigate("/admin/editCreator");
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center pt-8 text-3xl">
          Enregistre un nouvel éditeur
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
        onSubmit={handleSubmitAddingEditor}
      >
        <div className="flex flex-col">
          <label htmlFor="text">Nom</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            required
            className="text-dark w-72 p-1 rounded border-2 border-blue"
            onChange={handleChangeName}
          />
        </div>
        <button type="submit" className="blueButton self-center mt-2">
          Enregistrer
        </button>
      </form>
      <div className="flex flex-col items-center">
        <h1 className="text-center pt-8 text-3xl">Liste des éditeurs</h1>
        <hr className="border-[1.5px] my-8 border-pink w-1/2 max-72 text-center"></hr>
      </div>
      <div className="flex flex-wrap gap-6">
        {editorsList.map((e) => (
          <button
            key={e.id}
            onClick={() => handleClickEdit(e.id)}
            className="border-blue bg-yellow rounded border-4 p-1"
          >
            {e.name}
          </button>
        ))}
      </div>
    </>
  );
}
