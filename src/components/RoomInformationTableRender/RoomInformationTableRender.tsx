import { Button, Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { config } from "process";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { getLocationApi } from "../../redux/reducers/locationReducer";
import {
  GetAllRoomInformationModel,
  getRoomInformationApi,
} from "../../redux/reducers/roomReducer";
import { EditOutlined } from "@ant-design/icons";

type Props = {};

const columns: ColumnsType<GetAllRoomInformationModel> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Room Name",
    dataIndex: "tenPhong",
    key: "tenPhong",
  },
  {
    title: "Image",
    key: "hinhAnh",
    dataIndex: "hinhAnh",
  },
  {
    title: "Guest",
    key: "khach",
    dataIndex: "khach",
  },
  {
    title: "Bedroom",
    key: "phongNgu",
    dataIndex: "phongNgu",
  },
  {
    title: "Bed",
    dataIndex: "giuong",
    key: "giuong",
  },
  {
    title: "Price",
    key: "giaTien",
    dataIndex: "giaTien",
  },

  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

export default function RoomInformationTableRender({}: Props) {
  const { arrRoomInformation } = useSelector(
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
          tenPhong: (<div style={{width: 200}}>
          {item.tenPhong}
          </div>),
          hinhAnh: (
            <>
              <img width={150} height={58} src={item.hinhAnh} alt="" />
             <button className="btn ms-2"><EditOutlined size={50}/></button>
            </>
          ),
          khach: `${item.khach}`,
          phongNgu: `${item.phongNgu}`,
          giuong: `${item.giuong}`,
          giaTien: `${item.giaTien}$`,
          action: (
            <>
              <>
                <button
                  className="btn me-2 btn-primary text-white"
                  onClick={() => {}}
                >
                  Edit
                </button>
              </>
              <button className="btn btn-danger text-white" onClick={() => {}}>
                Delete
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
        pagination={{ pageSize: 4, pageSizeOptions: ["10", "20", "30"] }}
      />
    </>
  );
}
