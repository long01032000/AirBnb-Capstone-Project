import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { registerApi } from "../../redux/reducers/userReducer";

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

export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { Option } = Select;
  const [form] = Form.useForm();
  
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      "birthday": fieldsValue["birthday"].format("YYYY-MM-DD"),
    };
    dispatch(registerApi(values))
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <section className="register">
        <div className="register-content">
          <div className="logo">
            <NavLink to="/home">
              <img src="Image/logo.svg" alt="..." />
            </NavLink>
          </div>
          <div className="register-item">
            <div className="register-item-content">
              <h1 className="title">Create new account</h1>
              <p className="nav-title text-center">
                Already A Member? <NavLink to="/login">Login</NavLink>
              </p>
            </div>
            <div className="register-form">
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                  prefix: "84",
                }}
                scrollToFirstError
              >
                <div className="col-6">
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item name="birthday" label="Birthday" {...config}>
                    <DatePicker />
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      Create Account
                    </Button>
                  </Form.Item>
                </div>

                <div className="col-6">
                  <Form.Item
                    name="name"
                    label="Name"
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        required: true,
                        message: "Please input your nickname!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      addonBefore={prefixSelector}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                      { required: true, message: "Please select gender!" },
                    ]}
                  >
                    <Select placeholder="select your gender">
                      <Option value={true}>Male</Option>
                      <Option value={false}>Female</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: "Please select role!" }]}
                  >
                    <Select placeholder="select your role">
                      <Option value="user">User</Option>
                      <Option value="admin">Admin</Option>
                    </Select>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
