import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getLocationApi, getLocationByIdApi } from "../../redux/reducers/locationReducer";
import { Button, Form, Modal, notification, Spin, Upload } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import React, { useState, useEffect } from "react";
import { http } from "../../util/setting";
import { useParams } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { getRoomInformationApi } from "../../redux/reducers/roomReducer";

type Props = {
  id:number,
  hinhAnh: string
};

type NotificationType = "success" | "info" | "warning" | "error";

const props: UploadProps = {
  name: "file",
  showUploadList: false,
};

export default function UploadRoomImage({id,hinhAnh}: Props) {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [fileList, setFileList] = useState<any>([]);
  const [img, setImg] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const nameCover = "Default Image";

  useEffect(() => {
    setFileList(
      hinhAnh
        ? [
            {
              uid: -1,
              name: nameCover,
              url: hinhAnh,
            },
          ]
        : []
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
        `/phong-thue/upload-hinh-phong?maPhong=${id}`,
        formData
      );
      if (result.data.statusCode === 200) {
        setFileList([
          {
            uid: result.data.content.id,
            name: nameCover,
            url: result.data.content.hinhAnh,
          },
        ]);
      }
      openNotificationWithIconSuccess("success");
      dispatch(getRoomInformationApi());
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
    <section className="upload_Room_Image" style={{position: "absolute", top: 42, left: 180}}>
       <EditOutlined size={50} onClick={showModal} />
       <Modal title="Upload Image" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
      </Modal>
    
     
  </section>
  );
}

