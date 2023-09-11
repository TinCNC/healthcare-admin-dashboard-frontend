import "@refinedev/mui";

export interface CustomTheme {
  customVariable: {
    custom: string;
  };
}

declare module "@mui/material/styles" {
  interface Theme extends import("@mui/material/styles").Theme, CustomTheme {}
  interface ThemeOptions
    extends import("@mui/material/styles").ThemeOptions,
      CustomTheme {}
}
