import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { AddUserModel, postUserApi } from "../../redux/reducers/userReducer";
import { postBookRoomApi } from "../../redux/reducers/bookRoomReducer";
import moment from "moment";

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

export default function AddBookRoomRender({}: Props) {
  const [form] = Form.useForm();

  const dispatch: AppDispatch = useDispatch();
  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      ngayDen: new Date(fieldsValue["ngayDen"]),
      ngayDi: new Date(fieldsValue["ngayDi"]),
    };
    dispatch(postBookRoomApi(values));
    console.log("Received values of form: ", values);
  };

  const config = {
    rules: [
      {
        type: "object" as const,
        required: true,
        message: "Please select time!",
      },
    ],
  };

  return (
    <section className="add-bookRoom">
      <div className="add-bookRoom-content">
        <div className="add-bookRoom-item">
          <div className="add-bookRoom-form">
            <Form
              {...formItemLayout}
              form={form}
              name="add_bookRoom"
              onFinish={onFinish}
              initialValues={{
                prefix: "84",
              }}
              scrollToFirstError
            >
              <div className="col-10">
                <Form.Item
                  name="maPhong"
                  label="Room Code"
                  rules={[
                    {
                      type: "regexp",
                      pattern: new RegExp(/^-?[0-5]?$/g),
                      message:
                        "Room code is number, greater than 0 and less than 5 ",
                    },
                    {
                      required: true,
                      message: "Please input your room code!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="ngayDen"
                  label="Check In"
                  {...config}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="ngayDi" label="Check Out" {...config}>
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="soLuongKhach"
                  label="Guest"
                  rules={[
                    {
                      required: true,
                      message: "Please input your guest number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="maNguoiDung"
                  label="Guest Code"
                  rules={[
                    {
                      required: true,
                      message: "Please input your guest code!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Add
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
