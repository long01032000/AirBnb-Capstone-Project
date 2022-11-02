import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
  Spin,
  Upload,
} from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getLocationByIdApi,
  UpdateLocationByIdApi,
} from "../../redux/reducers/locationReducer";
import UploadImageLocation from "../UploadImageLocation/UploadImageLocation";
import { http } from "../../util/setting";

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

export default function EditLocation({}: Props) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { locationEdit } = useSelector(
    (state: RootState) => state.locationReducer
  );
  const params = useParams();
  const [fileList, setFileList] = useState<any>([]);
  const nameCover = "Default Image";

  useEffect(() => {
    setFileList(
      locationEdit
        ? [
            {
              uid: locationEdit.id,
              name: nameCover,
              url: locationEdit.hinhAnh,
            },
          ]
        : []
    );
  }, [locationEdit.id]);

  useEffect(() => {
    let id = parseInt(params.id as string);
    const action = getLocationByIdApi(id);
    dispatch(action);
  }, []);

  useEffect(() => {
    form.setFieldsValue({ ...locationEdit });
  }, [locationEdit.id, locationEdit]);

  const uploadImage = async (options: any) => {
    const { file } = options;

    let formData: FormData = new FormData();

    formData.append("formFile", file);
    try {
      const openNotificationWithIconSuccess = (type: "success") => {
        notification[type]({
          message: "Success",
          description: "Update Image Success",
        });
      };
      const result = await http.post(
        `/vi-tri/upload-hinh-vitri?maViTri=${locationEdit.id}`,
        formData
      );
      if (result.data.statusCode === 200) {
        setFileList([
          {
            uid: params.id,
            name: nameCover,
            url: result.data.content.hinhAnh,
          },
        ]);
      }
      openNotificationWithIconSuccess("success");
    } catch (err: any) {
      const openNotificationWithIconError = (type: "error") => {
        notification[type]({
          message: "Error",
          description: err.response.data.content,
        });
      };
      openNotificationWithIconError("error");
    }
  };

  const dispatch: AppDispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    dispatch(UpdateLocationByIdApi(values));
  };

  return (
    <section className="edit-location">
      <div className="edit-location-content">
        <div className="edit-location-item">
          <h1 className="text-center mt-4">
            Edit Location Information
          </h1>
          <div className="edit-location-form">
            <Form
              form={form}
              name="update_location"
              {...formItemLayout}
              onFinish={onFinish}
              style={{ width: "80%" }}
            >
              <div className="mt-4">
                <Form.Item name="id" label="Id">
                  <Input disabled={true} value={locationEdit.id} />
                </Form.Item>
                <Form.Item
                  label="Location Name"
                  name="tenViTri"
                  rules={[
                    {
                      message: "Please input your location name!",
                    },
                  ]}
                >
                  <Input value={locationEdit.tenViTri} />
                </Form.Item>

                <Form.Item
                  label="Province"
                  name="tinhThanh"
                  rules={[
                    {
                      message: "Please input your province!",
                    },
                  ]}
                >
                  <Input value={locationEdit.tinhThanh} />
                </Form.Item>
                <Form.Item
                  label="Nation"
                  name="quocGia"
                  rules={[
                    {
                      message: "Please input your nation!",
                    },
                  ]}
                >
                  <Input value={locationEdit.quocGia} />
                </Form.Item>
                <Form.Item label="Image">
                  <Upload
                    accept="image/*"
                    customRequest={uploadImage}
                    listType="picture-card"
                    fileList={fileList}
                    showUploadList={{ showRemoveIcon: true }}
                    iconRender={() => {
                      return <Spin></Spin>;
                    }}
                    progress={{
                      strokeWidth: 3,
                      strokeColor: {
                        "0%": "#f0f",
                        "100%": "#f00",
                      },
                      style: { top: 12 },
                    }}
                  >
                    <Button>Upload</Button>
                  </Upload>
                </Form.Item>
              </div>
              <Form.Item
                className="text-center"
                wrapperCol={{ span: 18, offset: 6 }}
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
