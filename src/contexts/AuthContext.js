import axios from "axios";
import React, { createContext, useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { require } from "axios-cookiejar-support";

export const AuthContext = createContext();

const testIsbnList = {
  info: [
    {
      user_id: "U0000000079",
      sentence_id: "S0000000005",
      quote_sentence: "引用文がここに入る1",
      commentary: "コメントがここに入る1",
      memo: "自分用のメモはここに書けるよ！1",
      isbn: "9784873115658",
      release_flg: true,
      date_created: "2022-05-07 18:07:38",
      tags: [],
    },
    {
      user_id: "U0000000079",
      sentence_id: "S0000000007",
      quote_sentence: "引用文がここに入る3",
      commentary: "コメントがここに入る3",
      memo: "自分用のメモはここに書けるよ！3",
      isbn: "9784822259754",
      release_flg: true,
      date_created: "2022-05-15 19:08:45",
      tags: [],
    },
  ],
};

const rakutenBookApi = async (isbn) => {
  const applicationId = "1029970387718010374";
  console.log(isbn);
  return axios.get(
    `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=${applicationId}&isbn=${isbn}`
  );
};

const AuthContextProvider = (props) => {
  const baseUrl = {
    user: "https://disk.mydns.jp/book-sentence-api/api/user",
    sentence: "https://disk.mydns.jp/book-sentence-api/api/sentence",
    tool: "https://disk.mydns.jp/book-sentence-api/tools",
    analysis: "https://disk.mydns.jp/book-sentence-api/analysis",
    auth: "https://disk.mydns.jp/book-sentence-api/auth",
  };
  // ログイン情報
  const [isAuth, setIsAuth] = useState(false);
  const [tryLogin, setTryLogin] = useState(false);

  // ユーザー情報
  const [userid, setUserid] = useState("");
  // クッキー
  const [cookies, setCookie, removeCookie] = useCookies([]);

  // お試し
  // const jar = new CookieJar();
  // const client = wrapper(axios.create({ jar }));
  // const Axios = require("axios").default;
  // const AxiosCookiejarSupport = require("axios-cookiejar-support").default;

  // // Axiosにプラグイン注入
  // // AxiosCookiejarSupport(Axios);

  // let client = Axios.create({
  //   jar: true, // cookiejarを有効化する
  //   withCredentials: true, // 依然として必要
  // });

  // センテンス情報格納
  // 初期値をとりあえずテストのやつに
  let sentenceList = testIsbnList;

  // リダイレクト
  const navigate = useNavigate();

  console.log("contextが呼び出されました");

  const login = (mail, password) => {
    axios
      .post(`${baseUrl.auth}/token`, {
        login_id: `${mail}`,
        password: `${password}`,
      })
      .then((res) => {
        console.log(res.data.info);
        setUserid(res.data.info.user_id);
        setIsAuth(true);
        setCookie("access_token_cookie", res.data.access_token, {
          maxAge: 3600,
        });
        navigate("/mysentence", { replace: true });
      })
      .catch((err) => {
        console.log("ログインに失敗");
        setTryLogin(true);
      });
  };

  // 初回レンダリングで走らせないためのフラグ
  const renderFlagRef = useRef(false);
  useEffect(() => {
    if (renderFlagRef.current) {
      // console.log(cookies);
      // センテンス一覧を取得。useEffectでユーザーIDを引数に。
      // CORSの制限受けているところ？アクセストークンをCookieに載せるのがいいのか、ヘッダーの方がいいのか。。
      axios
        .get(`${baseUrl.sentence}/${userid}/list`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token_cookie}`,
          },
        })
        .then((res) => {
          // センテンスデータを取得して、stateに格納？レンダリングされちゃう？
          console.log("センテンス一覧取得");
          console.log(res.data.info);
          // setSentenceList(res.data.info);
        })
        .catch((err) => {
          console.log(err);
        });

      // 楽天たたいて、その結果を格納
      // 同期処理にした方がよい？
      sentenceList.info.forEach((item, index) => {
        rakutenBookApi(item.isbn)
          .then((res) => {
            sentenceList.info[index]["author"] = res.data.Items[0].Item.author;
            sentenceList.info[index]["title"] = res.data.Items[0].Item.isbn;
            sentenceList.info[index]["imageUrl"] =
              res.data.Items[0].Item.mediumImageUrl;
            // console.log(`${res.data.info.user_id} in func`);
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      console.log("useEffectはまだ動かないよ");
      renderFlagRef.current = true;
    }
  }, [userid]);

  const logout = () => {
    setIsAuth(false);
  };

  const value = { isAuth, login, logout, tryLogin, sentenceList, baseUrl };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
