import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  AddUserModel,
  GetUserByIdApi,
  postUserApi,
} from "../../redux/reducers/userReducer";

type Props = {};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function AddAdminRender({}: Props) {
  const { Option } = Select;
  const { userEdit } = useSelector((state: RootState) => state.userReducer);


  const dispatch: AppDispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const config = {
    rules: [
      {
        type: "object" as const,
        // required: true,
        message: "Please select time!",
      },
    ],
  };

  return (
    <section className="edit-user">
      <div className="edit-user-content">
        <div className="edit-user-item">
          <div className="edit-user-form">
            <Form
              {...formItemLayout}
              name="update"
              onFinish={onFinish}
              initialValues={userEdit}
              scrollToFirstError
              className="mx-auto"
            >
              <div className="col-8 mt-4 ">
                <Form.Item
                  name="name"
                  label="Name"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      //   required: true,
                      message: "Please input your nickname!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input value={userEdit.name} />
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      //   required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input   />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      //   required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password  />
                </Form.Item>

                <Form.Item name="birthday" label="Birthday" {...config}>
                  <DatePicker placeholder={userEdit.birthday} />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      //   required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="gender"
                  label="Gender"
                  //   rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="select your gender" value={0}>
                    <Option value={true}>Male</Option>
                    <Option value={false}>Female</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="role"
                  label="Role"
                  //   rules={[{ required: true, message: "Please select role!" }]}
                >
                  <Select placeholder="select your role">
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
