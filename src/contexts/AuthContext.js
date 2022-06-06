import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rakutenApi } from "./DataContext";
import noimage from "../static/images/noimage2.png";

export const AuthContext = createContext();

// テスト用
const testIsbnList = [
  {
    user_id: "U0000000079",
    sentence_id: "S0000000005",
    quote_sentence: "引用文がここに入る1",
    commentary: "コメントがここに入る1",
    memo: "自分用のメモはここに書けるよ！1",
    isbn: "9784873115658",
    release_flg: true,
    date_created: "2022-05-07 18:07:38",
    tags: [
      {
        user_id: "U0000000079",
        sentence_id: "S0000000011",
        tag_no: 0,
        tag: "tag_2",
      },
      {
        user_id: "U0000000079",
        sentence_id: "S0000000011",
        tag_no: 1,
        tag: "tag_1",
      },
    ],
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
];

const testResRakuten = [
  {
    author: "ダスティン・ボズウェル/トレバー・フォシェ",
    title: "リーダブルコード",
    titleKana: "リーダブルコード",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/5658/9784873115658.jpg?_ex=120x120",
  },
  {
    author: "田所　雅之",
    title: "起業の科学",
    titleKana: "キギョウノカガク",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9754/9784822259754.jpg?_ex=120x120",
  },
  {
    author: "田所　雅之",
    title: "起業の科学",
    titleKana: "キギョウノカガク",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9754/9784822259754.jpg?_ex=120x120",
  },
  {
    author: "田所　雅之",
    title: "起業の科学",
    titleKana: "キギョウノカガク",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9754/9784822259754.jpg?_ex=120x120",
  },
  {
    author: "田所　雅之",
    title: "起業の科学",
    titleKana: "キギョウノカガク",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9754/9784822259754.jpg?_ex=120x120",
  },
  {
    author: "ダスティン・ボズウェル/トレバー・フォシェ",
    title: "リーダブルコード",
    titleKana: "リーダブルコード",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/5658/9784873115658.jpg?_ex=120x120",
  },
  {
    author: "ダスティン・ボズウェル/トレバー・フォシェ",
    title: "リーダブルコード",
    titleKana: "リーダブルコード",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/5658/9784873115658.jpg?_ex=120x120",
  },
  {
    author: "田所　雅之",
    title: "起業の科学",
    titleKana: "キギョウノカガク",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9754/9784822259754.jpg?_ex=120x120",
  },
  {
    author: "田所　雅之",
    title: "起業の科学",
    titleKana: "キギョウノカガク",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9754/9784822259754.jpg?_ex=120x120",
  },
  {
    author: "田所　雅之",
    title: "起業の科学",
    titleKana: "キギョウノカガク",
    mediumImageUrl:
      "https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/9754/9784822259754.jpg?_ex=120x120",
  },
];

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

  const login = async (mail, password) => {
    localStorage.setItem("mail", mail);
    localStorage.setItem("password", password);
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
        console.log("ログイン失敗");
        setTryLogin(true);
      });
    setUserid(resToken.data.info.user_id);
    setToken(document.cookie.split(";")[0].split("=")[1]);
    setRefreshToken(document.cookie.split(";")[1].split("=")[1]);
    console.log(document.cookie.split(";")[1].split("=")[1]);

    // 初回ログイン時にログインした情報をローカルストレージに保存
    if (!localStorage.getItem("user")) {
      console.log("始めて");
      localStorage.setItem("user", resToken.data.info.user_id);
    }
  };

  // すでにログインがあるかどうか確認
  useEffect(() => {
    if (localStorage.getItem("user")) {
      console.log("ローカルストレージにログイン履歴発見");
      login(localStorage.getItem("mail"), localStorage.getItem("password"));
    }
  }, []);

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
          .catch((err) => {
            console.log("センテンス取得失敗");
          });
        console.log(resSentence.data.info);
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
          }, resIndex * 1000);
        });

        // 楽天取得（テスト用）
        // resSentence.data.info.forEach((item, resIndex) => {
        //   setSentenceList((prevItems) => {
        //     return prevItems.map((oldItem, itemIndex) => {
        //       if (resIndex === itemIndex) {
        //         return {
        //           ...oldItem,
        //           author: testResRakuten[itemIndex].author,
        //           title: testResRakuten[itemIndex].title,
        //           titleKana: testResRakuten[itemIndex].titleKana,
        //           imageUrl: testResRakuten[itemIndex].mediumImageUrl,
        //         };
        //       } else {
        //         return { ...oldItem };
        //       }
        //     });
        //   });
        // });

        await new Promise((resolve) =>
          setTimeout(resolve, resSentence.data.info.length * 1000 + 500)
        );
        setLoading(false);

        let localToken = token;
        let localRefreshToken = refreshToken;
        const getRefreshToken = async () => {
          await axios
            .post(
              `${baseUrl.auth}/refresh`,
              {},
              {
                headers: {
                  "X-CSRF-REFRESH-TOKEN": localRefreshToken,
                  "X-CSRF-ACCESS-TOKEN": localToken,
                },
                withCredentials: true,
              }
            )
            .catch((err) => {
              console.log("アクセストークン更新失敗");
            });
          localRefreshToken = document.cookie.split(";")[1].split("=")[1];
          localToken = document.cookie.split(";")[0].split("=")[1];

          setToken(localToken);
        };

        setInterval(getRefreshToken, 1000000);

        navigate("/mysentence", { replace: true });
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
  const renderFlagRef2 = useRef(false);
  useEffect(() => {
    const updateTag = async () => {
      const updataTagApi = await axios.get(
        `${baseUrl.analysis}/${userid}/tag-use-rate`,
        {
          headers: {
            "X-CSRF-ACCESS-TOKEN": token,
          },
          withCredentials: true,
        }
      );
      setTagApi(updataTagApi.data.info);
    };
    updateTag();
  }, [userid]);

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
