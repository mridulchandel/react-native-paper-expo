import React from "react";

const ThemeContext = React.createContext({
  themeColor: "light",
  toggleTheme: () => {},
});
export default ThemeContext;
