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
import LocationInformationTableRender from "../../components/LocationInformationTableRender/LocationInformationTableRender";
import AddLocationRender from "../../components/AddLocationRender/AddLocationRender";
import BookRoomManagementRender from "../../components/BookRoomManagementRender/BookRoomManagementRender";
import AddBookRoomRender from "../../components/AddBookRoomRender/AddBookRoomRender";
import { searchBookRoomApi } from "../../redux/reducers/bookRoomReducer";

type Props = {};

export default function BookRoomManagement({}: Props) {
  const { Search } = Input;
  const { Content } = Layout;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const onSearch = (value: string) => {
     const values:  number = +value
     console.log(values)
    dispatch(searchBookRoomApi(values))
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
    <section className="BookRoomManagement">
      <Content
        className="site-layout-background"
        style={{
          margin: "16px 16px",
          padding: 16,
        }}
      >
        <div className="add-and-search">
          <div className="title d-flex">
            <h3>Add New Book Room</h3>
            <Button type="primary" className="ms-2" onClick={showModal}>
              <PlusOutlined style={{ fontSize: 20 }} />
            </Button>
            <Modal
              title="Add new book room"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={600}
              style={{ textAlign: "center" }}
            >
              <AddBookRoomRender/>
            </Modal>
          </div>
          <Search
            placeholder="Enter id"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <BookRoomManagementRender/>
      </Content>
    </section>
  );
}
