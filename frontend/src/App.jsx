import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Univers from "./pages/Univers";
import Layout from "./components/Layout";
import AddingBoardgame from "./pages/AddingBoardgame";
import EditBoardgame from "./pages/EditBoardgame";
import Page404 from "./pages/Page404";
import Profil from "./pages/Profil";

import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/univers" element={<Univers />} />
        <Route path="/addingBoardgame" element={<AddingBoardgame />} />
        <Route path="/editBoardgame" element={<EditBoardgame />} />
        <Route path="/profil" element={<Profil />} />

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Layout>
  );
}

export default App;
