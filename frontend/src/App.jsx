import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Univers from "./pages/Univers";
import Layout from "./components/Layout";
import AddingBoardgame from "./pages/admin/AddingBoardgame";
import AddingCreator from "./pages/admin/AddingCreator";
import AddingEditor from "./pages/admin/AddingEditor";
import EditBoardgame from "./pages/admin/EditBoardgame";
import Page404 from "./pages/Page404";
import Profil from "./pages/Profil";
import ProtectedRoutes from "./Protections/ProtectedRoutes";
import AdminRoutes from "./Protections/ProtectedRoutes";

import "./App.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? (
    <Layout>
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/addingBoardgame" element={<AddingBoardgame />} />
          <Route path="/admin/addingCreator" element={<AddingCreator />} />
          <Route path="/admin/addingEditor" element={<AddingEditor />} />
          <Route path="/admin/editBoardgame" element={<EditBoardgame />} />
        </Route>
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
