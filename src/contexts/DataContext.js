import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [passId, setPassId] = useState("");
  const { sentenceList } = useContext(AuthContext);

  const editingSentence = sentenceList.info.filter((item) => {
    return item.sentence_id == passId;
  });

  const value = { passId, setPassId, editingSentence };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};

export default DataContextProvider;
