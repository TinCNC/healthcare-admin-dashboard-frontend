import {
  Avatar,
  FormControl,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Typography,
  Chip,
  Box,
} from "@mui/material";

import { Folder } from "@mui/icons-material";

import { useTranslate } from "@refinedev/core";
import React from "react";
import { StyledSelect } from "@/components/styled-components";

export const ActivityFeedCard: React.FC = () => {
  const t = useTranslate();

  const mockActivity = [
    {
      _id: "343hsdghlweghlhselr",
      message: "You have given the portal to somewhere",
      status: "Applying",
      user_ref: {
        info: {
          avatar: null,
        },
      },
      created_at: "2023-09-14T13:28:32.277Z",
    },
    {
      _id: "j43epfghlwgegehselr",
      message: "Naming convention 234",
      status: "Completed",
      user_ref: {
        info: {
          avatar: null,
        },
      },
      created_at: "2023-09-16T13:28:32.277Z",
    },
  ];

  return (
    <Paper sx={{ padding: "1rem 2rem" }}>
      <Stack gap={1} direction="row" justifyContent="space-between">
        <Stack gap={1} direction="row" alignSelf="end">
          <Typography fontWeight="bold" variant="body1">
            {t("dashboard.activity_feed.title")}
          </Typography>
        </Stack>
        <Stack gap={1} width="106px" alignSelf="center">
          <FormControl fullWidth size="small">
            <StyledSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="all_activity"
              // value={age}
              // label="Age"
              // onChange={handleChange}
            >
              <MenuItem value="all_activity">
                {t("dashboard.activity_feed.all_activity")}
              </MenuItem>
              <MenuItem value="applying">
                {t("dashboard.activity_feed.applying")}
              </MenuItem>
              <MenuItem value="completed">
                {t("dashboard.activity_feed.completed")}
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Stack>
      </Stack>
      <Box height="202px" sx={{ overflowY: "auto" }}>
        <List>
          {mockActivity !== undefined &&
            mockActivity !== null &&
            mockActivity.length > 0 &&
            mockActivity.map((item) => {
              return (
                <ListItem
                  sx={{
                    paddingLeft: "0px",
                    //   ".MuiListItem-secondaryAction": {
                    //     right: "0px",
                    //     backgroundColor: "black",
                    //   },
                  }}
                  secondaryAction={
                    <Chip
                      sx={{
                        background:
                          item.status === "Applying"
                            ? "rgba(55, 125, 255, 0.20)"
                            : "rgba(56, 203, 137, 0.20)",
                        color:
                          item.status === "Applying"
                            ? "primary.dark"
                            : "success.main",
                      }}
                      label={item.status}
                    />
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Folder />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.message}
                    secondary={item.created_at}
                  />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </Paper>
  );
};
