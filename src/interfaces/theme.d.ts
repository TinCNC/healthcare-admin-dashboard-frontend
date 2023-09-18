import "@refinedev/mui";

export interface CustomTheme {
  // customVariable: {
  //   custom: string;
  // };
  // palette: {
  //   mode: "light" | "dark";
  //   primary: {
  //     main: "#67b7f7";
  //     light: "#85c5f8";
  //     dark: "#4880ac";
  //   };
  // };
}

declare module "@mui/material/styles" {
  interface Theme extends import("@mui/material/styles").Theme, CustomTheme {}
  interface ThemeOptions
    extends import("@mui/material/styles").ThemeOptions,
      CustomTheme {}
}
