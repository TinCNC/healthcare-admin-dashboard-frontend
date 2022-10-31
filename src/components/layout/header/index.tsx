import React, { useContext } from "react";
import {
  useGetIdentity,
  useGetLocale,
  useSetLocale,
  useLogout,
  useTranslate,
} from "@pankod/refine-core";
import {
  AppBar,
  IconButton,
  Avatar,
  Stack,
  Menu,
  Button,
  FormControl,
  MenuItem,
  ListItemIcon,
  Select,
  Toolbar,
  Typography,
  Divider,
} from "@pankod/refine-mui";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
  PersonAdd,
  Settings,
  Person,
} from "@mui/icons-material";

import { ColorModeContext } from "contexts";
import i18n from "i18n";

export const Header: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { mutate: mutateLogout } = useLogout();

  const t = useTranslate();

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const { data: user } = useGetIdentity();
  const showUserInfo = user && (user.name || user.avatar);

  return (
    <AppBar color="default" position="sticky" elevation={1}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              disableUnderline
              defaultValue={currentLocale}
              inputProps={{ "aria-label": "Without label" }}
              variant="standard"
            >
              {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                <MenuItem
                  selected={currentLocale === lang}
                  key={lang}
                  defaultValue={lang}
                  onClick={() => {
                    changeLanguage(lang);
                  }}
                  value={lang}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      sx={{
                        width: "16px",
                        height: "16px",
                        marginRight: "5px",
                      }}
                      src={`/images/flags/${lang}.svg`}
                    />
                    {lang === "en" ? "English" : "German"}
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {showUserInfo && (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    variant="text"
                    {...bindTrigger(popupState)}
                    sx={{ textTransform: "none" }}
                  >
                    <Stack direction="row" gap="16px" alignItems="center">
                      {user.avatar && (
                        <Avatar src={user?.avatar} alt={user?.name} />
                      )}
                      {user.name && (
                        <Typography variant="subtitle2">
                          {user?.name}
                        </Typography>
                      )}
                    </Stack>
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    {/* <MenuItem onClick={popupState.close}>Profile</MenuItem> */}
                    <MenuItem onClick={popupState.close}>
                      <Person /> {t("buttons.my_account", "My account")}
                    </MenuItem>
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        mutateLogout();
                        popupState.close();
                      }}
                    >
                      <Logout /> {t("buttons.logout", "Logout")}
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
