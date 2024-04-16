import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DataContextProvider } from "./context/DataContext.tsx";
import { store } from "./redux/store.ts";
import { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <DataContextProvider>
              <App />
            </DataContextProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
