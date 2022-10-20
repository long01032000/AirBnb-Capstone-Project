import React, { useRef, useState } from "react";
import UserManagementTableRender from "../../components/UserManagementTableRender/UserManagementTableRender";
import { PlusOutlined } from "@ant-design/icons";
import {
  Input,
  Menu,
  Space,
  Layout,
  Button,
  Modal,
  MenuProps,
} from "antd";
import { NavLink } from "react-router-dom";
import { Avatar, Image } from "antd";
import AddAdminRender from "../../components/AddAdminRender/AddAdminRender";
import { searchUserApi } from "../../redux/reducers/userReducer";
import { AppDispatch } from "../../redux/configStore";
import { useDispatch } from "react-redux";

type Props = {};

export default function UserManagement({}: Props) {
  const { Search } = Input;
  const { Content } = Layout;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const onSearch = (value: string) => {
    dispatch(searchUserApi(value));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="UserManagement">
      <Content
        className="site-layout-background"
        style={{
          margin: "16px 16px",
          padding: 16,
        }}
      >
        <div className="add-and-search">
          <div className="title d-flex">
            <h3>Add Administrator</h3>
            <Button type="primary" className="ms-2" onClick={showModal}>
              <PlusOutlined style={{ fontSize: 20 }} />
            </Button>
            <Modal
              title="Add New Administrator"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={900}
              style={{ textAlign: "center" }}
            >
              <AddAdminRender />
            </Modal>
          </div>
          <Search
            placeholder="Enter the user's name or email"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <UserManagementTableRender />
      </Content>
    </section>
  );
}
