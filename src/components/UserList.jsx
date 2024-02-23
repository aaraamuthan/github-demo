import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  AppBar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const UserList = () => {
  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("https://api.github.com/users");
      if (res.status !== 200) {
        throw new Error("API rate limit exceeded");
      }
      setUserList(res.json());
    } catch (ex) {
      console.error("Exception", ex);
      setUserList([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <AppBar>
        <Typography variant="h6">Github Demo</Typography>
      </AppBar>
      <Box mt={7} sx={{ width: "300px" }}>
        <List>
          {userList.length === 0 ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Something went wrong
            </Alert>
          ) : (
            <>
              {userList.map((user) => (
                <ListItem
                  disablePadding
                  sx={{ margin: "16px 0" }}
                  key={user.id}
                >
                  <ListItemButton component={RouterLink} to={user.login}>
                    <ListItemIcon>
                      <ListItemAvatar>
                        <Avatar alt={user.login} src={user.avatar_url} />
                      </ListItemAvatar>
                    </ListItemIcon>
                    <ListItemText primary={user.login} />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Box>
    </Box>
  );
};
