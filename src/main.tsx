import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes/routes.tsx";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFC000",
        },
        components: {
          Button: {
            colorPrimary: "#FFC000",
            fontWeight: "bold",
          },
          Checkbox: {
            colorPrimary: "#FFC000",
          },
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
