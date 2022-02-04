import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const CharacterList = lazy(() => import("./CharacterList"));
const Detail = lazy(() => import("./Detail"));

function ConfigRouters() {
  return (
    <Routes>
      <Route exact path="/" element={<CharacterList />} />
      <Route
        exact
        path={`/detail/:characterId/:episodeId`}
        element={<Detail />}
      />
    </Routes>
  );
}

export default ConfigRouters;
