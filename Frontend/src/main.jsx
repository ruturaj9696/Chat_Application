import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
  </StrictMode>
);
