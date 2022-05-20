import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import MyPage from "./view/MyPage";
import MySentence from "./view/MySentence";
import ListBook from "./view/ListBook";
import DetailBook from "./view/DetailBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="mypage" element={<MyPage />} />
          <Route path="mysentence" element={<MySentence />} />
          <Route path="listbook" element={<ListBook />} />
          <Route path="detailbook" element={<DetailBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
