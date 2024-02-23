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
import { API_PREFIX } from "../config/constants";

export const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isError, setIsError] = useState(false);

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_PREFIX}users`);
      if (res.status !== 200) {
        throw new Error("API rate limit exceeded");
      }
      const data = await res.json();
      setUserList(data);
    } catch (ex) {
      console.error("Exception", ex);
      setIsError(true);
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
          {isError === true ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Something went wrong
            </Alert>
          ) : userList.length === 0 ? (
            <Typography variant="h6">Loading ...</Typography>
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
