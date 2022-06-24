import React from "react";
//ajouter Link pour des liens
import { Routes, Route } from "react-router-dom";

import Adapt from "../pages/Adapt";
import NotAdapt from "../pages/NotAdapt";

const index = () => {
  return (
    <div className="app-routes">
      <Routes>
        <Route path="/" element={<Adapt />} />
        <Route path="/view" element={<NotAdapt />} />
      </Routes>
    </div>
  );
};

export default index;
