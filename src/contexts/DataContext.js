import axios from "axios";
import React from "react";
import { createContext, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

const applicationId = "1043368543816196762";
export const rakutenApi = async (isbn) => {
  return axios.get(
    `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=${applicationId}&isbn=${isbn}`
  );
};

export const rakutenApiKeyword = async (keyword) => {
  const encodedKeyword = encodeURI(keyword);
  const url = `https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=${applicationId}&keyword=${encodedKeyword}`;
  return axios.get(url);
};

const DataContextProvider = (props) => {
  const { userid, sentenceList, setSentenceList, baseUrl, token, logout } =
    useContext(AuthContext);

  const [passId, setPassId] = useState("");

  const navigate = useNavigate();

  // リストの更新。
  const updateList = async () => {
    const resSentence = await axios
      .get(`${baseUrl.sentence}/${userid}/list`, {
        headers: {
          "X-CSRF-ACCESS-TOKEN": token,
        },
        withCredentials: true,
      })
      .catch((err) => {
        if (err.response.status == "403" || err.response.status == "401") {
          logout();
          navigate("/signin");
        }
      });
    // 取得して、Findで差分がある場合のみ、更新
    let newSenteceList = [];
    for (let i = 0; i < resSentence.data.info.length; i++) {
      let check = sentenceList.find(
        (item) => item.sentence_id == resSentence.data.info[i].sentence_id
      );
      if (check === undefined) {
        newSenteceList.push(resSentence.data.info[i]);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 楽天取得(本番用)
    // resSentence.data.info.forEach((item, resIndex) => {
    //   rakutenApi(item.isbn).then((res) => {
    //     setSentenceList((prevItems) => {
    //       return prevItems.map((oldItem, itemIndex) => {
    //         if (resIndex === itemIndex) {
    //           return {
    //             ...oldItem,
    //             author: res.data.Items[0].Item.author,
    //             title: res.data.Items[0].Item.title,
    //             imageUrl: res.data.Items[0].Item.mediumImageUrl,
    //           };
    //         } else {
    //           return { ...oldItem };
    //         }
    //       });
    //     });
    //   });
    // });
    // 楽天取得（テスト用）
    // newSenteceList.forEach((item, resIndex) => {
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
  };

  // マイセンテンス画面からセンテンス登録画面へのデータ受け渡し用
  let editingSentence = sentenceList.filter((item) => {
    return item.sentence_id == passId;
  });

  // ISBNリーダーからセンテンス登録画面へ
  const [isbnResult, setIsbnResult] = useState({});

  // どこからどこへのページ遷移の目印
  const checkFlag = useRef({});
  const flagWhereFrom = (flag) => {
    if (flag == "fromMy") {
      checkFlag.current = 1;
    } else if (flag == "fromIsbn") {
      checkFlag.current = 2;
    } else if (flag == "fromContinue") {
      checkFlag.current = 3;
    } else {
      checkFlag.current = 0;
    }
  };

  // ログイン後のみ取得して、それ以降は書籍が増えたときのみ楽天APIをここ以外でコール

  const value = {
    passId,
    setPassId,
    editingSentence,
    isbnResult,
    setIsbnResult,
    flagWhereFrom,
    checkFlag,
    updateList,
  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
