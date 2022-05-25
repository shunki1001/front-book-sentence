import React, { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  // ログイン情報
  const [isAuth, setIsAuth] = useState(false);

  // センテンス情報格納
  const [sentenceList, setSentenceList] = useState([]);

  const navigate = useNavigate();

  console.log("contextが呼び出されました");

  const login = () => {
    // アクセストークン取得API
    // UserID取得API
    setIsAuth(true);
    console.log("contextが呼び出されましたin関数（login）");
    // リダイレクト
    navigate("/mysentence");
    console.log("リダイレクト後");
    // センテンス一覧取得
    // 楽天ブックスAPIたたく
  };

  return (
    <AuthContext.Provider value={{ login, isAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
