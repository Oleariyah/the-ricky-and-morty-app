import React, { lazy } from "react";
import { Routes, Route, useRouteMatch } from "react-router-dom";

const CharacterList = lazy(() => import("./CharacterList"));
const Detail = lazy(() => import("./Detail"));

function ConfigRouters() {
  let { path } = useRouteMatch();
  return (
    <Routes>
      <Route exact path="/" element={<CharacterList />} />
      <Route
        exact
        path={`${path}/detail/:characterId/:episodeId`}
        element={<Detail />}
      />
    </Routes>
  );
}

export default ConfigRouters;
