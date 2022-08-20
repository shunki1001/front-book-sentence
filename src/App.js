import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import MainLayout from "./MainLayout";
import MyPage from "./view/MyPage";
import MySentence from "./view/MySentence";
import ListBook from "./view/ListBook";
import DetailBook from "./view/DetailBook";
import Signup from "./view/Signup";
import Signin from "./view/Signin";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { CookiesProvider } from "react-cookie";
import DataContextProvider from "./contexts/DataContext";
import { config } from "./config";

function App() {
  return (
    <BrowserRouter basename={config.routeBase}>
      <AuthContextProvider>
        <DataContextProvider>
          <CookiesProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="mypage" element={<MyPage />} />
                  <Route path="" element={<MySentence />} />
                  <Route path="listbook" element={<ListBook />} />
                  <Route path="detailbook" element={<DetailBook />} />
                </Route>
              </Route>
            </Routes>
          </CookiesProvider>
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
