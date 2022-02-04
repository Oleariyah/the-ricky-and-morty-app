import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const CharacterList = lazy(() => import("./pages/CharacterList"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ConfigRouters() {
  return (
    <Routes>
      <Route exact path="/" element={<CharacterList />} />
      <Route
        exact
        path={`/detail/:characterId/:episodeId`}
        element={<Detail />}
      />
      <Route exact path={`/not-found`} element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default ConfigRouters;
