import { Link } from "react-router-dom";
import { useLudo } from "../context/LudoContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Production() {
  const { loggedInUser } = useLudo();
  const [creatorsList, setCreatorsList] = useState([]);
  const [editorsList, setEditorsList] = useState([]);
  const [selectedCreator, setSelectedCreator] = useState();
  const [selectedEditor, setSelectedEditor] = useState();

  useEffect(() => {
    const reqCreators = axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/creators`
    );
    const reqEditors = axios.get(`${import.meta.env.VITE_BACKEND_URL}/editors`);
    axios.all([reqCreators, reqEditors]).then(
      axios.spread((...res) => {
        setCreatorsList(res[0].data);
        setEditorsList(res[1].data);
      })
    );
  }, []);

  const handleChangeCreator = (e) => {
    setSelectedCreator(Number(e.target.value));
    setSelectedEditor(0);
  };
  const handleChangeEditor = (e) => {
    setSelectedCreator(0);
    setSelectedEditor(Number(e.target.value));
  };

  return (
    <>
      <div className="flex flex-col items-center md:flex-row md:justify-evenly">
        {loggedInUser.admin === 1 && (
          <Link to="/admin/addingBoardgame">
            <button
              className="rounded-md h-10 px-2 py-1 my-1 border-2 text-center border-dark bg-blue text-white"
              type="button"
            >
              + Ajouter un créateur +
            </button>
          </Link>
        )}
        {loggedInUser.admin === 1 && (
          <Link to="/admin/addingBoardgame">
            <button
              className="rounded-md h-10 px-2 py-1 my-1 border-2 text-center border-dark bg-blue text-white"
              type="button"
            >
              + Ajouter un éditeur +
            </button>
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-evenly">
        <div className="flex flex-col py-8 gap-3 items-center">
          <p>Créateurs</p>
          <select
            name="creator"
            id="creator"
            className="px-4 my-1 h-8 text-center bg-yellow rounded-md"
            onChange={handleChangeCreator}
          >
            {selectedCreator === 0 ? (
              <option className="bg-white" value="0" selected></option>
            ) : (
              <option className="bg-white" value="0"></option>
            )}
            {creatorsList.map((e) => (
              <option className="bg-white" key={e.id} value={e.id}>
                {e.firstname} {e.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col py-8 gap-3 items-center">
          <p>Editeurs</p>
          <select
            name="editor"
            id="editor"
            className="px-4 my-1 h-8 text-center bg-yellow rounded-md"
            onChange={handleChangeEditor}
          >
            {selectedEditor === 0 ? (
              <option className="bg-white" value="0" selected></option>
            ) : (
              <option className="bg-white" value="0"></option>
            )}
            {editorsList.map((e) => (
              <option className="bg-white" key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
