import { Button, Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  deleteUserApi,
  GetAllUserModel,
  getUserApi,
  GetUserByIdApi,
} from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { config } from "process";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

type Props = {};

const columns: ColumnsType<GetAllUserModel> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    key: "phone",
    dataIndex: "phone",
  },
  {
    title: "Gender",
    key: "gender",
    dataIndex: "gender",
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

export default function UserManagementTableRender({}: Props) {
  const { arrUser,userEdit } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    //call api = action thunk
    dispatch(getUserApi());
  }, []);

  const userRender = () => {
    return arrUser.map((item: GetAllUserModel, id: number) => {
      return {
        key: id,
        id: `${item.id}`,
        name: `${item.name}`,
        email: `${item.email}`,
        phone: `${item.phone}`,
        gender: `${item.gender}`,
        role: `${item.role}`,
        action: (
          <>
            <button className="btn me-2 btn-warning text-white">
              View details
            </button>
            <>
              <button
                className="btn me-2 btn-primary text-white"
                onClick={() => {
                  dispatch(GetUserByIdApi(item));
                  console.log(item)
                  navigate("/admin/edit",userEdit);
                }}
              >
                Edit
              </button>
            </>
            <button
              className="btn btn-danger text-white"
              onClick={() => {
                dispatch(deleteUserApi(item));
              }}
            >
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
        dataSource={userRender()}
        pagination={{ pageSize: 5, pageSizeOptions: ["10", "20", "30"] }}
      />
    </>
  );
}
