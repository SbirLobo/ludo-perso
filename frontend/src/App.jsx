import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Univers from "./pages/Univers";
import Layout from "./components/Layout";
import AddingBoardgame from "./pages/admin/AddingBoardgame";
import EditBoardgame from "./pages/admin/EditBoardgame";
import Page404 from "./pages/Page404";
import Profil from "./pages/Profil";
import ProtectedRoutes from "./Protections/ProtectedRoutes";

import "./App.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? (
    <Layout>
      <Routes>
        <Route path="/admin/addingBoardgame" element={<AddingBoardgame />} />
        <Route path="/admin/editBoardgame" element={<EditBoardgame />} />
      </Routes>
    </Layout>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/collection" element={<Collection />} />
          <Route path="/univers" element={<Univers />} />
          <Route path="/profil" element={<Profil />} />
        </Route>

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Layout>
  );
}

export default App;
