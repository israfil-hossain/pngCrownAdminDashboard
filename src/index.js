import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import MenuContextProvider from "./context/MenuContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import {theme} from "./constants/theme";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <ThemeProvider  theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <MenuContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          closeOnClick
          theme="light"
        />
         <QueryClientProvider client={queryClient}>
         <App />
         </QueryClientProvider>
       
      </MenuContextProvider>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
