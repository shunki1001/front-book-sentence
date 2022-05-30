import axios from "axios";
import React, { createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const testIsbnList = [
  {
    user_id: "U0000000079",
    sentence_id: "S0000000005",
    quote_sentence: "引用文がここに入る1",
    commentary: "コメントがここに入る1",
    memo: "自分用のメモはここに書けるよ！1",
    isbn: "9784873115658",
    release_flg: true,
    title: "リーダブルコード",
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
    title: "キギョウノカガク",
    date_created: "2022-05-15 19:08:45",
    tags: [],
  },
];

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
  const [cookies, setCookie, removeCookie] = useCookies([
    "X-CSRF-ACCESS-TOKEN",
  ]);

  // センテンス情報格納
  const [sentenceList, setSentenceList] = useState([]);

  // リダイレクト
  const navigate = useNavigate();

  console.log("AuthContextが呼び出されました");

  const apiList = [];

  const login = async (mail, password) => {
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
      .catch((err) => console.log("ログイン失敗"));
    setUserid(resToken.data.info.user_id);
    setIsAuth(true);
    navigate("/mysentence", { replace: true });
    console.log(cookies);
    const resSentence = await axios
      .get(`${baseUrl.sentence}/${userid}/list`, {
        headers: {
          "X-CSRF-ACCESS-TOKEN": { cookies },
        },
        withCredentials: true,
      })
      .catch((err) => {
        console.log("センテンス取得失敗");
      });
    console.log(resSentence.data);
    setSentenceList(testIsbnList);
  };

  // const login = (mail, password) => {
  //   axios
  //     .post(
  //       `${baseUrl.auth}/token`,
  //       {
  //         login_id: `${mail}`,
  //         password: `${password}`,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data.info);
  //       setUserid(res.data.info.user_id);
  //       setIsAuth(true);
  //       // 本当はここに、センテンス一覧取得のAPIコールがはいる。その値をもとにして、
  //       // SentenceListにセット＆楽天APIのコール
  //       // axios
  //       // .get(`${baseUrl.sentence}/${userid}/list`, {
  //       //   withCredentials: true,
  //       // }).then((res)=>{
  //       testIsbnList.forEach((item, index) => {
  //         rakutenApi(item.isbn)
  //           .then((res) => {
  //             apiList[index]["author"] = res.data.Items[0].Item.author;
  //             apiList[index]["title"] = res.data.Items[0].Item.title;
  //             apiList[index]["imageUrl"] =
  //               res.data.Items[0].Item.mediumImageUrl;
  //             console.log("楽天APIコール");
  //             navigate("/mysentence", { replace: true });
  //           })
  //           .catch((err) => {
  //             console.log(index);
  //             console.log("楽天APIミスったよ");
  //             navigate("/mysentence", { replace: true });
  //           });
  //       });
  //       // }).catch((err)=>{console.log('センテンスが取得できませんでした')})
  //     })
  //     .catch((err) => {
  //       // 残項目：ユーザーが見つからない場合も記述
  //       console.log("ログインに失敗");
  //       setTryLogin(true);
  //     });
  // };

  // const firstGetRakuten = () => {
  //   console.log("useEffect in AuthContext");
  //   // 楽天たたいて、その結果を格納
  //   // 同期処理にした方がよい？
  //   sentenceList.forEach((item, index) => {
  //     rakutenBookApi(item.isbn)
  //       .then((res) => {
  //         setSentenceList((oldItems) => {
  //           return oldItems.map((oldItem) => {
  //             return {
  //               ...oldItem,
  //               author: res.data.Items[0].Item.author,
  //               title: res.data.Items[0].Item.title,
  //               image: res.data.Items[0].Item.mediumImageUrl,
  //             };
  //           });
  //         });
  //         // sentenceList[index]["author"] = res.data.Items[0].Item.author;
  //         // sentenceList[index]["title"] = res.data.Items[0].Item.title;
  //         // sentenceList[index]["imageUrl"] =
  //         //   res.data.Items[0].Item.mediumImageUrl;
  //         // console.log(`${res.data.info.user_id} in func`);
  //         console.log("楽天APIたたいたよ");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };

  // 初回レンダリングで走らせないためのフラグ
  // const renderFlagRef = useRef(false);
  // useEffect(() => {
  //   if (renderFlagRef.current) {
  //     // console.log(cookies);
  //     // センテンス一覧を取得。useEffectでユーザーIDを引数に。
  //     // CORSの制限受けているところ？アクセストークンをCookieに載せるのがいいのか、ヘッダーの方がいいのか。。
  //     axios
  //       .get(`${baseUrl.sentence}/${userid}/list`, {
  //         // headers:{
  //         //   'X-CSRF-ACCESS-TOKEN':{cookies.csrf_access_token}
  //         // },
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         // センテンスデータを取得して、stateに格納？レンダリングされちゃう？
  //         console.log("センテンス一覧取得");
  //         console.log(res.data.info);
  //         // setSentenceList(res.data.info);

  //         // 初期値をとりあえずテストのやつに
  //         setSentenceList(testIsbnList);
  //         firstGetRakuten();
  //       })
  //       .catch((err) => {
  //         console.log(err);

  //         // 初期値をとりあえずテストのやつに
  //         setSentenceList(testIsbnList);
  //         firstGetRakuten();
  //       });
  //     navigate("/mysentence", { replace: true });
  //   } else {
  //     // console.log("useEffectはまだ動かないよ");
  //     renderFlagRef.current = true;
  //   }
  // }, [userid]);

  const logout = () => {
    setIsAuth(false);
  };

  const value = {
    isAuth,
    userid,
    login,
    logout,
    tryLogin,
    sentenceList,
    setSentenceList,
    baseUrl,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
