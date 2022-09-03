import React, { useContext } from "react";
import { signInWithGoogle, logout } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
//@ts-ignore
import dig from "object-dig";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const currentUser = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PWA TODO APP
          </Typography>
          <header>
            {dig(currentUser, "currentUser", "uid") ? (
              <Button color="inherit" onClick={logout}>
                ログアウト
              </Button>
            ) : (
              <Button color="inherit" onClick={signInWithGoogle}>
                ログイン
              </Button>
            )}
          </header>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
