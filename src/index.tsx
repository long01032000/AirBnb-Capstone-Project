import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";

import "antd/dist/antd.css";
import "./assets/scss/style.scss";
import Register from "./pages/Register/Register";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import AddAdminRender from "./components/AddAdminRender/AddAdminRender";
import UserManagement from "./pages/UserManagement/UserManagement";
import DashboardTemplate from "./templates/DashboardTemplate/DashboardTemplate";
import EditUser from "./components/EditUser/EditUser";
import LocationInformation from "./pages/LocationInformation/LocationInformation";
import RoomInformation from "./pages/RoomInformation/RoomInformation";
import BookRoomManagement from "./pages/BookRoomManagement/BookRoomManagement";
import EditLocation from "./components/EditLocation/EditLocation";
import UploadImageLocation from "./components/UploadImageLocation/UploadImageLocation";
import EditRoomInformation from "./components/EditRoomInformation/EditRoomInformation";
import EditBookRoom from "./components/EditBookRoom/EditBookRoom";
import Index from "./pages/Index/Index";
import DanhSachPhong from "./pages/DanhSachPhong/DanhSachPhong";
import ChiTietPhong from "./pages/ChiTietPhong/ChiTietPhong";

export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Index />}></Route>
          <Route path="/DanhSachPhong">
          <Route path=":id" element={<DanhSachPhong />}/>
          </Route>
          <Route path="/ChiTietPhong">
            <Route path=":id" element={<ChiTietPhong />}></Route>
          </Route>
          <Route path="*" element={<Navigate to="" />}></Route>
        </Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="admin" element={<DashboardTemplate />}>
          <Route path="userManagement" element={<UserManagement />}></Route>
          <Route
            path="locationInformation"
            element={<LocationInformation />}
          ></Route>
          <Route path="roomInformation" element={<RoomInformation />}></Route>
          <Route
            path="bookRoomManagement"
            element={<BookRoomManagement />}
          ></Route>
          <Route path="editUser/:id" element={<EditUser />}></Route>
          <Route path="editLocation/:id" element={<EditLocation />}></Route>
          <Route path="editBookRoom/:id" element={<EditBookRoom />}></Route>
          <Route
            path="editRoomInformation/:id"
            element={<EditRoomInformation />}
          ></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
