import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Import QueryClientProvider
import App from "./App";
import "./index.css";

const queryClient = new QueryClient(); // ✅ Create a QueryClient instance

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* ✅ Wrap with QueryClientProvider */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
