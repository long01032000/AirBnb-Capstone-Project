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
  deleteLocationApi,
  GetAllLocationModel,
  getLocationApi,
  getLocationByIdApi,
} from "../../redux/reducers/locationReducer";
import { EditOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import UploadImageLocation from "../UploadImageLocation/UploadImageLocation";

type Props = {
  
  
};



const columns: ColumnsType<GetAllLocationModel> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 100
  },
  {
    title: "Location",
    dataIndex: "tenViTri",
    key: "tenViTri",
    width: 230
  },
  {
    title: "Image",
    key: "hinhAnh",
    dataIndex: "hinhAnh",
    width: 230
  },
  {
    title: "Province",
    dataIndex: "tinhThanh",
    key: "tinhThanh",
    width: 230
  },
  {
    title: "Nation",
    key: "quocGia",
    dataIndex: "quocGia",
    width: 230
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    
  },
];

export default function LocationInformationTableRender({}: Props) {
  
  const { arrLocation, locationEdit } = useSelector(
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
           <UploadImageLocation id={item.id} hinhAnh={item.hinhAnh} />
          </>
        ),
        tinhThanh: `${item.tinhThanh}`,
        quocGia: `${item.quocGia}`,
        action: (
          <>
            <>
              <button
                className="btn me-2"
                onClick={() => {
                  dispatch(getLocationByIdApi(item.id));

                  navigate(`/admin/editLocation/${item.id}`, locationEdit);
                }}
              >
                <FormOutlined />
              </button>
            </>
            <button
              className="btn"
              onClick={() => {
                dispatch(deleteLocationApi(item));
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
        dataSource={locationRender()}
        pagination={{ pageSize: 10, pageSizeOptions: ["10", "20", "30"] }}
        scroll={{ y: 350 }} 
      />
    </>
  );
}
