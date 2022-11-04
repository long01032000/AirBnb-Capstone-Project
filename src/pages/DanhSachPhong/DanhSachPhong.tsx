import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getProductAllRoom, ProductModelRoom } from "../../redux/reducers/productReducer";
import { getAllRoomInformationAction, GetAllRoomInformationModel, getRoomInformationApi, getRoomInformationByLocationCodeApi } from "../../redux/reducers/roomReducer";

type Props = {};

export default function DanhSachPhong({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const {arrRoomInformation} = useSelector((state: RootState) => state.roomReducer)
  const navigate = useNavigate()
  // const getAllRoom = () => {
  //   const action = getProductAllRoom();
  //   dispatch(action)
  // }
  // useEffect(() => {
  //   dispatch(getRoomInformationApi());
  // }, [])
  const params = useParams();

  useEffect(() => {
    let maViTri: any = params;
    console.log(maViTri)
    const action = getRoomInformationByLocationCodeApi(maViTri);
    dispatch(action);
  }, []);


  // ======================= //
  return (
    <section className="classRoom container">
      <div className="row">
        <div className="col-6">
          <p>Hơn 300 chỗ ở. 16 tháng 4 - 14 tháng 5</p>
          <h3>Chỗ ở tại khu vực bản đồ đã chọn</h3>
          <div className="utils">
            <button className="btn">Loại nơi ở</button>
            <button className="btn">Giá</button>
            <button className="btn">Đặt ngay</button>
            <button className="btn">Phòng và phòng ngủ</button>
            <button className="btn">Bộ lọc khác</button>
          </div>
          <div className="room">
            {arrRoomInformation?.map((prod:GetAllRoomInformationModel, index:number) => {
              return <div className="room-item" key={index}>
                  <div className="image">
                    <button className="bg-transparent" onClick={() => {
                        navigate(`/ChiTietPhong/${prod.id}`)
                    }}><img src={prod.hinhAnh} alt="..."/></button>
                  </div>
                  <div className="info">
                    <p className="ten-phong">{prod.tenPhong}</p>
                    <div className="util">
                      <p>{prod.khach}khách . {prod.giuong}giường . {prod.phongTam}phòngTắm . Wifi . Bếp . Điều hòa . Máy giặt</p>
                      <span className="price">
                        ${prod.giaTien}
                      </span>
                      <span>/tháng</span>
                      <div className="icon-hear">
                      <i className="fa-regular fa-heart"></i>
                      </div>
                    </div>
                  </div>
              </div>
            })}
          </div>
        </div>
        <div className="col-6">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d125854.58054954537!2d105.59212533927523!3d9.684827140722266!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1667296558355!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
