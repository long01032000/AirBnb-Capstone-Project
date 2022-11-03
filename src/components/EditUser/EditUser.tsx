import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  AddUserModel,
  GetUserByIdApi,
  postUserApi,
  UpdateUserByIdApi,
} from "../../redux/reducers/userReducer";

type Props = {};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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

export default function EditUser({}: Props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { userEdit } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();

  useEffect(() => {
    let id = parseInt(params.id as string);
    const action = GetUserByIdApi(id);
    dispatch(action);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...userEdit });
  }, [userEdit.id, userEdit]);

  const dispatch: AppDispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    dispatch(UpdateUserByIdApi(values));
  };

  return (
    <section className="edit-user">
      <div className="edit-user-content">
        <div className="edit-user-item">
          <h1 className="text-center mt-4">
            Edit User Management
          </h1>
          <div className="edit-user-form">
            <Form
              {...formItemLayout}
              form={form}
              name="update"
              onFinish={onFinish}
              scrollToFirstError
              style={{ width: "78%" }}
            >
              <div className="mt-4">
                <Form.Item name="id" label="Id">
                  <Input disabled={true} value={userEdit.id} />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input disabled={true} value={userEdit.email} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore="+84"
                    style={{
                      width: "100%",
                    }}
                    value={userEdit.phone}
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="name"
                  tooltip="What do you want others to call you?"
                  rules={[
                    {
                      message: "Please input your nickname!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input value={userEdit.name} />
                </Form.Item>
                <Form.Item name="password" label="Password" hasFeedback>
                  <Input.Password disabled={true} value={userEdit.password} />
                </Form.Item>
                <Form.Item
                  name="birthday"
                  label="Birthday"
                  rules={[
                    {
                      message: "Please select time!",
                    },
                  ]}
                >
                  <Input value={userEdit.birthday} />
                </Form.Item>

                <Form.Item name="gender" label="Gender">
                  <Select
                    placeholder="select your gender"
                    value={userEdit.gender}
                  >
                    <Option value={true}>Male</Option>
                    <Option value={false}>Female</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="role" label="Role">
                  <Select value={userEdit.role}>
                    <Option value="USER">User</Option>
                    <Option value="ADMIN">Admin</Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item
                className="text-center"
                wrapperCol={{ span: 18, offset: 7 }}
              >
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
