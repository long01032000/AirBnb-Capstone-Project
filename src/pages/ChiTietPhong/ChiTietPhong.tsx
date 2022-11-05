import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { DatePicker, Space } from "antd";
import { getProductRoom } from "../../redux/reducers/productReducer";
import { Radio, Select } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps, RadioChangeEvent } from "antd";
import { StarFilled, SafetyCertificateFilled,ShareAltOutlined ,HeartOutlined} from "@ant-design/icons";
type Props = {};

export default function ChiTietPhong({}: Props) {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const options: SelectProps["options"] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

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

  useEffect(() => {
    getRoomApi();
  }, [params.id]);
  let { hinhAnh, tenPhong, khach, phongNgu, phongTam, giuong } = arrProductRoom;

  // ========================== //
  return (
    <section id="ChiTietPhong" className="container">
      <h2>{tenPhong}</h2>
      <div className="nav-title">
        
          <StarFilled size={20} />
          <li> {parseFloat(Math.random().toFixed(2)) * (5 - 4 + 1) + 3}</li>
          <li className="dot"></li> <SafetyCertificateFilled />{" "}
          <li className="chuNha">Chủ nhà siêu cấp</li>
          <ul className="share"><ShareAltOutlined /><li>Chia sẻ</li></ul>
          <ul className="like"> <HeartOutlined /><li>Lưu</li></ul>
         
      
      </div>
      <div className="img">
        <img src={hinhAnh} alt="" className="w-100" />
      </div>
      <div className="row">
        <div className="col-sm-6 col-12">
          <div className="detail">
            <div className="thongTinPhong">
              <h4>Toàn bộ căn hộ condo, Chủ nhà Phong</h4>
              <p>
                {khach}khách . {phongNgu}phongNgu . {giuong}giường . {phongTam}
                phongTam
              </p>
            </div>
            <div className="avatar">
              <img src="https://i.pravatar.cc/50?img=5" alt="" />
            </div>
          </div>

          <div className="utilities">
            <div className="utilitie1">
              <div className="icon-util">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="content">
                <p>Toàn bộ nhà</p>
                <span>Bạn sẽ có chung cư cao cấp cho riêng mình</span>
              </div>
            </div>
            <div className="utilitie2">
              <div className="icon-util">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="content">
                <p>Vệ sinh tăng cường</p>
                <span>
                  Chủ nhà đã cam kết thực hiện vệ sinh tăng cường 5 bước của
                  Airbnb
                </span>
              </div>
            </div>
            <div className="utilitie3">
              <div className="icon-util">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="content">
                <p>Phong là chủ nhà siêu cấp</p>
                <span>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm</span>
              </div>
            </div>
            <div className="utilitie4">
              <div className="icon-util">
                <i className="fa-solid fa-house"></i>
              </div>
              <div className="content">
                <p>Miễn phí hủy trong 48 giờ</p>
              </div>
            </div>
          </div>

          <div className="note">
            <div className="translation">
              <p>Dịch sang Tiếng Việt</p>
              <i className="fa-solid fa-spell-check"></i>
            </div>
            <div className="lorem">
              <p>
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus assumenda repellendus, porro quis quos odio. Sequi
                dolores cum illum, incidunt magni qui ipsum tenetur, vero sunt
                at sapiente, corrupti temporibus!
              </p>
            </div>
          </div>

          <div className="convenient">
            <h5>Tiện Nghi</h5>
            <div className="row">
              <div className="col-6">
                <div className="convenient-item">
                  <i className="fa-solid fa-kitchen-set"></i>
                  <p>Bếp</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-solid fa-tv"></i>
                  <p>TV với truyền hình cap tiêu chuẩn</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-solid fa-snowflake"></i>
                  <p>Điều hòa nhiệt độ</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-solid fa-fire"></i>
                  <p>Lò sưởi trong nhà</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-solid fa-p"></i>
                  <p>Bãi đỗ xe thu phí nằm ngoài công viên</p>
                </div>
              </div>
              <div className="col-6">
                <div className="convenient-item">
                  <i className="fa-solid fa-wifi"></i>
                  <p>wifi</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-solid fa-elevator"></i>
                  <p>Thang máy</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-regular fa-square"></i>
                  <p>Sân hoặc ban công</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-solid fa-bridge-water"></i>
                  <p>Tủ lạnh</p>
                </div>
                <div className="convenient-item">
                  <i className="fa-solid fa-calendar"></i>
                  <p>Cho phép ở dài hạn</p>
                </div>
              </div>
            </div>
          </div>

          <div className="comment">
            <div className="row">
              <div className="col-6">
                <div className="comment-item">
                  <div className="avatar">
                    <div className="avt">
                      <img src="https://i.pravatar.cc/50" alt="" />
                    </div>
                    <div className="prf">
                      <p className="name">Thu Hai</p>
                      <p>tháng 6 năm 2022</p>
                    </div>
                  </div>
                  <div className="content-comment">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Eaque ipsam autem beatae? Velit modi veniam quos
                      reprehenderit quibusdam eaque aliquid mollitia cumque
                    </p>
                  </div>
                </div>
                <div className="comment-item mt-5">
                  <div className="avatar">
                    <div className="avt">
                      <img src="https://i.pravatar.cc/50" alt="" />
                    </div>
                    <div className="prf">
                      <p className="name">Tam</p>
                      <p>tháng 6 năm 2022</p>
                    </div>
                  </div>
                  <div className="content-comment">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Eaque ipsam autem beatae? Velit modi veniam quos
                      reprehenderit quibusdam eaque aliquid mollitia cumque
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="comment-item">
                  <div className="avatar">
                    <div className="avt">
                      <img src="https://i.pravatar.cc/50" alt="" />
                    </div>
                    <div className="prf">
                      <p className="name">Kaito</p>
                      <p>tháng 6 năm 2022</p>
                    </div>
                  </div>
                  <div className="content-comment">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Eaque ipsam autem beatae? Velit modi veniam quos
                      reprehenderit quibusdam eaque aliquid mollitia cumque
                    </p>
                  </div>
                </div>
                <div className="comment-item mt-5">
                  <div className="avatar">
                    <div className="avt">
                      <img src="https://i.pravatar.cc/50" alt="" />
                    </div>
                    <div className="prf">
                      <p className="name">Kamira</p>
                      <p>tháng 6 năm 2022</p>
                    </div>
                  </div>
                  <div className="content-comment">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Eaque ipsam autem beatae? Velit modi veniam quos
                      reprehenderit quibusdam eaque aliquid mollitia cumque
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="add-comment">
            <div className="avatar">
              <img src="https://i.pravatar.cc/50" alt="" />
            </div>
            <textarea name="" id="" cols={100} rows={5}></textarea>
          </div>
        </div>
        {/* end col-6 */}
        <div className="col-sm-6 col-12">
          <div className="book-room">
            <div>
              <div className="price">
                <p>$44 / đêm</p>
              </div>
              <div className="star">
                <i className="fa-solid fa-star"></i> 4,83 (18 đánh giá)
              </div>
            </div>
            <div className="book">
              <div className="date">
                <Space direction="vertical" size={15}>
                  <RangePicker
                    style={{
                      width: 320,
                      padding: 15,
                      borderRadius: "20px 20px 0px 0px",
                    }}
                  />
                </Space>
              </div>
              <div className="select">
                <Select
                  size={size}
                  defaultValue="a1"
                  onChange={handleChange}
                  style={{
                    width: 320,
                    padding: "10px 0",
                    border: "1px solid #CFD6DC",
                    borderRadius: "0px 0px 20px 20px",
                  }}
                  options={options}
                  bordered={false}
                />
              </div>
              <button
                className="btn btn-danger"
                style={{ width: 320, marginTop: 15 }}
              >
                Đặt phòng
              </button>
            </div>
          </div>
        </div>
        {/* end col-6 */}
      </div>
    </section>
  );
}
