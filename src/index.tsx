import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import Index from "./pages/Index/Index";
// scss
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "./assets/scss/styles.scss"
import DanhSachPhong from "./pages/DanhSachPhong/DanhSachPhong";
import ChiTietPhong from "./pages/ChiTietPhong/ChiTietPhong";






const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeTemplate/>}>
        <Route index element={<Index />}></Route>
        <Route path="/DanhSachPhong" element={<DanhSachPhong />}></Route>
        <Route path="/ChiTietPhong">
        <Route path=":id"  element={<ChiTietPhong />}></Route>
        </Route>

      </Route>
    </Routes>
  </BrowserRouter>

  </Provider>
);

