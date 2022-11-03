import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/configStore";
import { ProductModel } from "../redux/reducers/productReducer";
type Props = {};

export default function Header({}: Props) {
  const { arrProductViTri } = useSelector(
    (state: RootState) => state.productReducer
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();










  return (
    <section id="header">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="col-4 left">
            <div className="logo">
              <NavLink to="/"><img src={require("../assets/img/logo.png")} alt="..." /></NavLink>
            </div>
          </div>
          <div className="col-4 middle">
            <div className="search">
              <div className="search1">
                <p>Địa điểm</p>
                <select name="" id="">
                  {arrProductViTri.map((prod:ProductModel, index:number) => {
                    return <option  key={index} value={prod.tinhThanh}>{prod.tinhThanh}</option>
                  })}
                </select>
              </div>
              <div className="search2">
                <p>Nhận Phòng</p>
                <p>Nhận Phòng</p>
              </div>
              <div className="search3">
                <p>Trả phòng</p>
                <p>Trả phòng</p>
              </div>
              <div className="search4">
                <p>Khách</p>
                <p>Khách</p>
              </div>
              <div className="button">
                <button  className="btn btn-danger" onClick={() => {
                  navigate("/DanhSachPhong")
                }}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 right">
            <p>Đón tiếp khách</p>
            <div className="sign-up-in">
              <NavLink to="#" className="me-2">
                Đăng nhập
              </NavLink>
              <NavLink to="#">Đăng ký</NavLink>
            </div>
            <div className="language">
              <i className="fa-solid fa-globe"></i>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="bars">
                  <i className="fa-solid fa-bars"></i>
                </span>
                <span className="user">
                  <i className="fa-solid fa-user"></i>
                </span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Đăng nhập
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Đăng ký
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
