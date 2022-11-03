import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { AddUserModel, postUserApi } from "../../redux/reducers/userReducer";
import { postBookRoomApi } from "../../redux/reducers/bookRoomReducer";
import { postRoomInformationApi } from "../../redux/reducers/roomReducer";
import TextArea from "antd/lib/input/TextArea";

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

export default function AddRoomInformationRender({}: Props) {
  const [form] = Form.useForm();

  const dispatch: AppDispatch = useDispatch();

  const onFinish = (value: any) => {
    console.log("Received values of form: ", value);
    dispatch(postRoomInformationApi(value));
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
    <section className="add-roomInformation">
      <div className="add-roomInformation-content">
        <div className="add-roomInformation-item">
          <div className="add-roomInformation-form">
            <Form
              {...formItemLayout}
              form={form}
              name="add_roomInformation"
              className="row"
              onFinish={onFinish}
              scrollToFirstError
             
            >
              <div className=""  style={{ width: "80%" }}>
                <Form.Item
                  label="Room Name"
                  name="tenPhong"
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
                  label="Guest"
                  name="khach"
                  rules={[
                    {
                      required: true,
                      message: "Please input guest number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bedroom"
                  name="phongNgu"
                  rules={[
                    {
                      required: true,
                      message: "Please input bedroom number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bed"
                  name="giuong"
                  rules={[
                    {
                      required: true,
                      message: "Please input bed number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bathroom"
                  name="phongTam"
                  rules={[
                    {
                      required: true,
                      message: "Please input bathroom number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="moTa"
                  rules={[
                    {
                      required: true,
                      message: "Please input description!",
                    },
                  ]}
                >
                  <TextArea rows={5} />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="giaTien"
                  rules={[
                    {
                      required: true,
                      message: "Please input price!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Location Code"
                  name="maViTri"
                  rules={[
                    {
                      required: true,
                      message: "Please input location code!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
               

               
              </div>
              <div className="col-6">
               <Form.Item
                  label="Washing Machine"
                  name="mayGiat"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label="Steam Iron"
                  name="banLa"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label="Television"
                  name="tivi"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label="Air Condition"
                  name="dieuHoa"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item label="Wifi" name="wifi" valuePropName="checked">
                  <Switch />
                </Form.Item>
               </div>
               <div className="col-6">
               <Form.Item label="Kitchen" name="bep" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item label="Parking" name="doXe" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item label="Pool" name="hoBoi" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <Form.Item label="Iron" name="banUi" valuePropName="checked">
                  <Switch />
                </Form.Item>
               </div>
               <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" style={{marginRight: 250}}>
                    Add
                  </Button>
                </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
