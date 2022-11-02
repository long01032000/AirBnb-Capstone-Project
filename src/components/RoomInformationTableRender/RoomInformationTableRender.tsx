import { Button, Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { config } from "process";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { getLocationApi } from "../../redux/reducers/locationReducer";
import {
  deleteRoomInformationApi,
  GetAllRoomInformationModel,
  getRoomInformationApi,
  getRoomInformationByIdApi,
} from "../../redux/reducers/roomReducer";
import { EditOutlined, DeleteOutlined,FormOutlined } from "@ant-design/icons";
import UploadRoomImage from "../UploadRoomImage/UploadRoomImage";

type Props = {};

const columns: ColumnsType<GetAllRoomInformationModel> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 100
  },
  {
    title: "Room Name",
    dataIndex: "tenPhong",
    key: "tenPhong",
    width: 230
  },
  {
    title: "Image",
    key: "hinhAnh",
    dataIndex: "hinhAnh",
    width: 250
  },
  {
    title: "Guest",
    key: "khach",
    dataIndex: "khach",
    width: 130
  },
  {
    title: "Bedroom",
    key: "phongNgu",
    dataIndex: "phongNgu",
    width: 130
  },
  {
    title: "Bed",
    dataIndex: "giuong",
    key: "giuong",
    width: 130
  },
  {
    title: "Price",
    key: "giaTien",
    dataIndex: "giaTien",
    width: 130
  },

  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

export default function RoomInformationTableRender({}: Props) {
  const { arrRoomInformation, roomInformationEdit } = useSelector(
    (state: RootState) => state.roomReducer
  );
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    //call api = action thunk
    dispatch(getRoomInformationApi());
  }, []);

  const roomInformationRender = () => {
    return arrRoomInformation.map(
      (item: GetAllRoomInformationModel, id: number) => {
        return {
          key: id,
          id: `${item.id}`,
          tenPhong: <div style={{ width: 200 }}>{item.tenPhong}</div>,
          hinhAnh: (
            <>
              <img width={140} height={80} src={item.hinhAnh} alt="" />
             <UploadRoomImage id={item.id} hinhAnh={item.hinhAnh}/>
            </>
          ),
          khach: `${item.khach}`,
          phongNgu: `${item.phongNgu}`,
          giuong: `${item.giuong}`,
          giaTien: `${item.giaTien}$`,
          action: (
            <>
              <>
                <button className="btn me-2" onClick={() => {
                   dispatch(getRoomInformationByIdApi(item.id));

                   navigate(`/admin/editRoomInformation/${item.id}`, roomInformationEdit);
                }}>
                  <FormOutlined/>
                </button>
              </>
              <button className="btn" onClick={() => {
                 dispatch(deleteRoomInformationApi(item));
              }}>
                <DeleteOutlined />
              </button>
            </>
          ),
        };
      }
    );
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={roomInformationRender()}
        pagination={{ pageSize: 10, pageSizeOptions: ["10", "20", "30"] }}
        scroll={{ y: 350 }} 
      />
    </>
  );
}
