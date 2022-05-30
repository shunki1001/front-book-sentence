import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

const applicationId = "1043368543816196762";
const rakutenApi = async (isbn) => {
  const resRakuten = await axios
    .get(
      `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?applicationId=${applicationId}&isbn=${isbn}`
    )
    .catch((err) => console.log("楽天API失敗"));
  return resRakuten;
};

const DataContextProvider = (props) => {
  const { userid, sentenceList, setSentenceList } = useContext(AuthContext);

  const [passId, setPassId] = useState("");
  // const [sentenceListState, setSentenceListState] = useState([]);

  console.log("DataContextが呼び出されました");
  console.log(sentenceList);

  // 初回レンダリングで走らせないためのフラグ
  // const renderFlagRef = useRef(false);
  // useEffect(() => {
  //   if (renderFlagRef.current) {
  //     console.log(rakutenApi(sentenceList[0].isbn, rakutenTemp));
  //     const f = async (index) => {
  //       const res1 = await rakutenApi(sentenceList[0].isbn);
  //       console.log("res1");
  //       console.log(res1.data.author);
  //       setSentenceListState(sentenceListState.map((item, whichIndex)=>{
  //         (whichIndex ===  index ? {...item, {author: res1.data.author}}:item)
  //       }));
  //     };
  //     sentenceList.forEach((item, index) => {
  //       f(index);
  //     });
  //   } else {
  //     // console.log("useEffectはまだ動かないよ");
  //     renderFlagRef.current = true;
  //   }
  // }, [userid]);

  // マイセンテンス画面からセンテンス登録画面へのデータ受け渡し用
  const editingSentence = sentenceList.filter((item) => {
    return item.sentence_id == passId;
  });

  // ログイン後のみ取得して、それ以降は書籍が増えたときのみ楽天APIをここ以外でコール

  const value = { passId, setPassId, editingSentence };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
