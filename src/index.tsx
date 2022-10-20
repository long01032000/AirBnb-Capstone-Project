import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="" element={<HomeTemplate/>}>
        
      </Route>
    </Routes>
  </BrowserRouter>

  </Provider>
);
