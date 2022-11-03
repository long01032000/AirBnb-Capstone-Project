import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getRoomInformationByIdApi,
  UpdateRoomInformationByIdApi,
} from "../../redux/reducers/roomReducer";
import TextArea from "antd/lib/input/TextArea";

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

export default function EditRoomInformation({}: Props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { roomInformationEdit } = useSelector(
    (state: RootState) => state.roomReducer
  );
  const params = useParams();

  useEffect(() => {
    let id = parseInt(params.id as string);
    const action = getRoomInformationByIdApi(id);
    dispatch(action);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...roomInformationEdit });
  }, [roomInformationEdit.id,roomInformationEdit]);

  const dispatch: AppDispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    dispatch(UpdateRoomInformationByIdApi(values));
  };

  return (
    <section className="edit-room-information">
      <div className="edit-room-information-content">
        <div className="edit-room-information-item">
          <h1 className="text-center mt-4" style={{fontSize: 20}}>Edit Room Information</h1>
          <div className="edit-room-information-form">
            <Form
              form={form}
              name="update_room_information"
              {...formItemLayout}
              onFinish={onFinish}
              className="row"
              style={{ width: "80%" }}
            >
              <div className=" mt-4">
                <Form.Item name="id" label="Id">
                  <Input disabled={true} value={roomInformationEdit.id} />
                </Form.Item>
                <Form.Item label="Room Name" name="tenPhong">
                  <Input value={roomInformationEdit.tenPhong} />
                </Form.Item>
                <Form.Item label="Guest" name="khach">
                  <Input value={roomInformationEdit.khach} />
                </Form.Item>
                <Form.Item label="Bedroom" name="phongNgu">
                  <Input value={roomInformationEdit.phongNgu} />
                </Form.Item>
                <Form.Item label="Bed" name="giuong">
                  <Input value={roomInformationEdit.giuong} />
                </Form.Item>
                <Form.Item label="Bathroom" name="phongTam">
                  <Input value={roomInformationEdit.phongTam} />
                </Form.Item>
                <Form.Item label="Description" name="moTa">
                  <TextArea rows={5} value={roomInformationEdit.moTa} />
                </Form.Item>
                <Form.Item label="Price" name="giaTien">
                  <Input value={roomInformationEdit.giaTien} />
                </Form.Item>
                <Form.Item label="Location Code" name="maViTri">
                  <Input value={roomInformationEdit.maViTri} />
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
                <Button
                  style={{ marginLeft: 295 }}
                  type="primary"
                  htmlType="submit"
                >
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
