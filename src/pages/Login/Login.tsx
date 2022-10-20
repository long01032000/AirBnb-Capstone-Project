import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { loginApi } from "../../redux/reducers/userReducer";

type Props = {};

export default function Login({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    dispatch(loginApi(values))
  };
  return (
    <section className="login">
      <div className="row">
        <div className="logo">
          <NavLink to="/home"><img src="Image/logo.svg" alt="..." /></NavLink>
        </div>
        <div className="login-item">
          <div className="login-content">
            <h1 className="title">Welcome back</h1>
            <p className="nav-title">Welcome back! Please enter your details</p>
          </div>
          <div className="login-form">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
                 <div className="register text-center mt-3">
                 Or <NavLink to="/register"> register now!</NavLink>
                 </div>
            </Form.Item>
          </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
