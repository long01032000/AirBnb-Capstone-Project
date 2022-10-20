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
  GetAllLocationModel,
  getLocationApi,
} from "../../redux/reducers/locationReducer";
import { EditOutlined } from "@ant-design/icons";

type Props = {};

const columns: ColumnsType<GetAllLocationModel> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Location",
    dataIndex: "tenViTri",
    key: "tenViTri",
  },
  {
    title: "Image",
    key: "hinhAnh",
    dataIndex: "hinhAnh",
  },
  {
    title: "Province",
    dataIndex: "tinhThanh",
    key: "tinhThanh",
  },
  {
    title: "Nation",
    key: "quocGia",
    dataIndex: "quocGia",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

export default function LocationInformationTableRender({}: Props) {
  const { arrLocation } = useSelector(
    (state: RootState) => state.locationReducer
  );
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    //call api = action thunk
    dispatch(getLocationApi());
  }, []);

  const locationRender = () => {
    return arrLocation.map((item: GetAllLocationModel, id: number) => {
      return {
        key: id,
        id: `${item.id}`,
        tenViTri: `${item.tenViTri}`,
        hinhAnh: (
          <>
            <img width={65} height={58} src={item.hinhAnh} alt="" />
            <button className="btn ms-2"><EditOutlined size={50}/></button>
          </>
        ),
        tinhThanh: `${item.tinhThanh}`,
        quocGia: `${item.quocGia}`,

        action: (
          <>
            <button className="btn me-2 btn-warning text-white">
              View details
            </button>
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
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={locationRender()}
        pagination={{ pageSize: 4, pageSizeOptions: ["10", "20", "30"] }}
      />
    </>
  );
}
