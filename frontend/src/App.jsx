import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Univers from "./pages/Univers";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";

import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/univers" element={<Univers />} />

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Layout>
  );
}

export default App;
