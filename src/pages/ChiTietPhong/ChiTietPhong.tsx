import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { Avatar, DatePicker, Form, InputNumber, Input, Button } from "antd";
import { getProductRoom } from "../../redux/reducers/productReducer";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { SelectProps, RadioChangeEvent, Comment, List, Tooltip } from "antd";
import {
  StarFilled,
  SafetyCertificateFilled,
  ShareAltOutlined,
  HeartOutlined,
  HomeOutlined,
  StarTwoTone,
  FormatPainterOutlined,
  CrownOutlined,
  FileDoneOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import moment from "moment";
import {
  GetCommentByRoomCode,
  GetUserRoleUserByIdApi,
} from "../../redux/reducers/userRoleUserReducer";
import { getStoreJson, USER_LOGIN } from "../../util/setting";
import { postBookRoomApi } from "../../redux/reducers/bookRoomReducer";
import AddcommentRender from "../../components/AddCommentRender/AddcommentRender";
import UserComment from "../../components/UserComment/UserComment";
type Props = {};

export default function ChiTietPhong({}: Props) {
  const params = useParams();
  const userLogin = getStoreJson(USER_LOGIN);
  const dispatch: AppDispatch = useDispatch();
  const { imageUser } = useSelector(
    (state: RootState) => state.userRoleUserReducer
  );
  const { RangePicker } = DatePicker;
  const options: SelectProps["options"] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const rangeConfig = {
    rules: [{ type: "array" as const }],
  };

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const [size, setSize] = useState<SizeType>("middle");

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  // ========================== //

  const getRoomApi = () => {
    let { id }: any = params;
    const action = getProductRoom(id);
    dispatch(action);
  };
  const { arrProductRoom } = useSelector(
    (state: RootState) => state.productReducer
  );

  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      maNguoiDung: userLogin.user.id,
      ngayDen: moment(fieldsValue["ngayDen"]),
      ngayDi: moment(fieldsValue["ngayDi"]),
    };
    dispatch(postBookRoomApi(values));
    console.log("Received values of form: ", values);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    getRoomApi();
    dispatch(GetCommentByRoomCode(params.id));
  }, [params.id]);
  let {
    hinhAnh,
    tenPhong,
    khach,
    phongNgu,
    phongTam,
    giuong,
    moTa,
    mayGiat,
    banLa,
    tivi,
    dieuHoa,
    wifi,
    bep,
    doXe,
    hoBoi,
    banUi,
  } = arrProductRoom;
  /////////////////////////
  const { TextArea } = Input;
  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: "Han Solo",
      avatar: "https://joeschmoe.io/api/v1/random",
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 11:22:33">
          <span>8 hours ago</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: "Han Solo",
      avatar: "https://joeschmoe.io/api/v1/random",
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title="2016-11-22 10:22:33">
          <span>9 hours ago</span>
        </Tooltip>
      ),
    },
  ];

  return (
    <section id="ChiTietPhong" className="container">
      <h2>{tenPhong}</h2>
      <div className="nav-title">
        <StarFilled size={20} />
        <li> {parseFloat(Math.random().toFixed(2)) * (5 - 4 + 1) + 3}</li>
        <li className="dot"></li> <SafetyCertificateFilled />{" "}
        <li className="chuNha">Ch??? nh?? si??u c???p</li>
        <ul className="share">
          <ShareAltOutlined />
          <li>Chia s???</li>
        </ul>
        <ul className="like">
          {" "}
          <HeartOutlined />
          <li>L??u</li>
        </ul>
      </div>
      <div className="img">
        <img src={hinhAnh} alt="" className="w-100" />
      </div>
      <div className="row">
        <div className="col-6 col-left">
          <div className="detail">
            <div className="thongTinPhong">
              <h5>To??n b??? c??n h??? condo, Ch??? nh?? Phong</h5>
              <p>
                {khach}kh??ch . {phongNgu}phongNgu . {giuong}gi?????ng . {phongTam}
                phongTam
              </p>
            </div>
            <div className="avatar">
              <Avatar size={60} src={imageUser.avatar} />
            </div>
          </div>

          <div className="utilities">
            <div className="utilitie1">
              <div className="icon-util">
                <HomeOutlined style={{ verticalAlign: 19 }} />
              </div>
              <div className="content">
                <p>To??n b??? nh??</p>
                <span>B???n s??? c?? chung c?? cao c???p cho ri??ng m??nh</span>
              </div>
            </div>
            <div className="utilitie2">
              <div className="icon-util">
                <FormatPainterOutlined style={{ verticalAlign: 16 }} />
              </div>
              <div className="content">
                <p>V??? sinh t??ng c?????ng</p>
                <span className="d-flex">
                  Ch??? nh?? ???? cam k???t th???c hi???n v??? sinh t??ng c?????ng 5 b?????c c???a
                  Airbnb.{" "}
                  <NavLink
                    to=""
                    className="fw-bold ms-2 text-dark"
                    style={{ textDecoration: "underline" }}
                  >
                    Hi???n th??? th??m
                  </NavLink>
                </span>
              </div>
            </div>
            <div className="utilitie3">
              <div className="icon-util">
                <CrownOutlined style={{ verticalAlign: 19 }} />
              </div>
              <div className="content">
                <p>Phong l?? ch??? nh?? si??u c???p</p>
                <span>Ch??? nh?? si??u c???p l?? nh???ng ch??? nh?? c?? kinh nghi???m</span>
              </div>
            </div>
            <div className="utilitie4">
              <div className="icon-util">
                <FileDoneOutlined style={{ verticalAlign: 2 }} />
              </div>
              <div className="content">
                <p>Mi???n ph?? h???y trong 48 gi???</p>
              </div>
            </div>
          </div>

          <div className="note">
            <div className="translation">
              <p>D???ch sang Ti???ng Vi???t</p>
              <i className="fa-solid fa-spell-check"></i>
            </div>
            <div className="lorem mb-4">
              <p>{moTa}</p>
              <span>
                <NavLink
                  to=""
                  className="fw-bold text-dark"
                  style={{ textDecoration: "underline" }}
                >
                  Hi???n th??? th??m
                </NavLink>
              </span>
            </div>
          </div>

          <div className="convenient">
            <h5>Ti???n Nghi</h5>
            <div className="row">
              <div className="col-6">
                <div className="convenient-item">
                  {Boolean(bep) === true ? (
                    <>
                      <i className="fa-solid fa-kitchen-set"></i>
                      <p>B???p</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="convenient-item">
                  {Boolean(tivi) === true ? (
                    <>
                      {" "}
                      <i className="fa-solid fa-tv"></i>
                      <p>TV v???i truy???n h??nh cap ti??u chu???n</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="convenient-item">
                  {Boolean(dieuHoa) === true ? (
                    <>
                      {" "}
                      <i className="fa-solid fa-snowflake"></i>
                      <p>??i???u h??a nhi???t ?????</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="convenient-item">
                  {Boolean(mayGiat) === true ? (
                    <>
                      {" "}
                      <i>
                        <SkinOutlined style={{ verticalAlign: 4 }} />
                      </i>
                      <p>M??y Gi???t</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="convenient-item">
                  {Boolean(doXe) === true ? (
                    <>
                      {" "}
                      <i className="fa-solid fa-p"></i>
                      <p>B??i ????? xe thu ph?? n???m ngo??i c??ng vi??n</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="convenient-item">
                  {Boolean(wifi) === true ? (
                    <>
                      {" "}
                      <i className="fa-solid fa-wifi"></i>
                      <p>wifi</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="convenient-item">
                  {Boolean(hoBoi) === true ? (
                    <>
                      {" "}
                      <i className="fa-solid fa-person-swimming"></i>
                      <p>H??? B??i</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="convenient-item">
                  {Boolean(banUi) === true ? (
                    <>
                      {" "}
                      <i className="fa-regular fa-square"></i>
                      <p>B??n ???i</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="convenient-item">
                  {Boolean(banLa) === true ? (
                    <>
                      {" "}
                      <i className="fa-solid fa-bridge-water"></i>
                      <p>B??n L??</p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <Button
                className="btn btn-load-more"
                style={{
                  width: 247,
                  height: "100%",
                  border: "1px solid #222",
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  marginBottom :25,
                  marginLeft: 10
                }}
              >
                Hi???n th??? t???t c??? 24 ti???n nghi
              </Button>
            </div>
          </div>
          <div className="add-comment">
            <div className="add-comment-content">
              <UserComment />
              <AddcommentRender />
            </div>
          </div>
        </div>
        {/* end col-6 */}
        <div className="col-6 col-right">
          <div className="book-room">
            <div
              className="d-flex"
              style={{ justifyContent: "space-between", marginTop: 10 }}
            >
              <div className="price">
                <p className="d-flex fw-bold">
                  $44 <li className="fw-normal ms-2">/ ????m</li>{" "}
                </p>
              </div>
              <div className="star">
                <li>
                  {" "}
                  <StarTwoTone
                    style={{ verticalAlign: 2, fontSize: 15 }}
                    twoToneColor="red"
                  />{" "}
                  4,83 (18 ????nh gi??)
                </li>
              </div>
            </div>
            <div className="book">
              <Form
                style={{ marginTop: 15 }}
                form={form}
                name="add_bookRoom"
                onFinish={onFinish}
                initialValues={{
                  prefix: "84",
                }}
                scrollToFirstError
              >
                <Form.Item name="ngayDen">
                  <DatePicker
                    placeholder="Check In"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item name="ngayDi">
                  <DatePicker
                    placeholder="Check Out"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item name="soLuongKhach" style={{ width: "100%" }}>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Guest"
                    min={1}
                    max={10}
                  />
                </Form.Item>
                <Form.Item
                  className="text-center"
                  wrapperCol={{ span: 10, offset: 0 }}
                >
                  <button
                    className="btn btn-danger"
                    style={{ width: 320, marginTop: 0 }}
                  >
                    ?????t ph??ng
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        {/* end col-6 */}
      </div>
    </section>
  );
}
