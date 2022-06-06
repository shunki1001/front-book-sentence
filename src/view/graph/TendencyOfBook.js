import React, { useContext, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { AuthContext } from "../../contexts/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
};

const labels = ["1~3月", "4~6月", "7~9月", "10~12月"];

const data = (sentenceList) => {
  let dataEveryMonth = [];
  for (let i = 1; i < 4; i++) {
    let exportDataObjectList = [];
    exportDataObjectList = sentenceList.filter((item) => {
      return (
        Number(item.date_created.split("-")[1]) <= i * 3 &&
        Number(item.date_created.split("-")[1]) >= 3 * i - 2
      );
    });
    dataEveryMonth.push(exportDataObjectList.length);
  }
  return {
    labels,
    datasets: [
      {
        label: "Tendency of Reading",
        data: dataEveryMonth,
        backgroundColor: "rgba(255,255,255, 0.5)",
      },
    ],
  };
};

const TendencyOfBook = () => {
  const { sentenceList } = useContext(AuthContext);

  return <Bar options={options} data={data(sentenceList)} />;
};

export default TendencyOfBook;
