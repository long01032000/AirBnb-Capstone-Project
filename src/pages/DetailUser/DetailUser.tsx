import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { UserOutlined, CheckOutlined } from "@ant-design/icons";
import { getStoreJson, USER_LOGIN } from "../../util/setting";
import EditUserRoleUser from "../../components/EditUserRoleUser/EditUserRoleUser";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { GetUserRoleUserByIdApi, HistoryBookRoomApi } from "../../redux/reducers/userRoleUserReducer";
import UploadUserImage from "../../components/UploadUserImage/UploadUserImage";

type Props = {};

export default function DetailUser({}: Props) {
  const userLogin = getStoreJson(USER_LOGIN);
  const { room ,imageUser} = useSelector((state: RootState) => state.userRoleUserReducer);
  const { Meta } = Card;
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  useEffect(() => {
    dispatch(HistoryBookRoomApi(userLogin.id));
  }, []);
//   useEffect(() => {
//      dispatch(GetUserRoleUserByIdApi(userLogin.user.id));
//   }, []);
  return (
    <section className="detail-user">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Card
              style={{ width: 300, height: 500 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <span className="detail-user-avatar">
                {imageUser.avatar? <Avatar size={150} src={imageUser.avatar} /> : <Avatar size={150} icon={<UserOutlined />} />}
                
              </span>
              <div className="update-user-image">
                <Button type="default" onClick={showModal}>
                  C???p Nh???t ???nh
                </Button>
                <Modal
                  style={{height: 200}}
                  title="C???p Nh???t ???nh"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <UploadUserImage/>
                </Modal>
              </div>
              <div className="detail-user-content">
                <SafetyCertificateOutlined />
              </div>
              <Meta
                title="X??c minh danh t??nh"
                description="X??c th???c danh t??nh c???a b???n v???i huy hi???u x??c minh"
              />
              <button className="btn ">Nh???n Huy Hi???u</button>
              <div className="authen-email">
                <h2>{userLogin.user.name} ???? x??c nh???n</h2>
                <div className="content">
                  <div className="icon">
                    <CheckOutlined size={20} />
                  </div>
                  <p>?????a ch??? email</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-9">
            <h2 className="text-start">
              Xin ch??o t??i t??n {userLogin.user.name}
            </h2>
            <a className="text-start" onClick={showModal1}>
              Ch???nh s???a h??? s??
            </a>
            <Modal
              title="C???p Nh???t Th??ng Tin"
              open={isModalOpen1}
              onOk={handleOk1}
              onCancel={handleCancel1}
            >
              <EditUserRoleUser />
            </Modal>
            <h2 className="text-start nav-title">Ph??ng ???? thu??</h2>
            <div className="room-detail-user">
              {room?.map((prod: any, index: number) => {
                return (
                  <div className="room-item row" key={index}>
                    <div className="col-5">
                      <div className="image">
                        <div className="bg-transparent">
                          <img
                            className="w-100"
                            src="https://picsum.photos/300/"
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="info">
                        <h3 className="room-name">Penhouse ???? l???t </h3>
                        <span className="mota">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Vitae earum, consequuntur cumque voluptatem cum
                          nesciunt suscipit blanditiis numquam ad id. Asperiores
                          amet, voluptates architecto et eveniet doloribus
                          consequatur optio ut.
                        </span>
                        <div className="day">
                          <p className="day-come">
                            Ng??y ?????n :
                            <span className="come">{prod.ngayDen}</span>
                          </p>
                          <p className="day-go">
                            Ng??y ??i : <span className="go">{prod.ngayDi}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
