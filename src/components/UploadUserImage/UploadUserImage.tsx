import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getLocationApi,
  getLocationByIdApi,
} from "../../redux/reducers/locationReducer";
import { Button, Form, Modal, notification, Spin, Upload } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import React, { useState, useEffect } from "react";
import { getStoreJson, http, USER_LOGIN } from "../../util/setting";
import { useParams } from "react-router-dom";
import { GetUserRoleUserByIdApi } from "../../redux/reducers/userRoleUserReducer";

type Props = {
  

};

type NotificationType = "success" | "info" | "warning" | "error";

const props: UploadProps = {
  name: "file",
  showUploadList: false,
};

export default function UploadUserImage({}: Props) {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [fileList, setFileList] = useState<any>([]);
  const userLogin = getStoreJson(USER_LOGIN).user;
  const { imageUser } = useSelector(
    (state: RootState) => state.userRoleUserReducer
  );
  const nameCover = "Default Image";

  useEffect(() => {
    setFileList(
      imageUser?
        [
            {
              uid: -1,
              name: nameCover,
              url: imageUser.avatar,
            },
          ] : []
    );
  }, []);

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
        "/users/upload-avatar",
        formData
      );
      if (result.data.statusCode === 200) {
        console.log(result)
        setFileList([
          {
            uid: result.data.content.id,
            name: nameCover,
            url: result.data.content.avatar,
          },
        ]);
      }
      
      openNotificationWithIconSuccess("success");
      dispatch(GetUserRoleUserByIdApi(userLogin.id))
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

  return (
    <section
      className="upload-user-image"
    >
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
    </section>
  );
}
