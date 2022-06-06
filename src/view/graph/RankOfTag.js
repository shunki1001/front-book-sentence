import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AuthContext } from "../../contexts/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorData = (tagApi) => {
  let len = tagApi.length;
  const defaultColor = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
    "rgba(255, 159, 64, 0.7)",
  ];
  let exportColor = [];
  for (let i = 0; i < len; i++) {
    exportColor.push(defaultColor[i % 6]);
  }
  return exportColor;
};

const data = (tagApi) => {
  return {
    labels: tagApi.map((item) => item.tag),
    datasets: [
      {
        label: "Tag Ranking",
        data: tagApi.map((item) => item.count),
        backgroundColor: colorData(tagApi),
        borderWidth: 0,
      },
    ],
  };
};

const RankOfTag = () => {
  const { tagApi } = useContext(AuthContext);

  return <Doughnut data={data(tagApi)} />;
};

export default RankOfTag;
