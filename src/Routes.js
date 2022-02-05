import { Routes, Route, Navigate } from "react-router-dom";
import Detail from "./pages/Detail";
import CharacterList from "./pages/CharacterList";
import NotFound from "./pages/NotFound";

function ConfigRouters() {
  return (
    <Routes>
      <Route exact path="/" element={<CharacterList />} />
      <Route exact path="detail/:characterId/:episodeId" element={<Detail />} />
      <Route exact path="not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default ConfigRouters;
