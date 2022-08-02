import React, { useContext, useEffect, useRef, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

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
  const [tagApi, setTagApi] = useState([]);
  const { baseUrl, userid } = useContext(AuthContext);

  useEffect(() => {
    if (userid) {
      const updateTag = async () => {
        const updataTagApi = await axios.get(
          `${baseUrl.analysis}/${userid}/tag-use-rate`,
          {
            headers: {
              "X-CSRF-ACCESS-TOKEN": document.cookie
                .match(/csrf_access_token=.{36}/)[0]
                .split("=")[1],
            },
            withCredentials: true,
          }
        );
        setTagApi(updataTagApi.data.info);
      };
      updateTag();
    } else if (localStorage.getItem("user")) {
      const updateTag = async () => {
        const updataTagApi = await axios.get(
          `${baseUrl.analysis}/${localStorage.getItem("user")}/tag-use-rate`,
          {
            headers: {
              "X-CSRF-ACCESS-TOKEN": document.cookie
                .match(/csrf_access_token=.{36}/)[0]
                .split("=")[1],
            },
            withCredentials: true,
          }
        );
        setTagApi(updataTagApi.data.info);
      };
      updateTag();
    }
  }, []);

  return <Doughnut data={data(tagApi)} />;
};

export default RankOfTag;
