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
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const UserList = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((data) => setUserList(data))
      .catch((err) => console.error("err", err));
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
          {userList.map((user) => (
            <ListItem disablePadding sx={{ margin: "16px 0" }} key={user.id}>
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
        </List>
      </Box>
    </Box>
  );
};
