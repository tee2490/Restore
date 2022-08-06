import {
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
   } from "@mui/material";
  import { useState } from "react";
  import Catalog from "../../features/catalog/Catalog";
  import Header from "./Header";
  
  export default function App() {
    const [mode, setMode] = useState(false);
    const modeDisplay = mode ? "dark" : "light";
  
    const handleMode = () => setMode(!mode);
  
    const theme = createTheme({
      palette: {
        mode: modeDisplay,
        background: {
          default: modeDisplay === "light" ? "#f0f5f7" : "#384348",
        },
      },
    });
  
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header handleMode={handleMode} />
          <Container>
            <Catalog />
          </Container>
        </ThemeProvider>
      </>
    );
  }