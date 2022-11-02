import { Button, Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  deleteUserApi,
  GetAllUserModel,
  GetUserByIdApi,
} from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { config } from "process";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  BookRoomModel,
  deleteBookRoomApi,
  getBookRoomApi,
  GetBookRoomByIdApi,
} from "../../redux/reducers/bookRoomReducer";
import { EditOutlined, DeleteOutlined,FormOutlined } from "@ant-design/icons";

type Props = {};

const columns: ColumnsType<BookRoomModel> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 100
  },
  {
    title: "Room Code",
    dataIndex: "maPhong",
    key: "maPhong",
    width: 150
  },
  {
    title: "Check In",
    key: "ngayDen",
    dataIndex: "ngayDen",
    width: 250
  },
  {
    title: "Check Out",
    dataIndex: "ngayDi",
    key: "ngayDi",
    width: 250
  },
  {
    title: "Guest",
    key: "soLuongKhach",
    dataIndex: "soLuongKhach",
  },
  {
    title: "Guest Code",
    key: "maNguoiDung",
    dataIndex: "maNguoiDung",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

export default function BookRoomManagementRender({}: Props) {
  const { arrBookRoom , bookRoomEdit} = useSelector(
    (state: RootState) => state.bookRoomReducer
  );
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    //call api = action thunk
    dispatch(getBookRoomApi());
  }, []);

  const bookRoomManagementTableRender = () => {
    return arrBookRoom.map((item: BookRoomModel, id: number) => {
      return {
        key: id,
        id: `${item.id}`,
        maPhong: `${item.maPhong}`,
        ngayDen: `${item.ngayDen}`,
        ngayDi: `${item.ngayDi}`,
        soLuongKhach: `${item.soLuongKhach}`,
        maNguoiDung: `${item.maNguoiDung}`,
        action: (
          <>
            <>
              <button className="btn me-2 " onClick={() => {
                  dispatch(GetBookRoomByIdApi(item.id));

                  navigate(`/admin/editBookRoom/${item.id}`, bookRoomEdit);
              }}>
                <FormOutlined />
              </button>
            </>
            <button
              className="btn"
              onClick={() => {
                dispatch(deleteBookRoomApi(item.id));
              }}
            >
              <DeleteOutlined />
            </button>
          </>
        ),
      };
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={bookRoomManagementTableRender()}
        pagination={{ pageSize: 10, pageSizeOptions: ["10", "20", "30"] }}
        scroll={{ y: 350 }} 
      />
    </>
  );
}
