import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Univers from "./pages/Univers";
import Layout from "./components/Layout";
import AddingBoardgame from "./pages/admin/AddingBoardgame";
import AddingCreator from "./pages/admin/AddingCreator";
import AddingEditor from "./pages/admin/AddingEditor";
import EditBoardgame from "./pages/admin/EditBoardgame";
import EditCreator from "./pages/admin/EditCreator";
import EditEditor from "./pages/admin/EditEditor";
import Page404 from "./pages/Page404";
import Profil from "./pages/Profil";
import ProtectedRoutes from "./Protections/ProtectedRoutes";
import AdminRoutes from "./Protections/ProtectedRoutes";
import UserManager from "./pages/admin/UserManager";
import AdminUser from "./pages/admin/AdminUser";

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
          <Route path="/admin/editCreator" element={<EditCreator />} />
          <Route path="/admin/editEditor" element={<EditEditor />} />
          <Route path="/admin/userManager" element={<UserManager />} />
          <Route path="/admin/adminUser" element={<AdminUser />} />
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
