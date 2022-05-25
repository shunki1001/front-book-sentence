import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import MyPage from "./view/MyPage";
import MySentence from "./view/MySentence";
import ListBook from "./view/ListBook";
import DetailBook from "./view/DetailBook";
import Signup from "./view/Signup";
import Signin from "./view/Signin";
import AuthContextProvider from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="signup" element={<Signup />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="mysentence" element={<MySentence />} />
            <Route path="listbook" element={<ListBook />} />
            <Route path="detailbook" element={<DetailBook />} />
            <Route path="signin" element={<Signin />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
