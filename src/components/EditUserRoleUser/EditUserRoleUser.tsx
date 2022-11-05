import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getStoreJson, USER_LOGIN } from "../../util/setting";
import {
  AddUserModel,
  GetUserByIdApi,
  postUserApi,
  UpdateUserByIdApi,
} from "../../redux/reducers/userReducer";
import { UpdateUserRoleUserByIdApi } from "../../redux/reducers/userRoleUserReducer";

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

export default function EditUserRoleUser({}: Props) {
  const { Option } = Select;
  const userLogin = getStoreJson(USER_LOGIN);
  
  
  const [form] = Form.useForm();
 

  const dispatch: AppDispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    dispatch(UpdateUserRoleUserByIdApi(values));
  };

  return (
    <section className="edit-user-role-user">
      <div className="edit-user-role-user-content">
        <div className="edit-user-role-user-item">
          <div className="edit-user-role-user-form">
            <Form
              {...formItemLayout}
              form={form}
              name="update"
              initialValues={userLogin.user}
              onFinish={onFinish}
              scrollToFirstError
              style={{ width: "78%" }}
            >
              <div className="mt-4">
                <Form.Item name="id" label="Id">
                  <Input disabled={true} value={userLogin.user.id} />
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
                  <Input disabled={true} value={userLogin.user.email} />
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
                    value={userLogin.user.phone}
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="name"
                  tooltip="What do you want others to call you?"
                >
                  <Input value={userLogin.user.name} />
                </Form.Item>
                <Form.Item name="password" label="Password" hasFeedback>
                  <Input.Password value={userLogin.user.password} />
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
                  <Input value={userLogin.user.birthday} />
                </Form.Item>

                <Form.Item name="gender" label="Gender">
                  <Select
                    placeholder="select your gender"
                    value={userLogin.user.gender}
                  >
                    <Option value={true}>Male</Option>
                    <Option value={false}>Female</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="role" label="Role">
                  <Select value={userLogin.user.role}>
                    <Option value="USER">User</Option>
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
