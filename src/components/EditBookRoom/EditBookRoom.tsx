import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  GetBookRoomByIdApi,
  UpdateBookRoomByIdApi,
} from "../../redux/reducers/bookRoomReducer";
import moment from "moment";

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

export default function EditBookRoom({}: Props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { bookRoomEdit } = useSelector(
    (state: RootState) => state.bookRoomReducer
  );
  const params = useParams();

  useEffect(() => {
    let id = parseInt(params.id as string);
    const action = GetBookRoomByIdApi(id);
    dispatch(action);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      ...bookRoomEdit,
      ngayDen: moment(bookRoomEdit.ngayDen),
      ngayDi: moment(bookRoomEdit.ngayDi),
    });
  }, [bookRoomEdit.id, bookRoomEdit]);

  const dispatch: AppDispatch = useDispatch();
  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      ngayDen: moment(fieldsValue["ngayDen"], "DD-MM-YYYY").add(1, "days"),
      ngayDi: moment(fieldsValue["ngayDi"], "DD-MM-YYYY").add(1, "days"),
    };
    console.log("Received values of form: ", values);

    dispatch(UpdateBookRoomByIdApi(values));
  };

  const config = {
    rules: [
      {
        type: "object" as const,
      },
    ],
  };

  return (
    <section className="edit-book-room">
      <div className="edit-book-room-content">
        <div className="edit-book-room-item">
          <h1 className="text-center mt-4" style={{ fontSize: 20 }}>
            Update Book Room{" "}
          </h1>
          <div className="edit-book-room-form">
            <Form
              {...formItemLayout}
              form={form}
              name="update_book_room"
              onFinish={onFinish}
              scrollToFirstError
              style={{ width: "78%" }}
            >
              <div className=" mt-4">
                <Form.Item name="id" label="Id">
                  <Input disabled={true} value={bookRoomEdit.id} />
                </Form.Item>
                <Form.Item name="maPhong" label="Room Code">
                  <Input disabled={true} value={bookRoomEdit.maPhong} />
                </Form.Item>
                <Form.Item name="ngayDen" label="Check In" {...config}>
                  <DatePicker
                    value={bookRoomEdit.ngayDen}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item name="ngayDi" label="Check Out" {...config}>
                  <DatePicker
                    value={bookRoomEdit.ngayDi}
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item name="soLuongKhach" label="Guest">
                  <Input value={bookRoomEdit.soLuongKhach} />
                </Form.Item>
                <Form.Item name="maNguoiDung" label="Guest Code">
                  <Input value={bookRoomEdit.maNguoiDung} />
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
