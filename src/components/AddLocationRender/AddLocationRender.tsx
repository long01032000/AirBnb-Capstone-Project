import React, { useState } from "react";
import { Button, message, Upload, DatePicker, Form, Input, Select } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { AddUserModel, postUserApi } from "../../redux/reducers/userReducer";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

type Props = {};

export default function AddLocationRender({}: Props) {
  const { Option } = Select;
  const [form] = Form.useForm();

  const dispatch: AppDispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <section className="add-location">
      <div className="add-location-content">
        <div className="add-location-item">
          <div className="add-location-form">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              className="row"
            >
              <div className="col-10">
                <Form.Item
                  name="tenViTri"
                  label="Location Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your location name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="tinhThanh"
                  label="Province"
                  rules={[
                    {
                      required: true,
                      message: "Please input your province!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="quocGia"
                  label="Nation"
                  rules={[
                    {
                      required: true,
                      message: "Please input your nation!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <FormItem
                  name="hinhAnh"
                  label="Image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload {...props} name="image">
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </FormItem>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
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
