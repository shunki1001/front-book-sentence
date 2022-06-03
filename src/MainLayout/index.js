import { Navigate, Outlet } from "react-router-dom";

import { Box } from "@mui/system";

const MainLayout = () => {
  return (
    <Box sx={{ maxWidth: "375px", margin: "0 auto" }}>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
