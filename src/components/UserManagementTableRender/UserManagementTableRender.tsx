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
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { FormOutlined ,DeleteOutlined,ManOutlined,WomanOutlined} from "@ant-design/icons";

type Props = {};

const columns: ColumnsType<GetAllUserModel> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 100
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 230
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 230
  },
  {
    title: "Birthday",
    key: "birthday",
    dataIndex: "birthday",
    width: 230
  },
  {
    title: "Gender",
    key: "gender",
    dataIndex: "gender",
    render: (gender) => {
     
      let maleOrFemale = gender==="true" ? <ManOutlined style={{ color: '#0d6efd' ,fontSize: '20px', marginLeft: '12px'}}/> : <WomanOutlined style={{ color: 'hotpink' ,fontSize: '20px', marginLeft: '12px'}}/>;
      return <>{maleOrFemale}</>;
    },
    width: 150
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
    render: (role) => {
      let color = role.length > 4 ? "red" : "green";
      return <Tag color={color}>{role}</Tag>;
    },
    width: 150
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
  },
];

export default function UserManagementTableRender({}: Props) {
  const { arrUser, userEdit } = useSelector(
    (state: RootState) => state.userReducer
  );
  const navigate = useNavigate();
  const params = useParams();

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
        birthday: `${item.birthday}`,
        gender: `${item.gender}`,
        role: `${item.role}`,
        action: (
          <>
            <>
              <button
                className="btn me-2"
                onClick={() => {
                  dispatch(GetUserByIdApi(item.id));

                  navigate(`/admin/editUser/${item.id}`, userEdit);
                }}
              >
                <FormOutlined />
              </button>
            </>
            <button
              className="btn"
              onClick={() => {
                dispatch(deleteUserApi(item));
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
        dataSource={userRender()}
        pagination={{ pageSize: 10, pageSizeOptions: ["10", "20", "30"] }}
        scroll={{ y: 350 }} 
      />
    </>
  );
}
