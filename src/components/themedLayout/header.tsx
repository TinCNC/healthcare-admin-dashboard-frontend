import React, { useContext } from "react";
import {
  useGetIdentity,
  useGetLocale,
  useSetLocale,
  useTranslate,
  useLogout,
  useActiveAuthProvider,
  useNavigation,
} from "@refinedev/core";
import { RefineThemedLayoutHeaderProps } from "@refinedev/mui";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
  Menu as MenuIcon,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  Stack,
  Toolbar,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Button,
  Badge,
} from "@mui/material";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { Wallet } from "components/payment-solana";

import i18n from "i18n";

import { ColorModeContext } from "../../contexts/color-mode";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const ThemedHeader: React.FC<RefineThemedLayoutHeaderProps> = ({
  isSiderOpen,
  onToggleSiderClick,
  toggleSiderIcon: toggleSiderIconFromProps,
}) => {
  const t = useTranslate();
  const { push } = useNavigation();
  const authProvider = useActiveAuthProvider();
  const { mode, setMode } = useContext(ColorModeContext);

  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const { data: user } = useGetIdentity<IUser>();

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const hasSidebarToggle = Boolean(onToggleSiderClick);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction="row" width="100%" alignItems="center">
          {hasSidebarToggle && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => onToggleSiderClick?.()}
              edge="start"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                ...(isSiderOpen && { display: "none" }),
              }}
            >
              {toggleSiderIconFromProps?.(Boolean(isSiderOpen)) ?? <MenuIcon />}
            </IconButton>
          )}

          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            gap="16px"
          >
            <Wallet />
            <IconButton
              onClick={() => {
                push("/orders");
              }}
            >
              <Badge badgeContent={4} color="success">
                <ShoppingCart sx={{ color: "white" }} />
              </Badge>
            </IconButton>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                disableUnderline
                defaultValue={currentLocale}
                inputProps={{ "aria-label": "Without label" }}
                variant="standard"
                sx={{
                  color: "inherit",
                  "& .MuiSvgIcon-root": {
                    color: "inherit",
                  },
                }}
              >
                {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                  // @ts-ignore
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

            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {(user?.avatar || user?.name) && (
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      variant="text"
                      {...bindTrigger(popupState)}
                      sx={{
                        textTransform: "none",
                        color: "white",
                        // color: "primary.contrastText",
                      }}
                    >
                      <Stack
                        direction="row"
                        gap="16px"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {user?.name && (
                          <Typography variant="subtitle2">
                            {user?.name}
                          </Typography>
                        )}
                        <Avatar src={user?.avatar} alt={user?.name} />
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
            {/* 
            {(user?.avatar || user?.name) && (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                {user?.name && (
                  <Typography variant="subtitle2">{user?.name}</Typography>
                )}
                <Avatar src={user?.avatar} alt={user?.name} />
              </Stack>
            )} */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
