import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLocationApi, PostLocationModel } from "../../redux/reducers/locationReducer";
import { AppDispatch } from "../../redux/configStore";
import { getStoreJson, USER_LOGIN } from "../../util/setting";

type Props = {};

export default function AddLocationRender({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const userLogin = getStoreJson(USER_LOGIN);

  const token = userLogin?.token;
  // const action = postLocationApi(token);
  // dispatch(action);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

    const onFinish = (values: PostLocationModel) => {
      dispatch(postLocationApi(values));
    };

  return (
    <section className="add-location">
      <div className="add-location-content">
        <div className="add-location-item">
          <div className="add-location-form">
            <Form
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
            >
              <Form.Item
                label="Location Name"
                name="tenViTri"
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
                label="Province"
                name="tinhThanh"
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
                label="Nation"
                name="quocGia"
                rules={[
                  {
                    required: true,
                    message: "Please input your nation!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
