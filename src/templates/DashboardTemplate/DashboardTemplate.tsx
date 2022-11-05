/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Dropdown,
  Input,
  Menu,
  Space,
  Layout,
  Button,
  Modal,
  MenuProps,
} from "antd";
import { Avatar, Image } from "antd";
import { getStoreJson, USER_LOGIN } from "../../util/setting";

type Props = {};

export default function DashboardTemplate({}: Props) {
  const userLogin = getStoreJson(USER_LOGIN);
  const admin = userLogin?.user.role;

  const token = userLogin?.token;

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider } = Layout;
  const [key, setKey] = useState("userManagement");

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              onClick={() => {
                alert("Logout Success");
                navigate("/");
                localStorage.clear();
                window.location.reload();
              }}
            >
              Log out
            </div>
          ),
          key: "0",
        },
      ]}
    />
  );

  if (admin !== "ADMIN") {
    alert("This page only grants access from admin");
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <section className="dashboard">
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            {collapsed ? (
              <div className="logo text-white text-center">
                <i className="fa-brands fa-airbnb"></i>
              </div>
            ) : (
              <div className="logo text-white text-center">Dashboard</div>
            )}
            <Menu
              theme="dark"
              mode="inline"
              items={[
                {
                  key: "userManagement",
                  icon: <UserOutlined />,
                  label: "User Management",
                },
                {
                  key: "locationInformation",
                  icon: <EnvironmentOutlined />,
                  label: "Location Information Management",
                },
                {
                  key: "roomInformation",
                  icon: <CalendarOutlined />,
                  label: "Room Information Management",
                },
                {
                  key: "bookRoomManagement",
                  icon: <CarryOutOutlined />,
                  label: "Book Room Management",
                },
              ]}
              onSelect={(e: any) => {
                setKey(e.key);
                navigate(e.key);
              }}
            />
          </Sider>
          <Layout className="site-layout" style={{ height: "100vh" }}>
            <Header
              className="site-layout-background"
              style={{
                padding: "0 20px 0 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={() => {}}>
                  <Space
                    className="text-dark"
                    style={{ fontSize: 15, fontWeight: 600 }}
                  >
                    {userLogin?.user.name}
                    <Avatar
                      src={
                        <Image
                          src="https://joeschmoe.io/api/v1/random"
                          style={{ width: 32 }}
                        />
                      }
                    />
                    <CaretDownOutlined className="text-dark" />
                  </Space>
                </a>
              </Dropdown>
            </Header>
            <Outlet />
          </Layout>
        </Layout>
      </section>
    </>
  );
}
