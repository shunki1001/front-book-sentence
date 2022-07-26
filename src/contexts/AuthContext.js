import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { rakutenApi } from "./DataContext";
import noimage from "../static/images/noimage2.png";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const baseUrl = {
    user: "/book-sentence-api/api/user",
    sentence: "/book-sentence-api/api/sentence",
    tool: "/book-sentence-api/tools",
    analysis: "/book-sentence-api/api/analysis",
    auth: "/book-sentence-api/auth",
  };
  // ログイン情報
  const [loading, setLoading] = useState(false);
  const [tryLogin, setTryLogin] = useState(false);

  // ユーザー情報
  const [userid, setUserid] = useState("");
  // CSRFトークン
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  // センテンス情報格納
  const [sentenceList, setSentenceList] = useState([]);
  const [updateItem, setUpdateItem] = useState({});
  const [tagApi, setTagApi] = useState([]);

  // リダイレクト
  const navigate = useNavigate();
  const location = useLocation();

  // すでにログインがあるかどうか確認
  useEffect(() => {
    // if (localStorage.getItem("user")) {
    //   login(localStorage.getItem("mail"), localStorage.getItem("password"));
    // }
    if (document.cookie) {
      if (document.cookie.match(/csrf_refresh_token=.{36}/)[0].split("=")[1]) {
        const getRefreshToken = async () => {
          await axios
            .post(
              `${baseUrl.auth}/refresh`,
              {},
              {
                headers: {
                  "X-CSRF-REFRESH-TOKEN": document.cookie
                    .match(/csrf_refresh_token=.{36}/)[0]
                    .split("=")[1],
                },
                withCredentials: true,
              }
            )
            .catch((err) => {
              // console.log("アクセストークン更新失敗");
              navigate("/signin", { replace: true });
            })
            .then((res) => {
              setToken(
                document.cookie
                  .match(/csrf_access_token=.{36}/)[0]
                  .split("=")[1]
              );
              setRefreshToken(
                document.cookie
                  .match(/csrf_refresh_token=.{36}/)[0]
                  .split("=")[1]
              );
              if (localStorage.getItem("user")) {
                setUserid(localStorage.getItem("user"));
              } else {
                navigate("/signin", { replace: true });
              }
            });
        };
        getRefreshToken();
      } else {
        navigate("/signin", { replace: true });
      }
    }
  }, []);

  // ログイン関数
  const login = async (mail, password) => {
    // localStorage.setItem("mail", mail);
    // localStorage.setItem("password", password);
    const resToken = await axios
      .post(
        `${baseUrl.auth}/token`,
        {
          login_id: `${mail}`,
          password: `${password}`,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        setTryLogin(true);
      });
    setUserid(resToken.data.info.user_id);
    setToken(document.cookie.match(/csrf_access_token=.{36}/)[0].split("=")[1]);
    setRefreshToken(
      document.cookie.match(/csrf_refresh_token=.{36}/)[0].split("=")[1]
    );

    // 初回ログイン時にログインした情報をローカルストレージに保存
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", resToken.data.info.user_id);
    }
  };

  // 初回レンダリングで走らせないためのフラグ
  const renderFlagRef = useRef(false);
  useEffect(() => {
    if (renderFlagRef.current) {
      const getSentece = async () => {
        const resSentence = await axios
          .get(`${baseUrl.sentence}/${userid}/list`, {
            headers: {
              "X-CSRF-ACCESS-TOKEN": token,
            },
            withCredentials: true,
          })
          .catch((err) => { });
        setSentenceList(resSentence.data.info);

        // 楽天取得(本番用)
        setLoading(true);
        resSentence.data.info.forEach((item, resIndex) => {
          // 楽天APIが1秒間隔の通信より早いとアクセス制限かけられるから
          // 1秒毎に実行=>setTimeout
          setTimeout(() => {
            rakutenApi(item.isbn)
              .then((res) => {
                // 本の情報を取得できた場合
                console.log(res.data.Items[0].Item.author);
                setSentenceList((prevItems) => {
                  return prevItems.map((oldItem, itemIndex) => {
                    // 該当のオブジェクトにだけ書籍情報を追加
                    if (resIndex === itemIndex) {
                      return {
                        ...oldItem,
                        author: res.data.Items[0].Item.author,
                        title: res.data.Items[0].Item.title,
                        imageUrl: res.data.Items[0].Item.mediumImageUrl,
                      };
                    } else {
                      return { ...oldItem };
                    }
                  });
                });
              })
              .catch((err) => {
                // 本の情報を取得できなかった場合
                setSentenceList((prevItems) => {
                  return prevItems.map((oldItem, itemIndex) => {
                    // 該当のオブジェクトにだけ書籍情報を追加
                    if (resIndex === itemIndex) {
                      return {
                        ...oldItem,
                        author: "書籍情報なし",
                        title: "書籍情報なし",
                        imageUrl: noimage,
                      };
                    } else {
                      return { ...oldItem };
                    }
                  });
                });
              });
          }, resIndex * 800 + 800);
        });

        await new Promise((resolve) =>
          setTimeout(resolve, resSentence.data.info.length * 800 + 500)
        );
        console.clear();
        setLoading(false);

        // const getRefreshToken = async () => {
        //   console.log(refreshToken);
        //   await axios
        //     .post(
        //       `${baseUrl.auth}/refresh`,
        //       {},
        //       {
        //         headers: {
        //           "X-CSRF-REFRESH-TOKEN": refreshToken,
        //         },
        //         withCredentials: true,
        //       }
        //     )
        //     .catch((err) => {
        //       console.log("アクセストークン更新失敗");
        //     })
        //     .then(() => {
        //       setToken(
        //         document.cookie
        //           .match(/csrf_access_token=.{36}/)[0]
        //           .split("=")[1]
        //       );
        //       setRefreshToken(
        //         document.cookie
        //           .match(/csrf_refresh_token=.{36}/)[0]
        //           .split("=")[1]
        //       );
        //     });
        // };

        // setInterval(getRefreshToken, 1800 * 1000);

        if (
          location.pathname === "/signin" ||
          location.pathname === "/signup"
        ) {
          navigate("/", { replace: true });
        }
      };
      getSentece();
    } else {
      // console.log("useEffectはまだ動かないよ");
      renderFlagRef.current = true;
    }
  }, [userid]);

  // updateされた時に、リストにアップデート項目
  useEffect(() => {
    // updateの場合、sentence_idはレスポンスにない
    // 逆に登録の場合、sentence_idをもっているから、リストに追加
    if (updateItem.sentence_id) {
      setSentenceList([...sentenceList, updateItem]);
    }
  }, [updateItem]);

  // タグ使用率
  // const renderFlagRef2 = useRef(false);
  // useEffect(() => {
  //   if (renderFlagRef2.current == true) {
  //     const updateTag = async () => {
  //       const updataTagApi = await axios.get(
  //         `${baseUrl.analysis}/${userid}/tag-use-rate`,
  //         {
  //           headers: {
  //             "X-CSRF-ACCESS-TOKEN": token,
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       setTagApi(updataTagApi.data.info);
  //     };
  //     updateTag();
  //   } else if (renderFlagRef2.current == false) {
  //     renderFlagRef2.current = true;
  //   }
  // }, [userid]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("mail");
    localStorage.removeItem("password");
  };

  const value = {
    userid,
    login,
    logout,
    tryLogin,
    sentenceList,
    setSentenceList,
    baseUrl,
    token,
    loading,
    setLoading,
    updateItem,
    setUpdateItem,
    tagApi,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
