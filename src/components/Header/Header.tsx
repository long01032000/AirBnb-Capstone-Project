import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductModel } from "../../redux/reducers/productReducer";
import { AppDispatch, RootState } from "../../redux/configStore";
import { Avatar, Button, DatePicker, Form, Image, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getRoomInformationByLocationCodeApi } from "../../redux/reducers/roomReducer";
import { getStoreJson, USER_LOGIN } from "../../util/setting";
import { UserOutlined, CheckOutlined } from "@ant-design/icons";
import { GetUserRoleUserByIdApi } from "../../redux/reducers/userRoleUserReducer";
type Props = {};

export default function Header({}: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const userLogin = getStoreJson(USER_LOGIN);
  const { imageUser } = useSelector(
    (state: RootState) => state.userRoleUserReducer
  );
  useEffect(() => {
    dispatch(GetUserRoleUserByIdApi(userLogin.user.id));
  }, []);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (value: any) => {
    console.log("Received values of form: ", value);
    dispatch(getRoomInformationByLocationCodeApi(value));
    navigate(`/DanhSachPhong/${value.id}`);
  };

  return (
    <section id="header">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="col-4 left">
            <div className="logo">
              <NavLink to="/">
                <img
                  src={require("../../assets/img/logo.png")}
                  alt="..."
                  width={70}
                />
              </NavLink>
            </div>
          </div>
          <div className="col-4 middle">
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                id: "1",
              }}
              scrollToFirstError
            >
              <div className="search">
                <div className="search1">
                  <p>Địa điểm</p>
                  <Form.Item name="id" style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="Hồ Chí Minh"
                      style={{ width: "104px" }}
                      size="small"
                    >
                      <Option value="1">Hồ Chí Minh</Option>
                      <Option value="2">Cần Thơ</Option>
                      <Option value="3">Hà Nội</Option>
                      <Option value="4">Nha Trang</Option>
                      <Option value="5">Phú Quốc</Option>
                      <Option value="6">Đà Nẵng</Option>
                      <Option value="7">Đà Lạt</Option>
                    </Select>
                  </Form.Item>
                  {/* <select name="" id="">
                  {/* {arrProductViTri.map((prod: ProductModel, index: number) => {
                    return (
                      <option key={index} value={prod.tinhThanh}>
                        {prod.tinhThanh}
                      </option>
                    );
                  })} */}
                </div>
                <div className="search2">
                  <p>Nhận Phòng</p>
                  <span>Nhận Phòng</span>
                </div>
                <div className="search3">
                  <p>Trả phòng</p>
                  <span>Trả phòng</span>
                </div>
                <div className="search4">
                  <p>Khách</p>
                  <span>Khách</span>
                </div>
                <div className="button">
                  <Form.Item>
                    <Button
                      className="btn btn-danger"
                      htmlType="submit"
                      style={{ backgroundColor: "#ff385c", color: "white" }}
                    >
                      <SearchOutlined size={30} />
                    </Button>
                  </Form.Item>
                  {/* <button
                  className="btn btn-danger"
                  onClick={() => {
                    navigate("/DanhSachPhong");
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button> */}
                </div>
              </div>
            </Form>
          </div>
          <div className="col-4 right">
            <p>Đón tiếp khách</p>
            {/* <div className="sign-up-in">
              <NavLink to="login" className="me-2">
                Đăng nhập
              </NavLink>
              <NavLink to="register">Đăng ký</NavLink>
            </div> */}
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
                {imageUser ? (
                  <Avatar size={20} src={imageUser.avatar} />
                ) : (
                  <Avatar size={20} icon={<UserOutlined />} />
                )}
              </button>
              <ul className="dropdown-menu">
                {userLogin ? (
                  <>
                    <li>
                      <NavLink className="dropdown-item" to="Thongtinchitiet">
                        Thông Tin Chi Tiết
                      </NavLink>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          alert("Logout Success");
                          navigate("/");
                          localStorage.clear();
                          window.location.reload();
                        }}
                      >
                        Đăng Xuất
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink className="dropdown-item" to="login">
                        Đăng nhập
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="register">
                        Đăng ký
                      </NavLink>
                    </li>
                  </>
                )}
                {/* <li>
                  <NavLink className="dropdown-item" to="login">
                    Đăng nhập
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="register">
                    Đăng ký
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
