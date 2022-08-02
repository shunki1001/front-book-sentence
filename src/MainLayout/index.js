import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/system";

const MainLayout = () => {
  const onUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    // イベントの設定
    window.addEventListener("beforeunload", onUnload);

    return () => {
      // イベントの設定解除
      window.removeEventListener("beforeunload", onUnload);
    };
  });

  return (
    <Box sx={{ maxWidth: "375px", margin: "0 auto" }}>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
