import React from "react";
import ReactDOM from "react-dom/client";
import {  Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";

import 'antd/dist/antd.css';
import './assets/scss/style.scss';
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


export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
    <Routes>
      <Route path="" element={<HomeTemplate/>}>
        <Route index element={<Home/>}></Route>
        <Route path="home" element={<Home/>}></Route>
      </Route>
      <Route path="register" element={<Register/>}></Route>
      <Route path="login" element={<Login/>}></Route>  
      <Route path="admin" element={<DashboardTemplate/>}>
        {/* <Route path="/admin/userManagement" element={<AddAdminRender/>}></Route> */}
        <Route path="userManagement" element={<UserManagement/>}>
        </Route>
        <Route path="locationInformation" element={<LocationInformation/>}>
        </Route>
        <Route path="roomInformation" element={<RoomInformation />}>
        </Route>
        <Route path="edit" element={<EditUser/>}></Route>
      </Route>
    </Routes>
  </HistoryRouter>
  </Provider>
);
