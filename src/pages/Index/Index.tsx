import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  getProductApi,
  ProductModel,
} from "../../redux/reducers/productReducer";

//
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  GetAllRoomInformationModel,
  getRoomInformationApi,
} from "../../redux/reducers/roomReducer";

type Props = {};

export default function Home({}: Props) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { arrProductViTri } = useSelector(
    (state: RootState) => state.productReducer
  );
  const { arrRoomInformation } = useSelector(
    (state: RootState) => state.roomReducer
  );
  // useEffect(() => {
  //   const action = getProductApi();
  //   dispatch(action);
  // }, []);
  useEffect(() => {
    const action = getRoomInformationApi();
    dispatch(action);
  }, []);
  

  const renderProduct = () => {
    return arrRoomInformation?.map(
      (prod: GetAllRoomInformationModel, index: number) => {
        return (
          <div className="col-sm-4 col-md-3 col-12 p-3 container" key={index}>
            <NavLink
              className="card"
              style={{ overflow: "hidden" }}
              to={`/ChiTietPhong/${prod.id}`}
            >
              <div className="bg-transparent w-100">
                <img src={prod.hinhAnh} alt={prod.hinhAnh} />
              </div>
              <div className="card-body">
                <p>{prod.tenPhong}</p>
                <span>{prod.moTa}</span>
                <p>
                  ${prod.giaTien}
                  <li>đêm</li>
                </p>
              </div>
            </NavLink>
          </div>
        );
      }
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 14,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  let video = document.querySelector(".video");
  let onClickBtn = () => {
    video?.classList.toggle("active-hidden");
  };

  return (
    <section id="index" className="" style={{ overflow: "hidden" }}>
      <div id="top" style={{ position: "relative" }}>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="./img/banner/banner1.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="./img/banner/banner2.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="./img/banner/banner3.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div
          className="btn-play text-center"
          onClick={onClickBtn}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "transLateX(-50%)",
          }}
        >
          <div className="play text-center" style={{ width: 200 }}>
            <div className="icon-play">
              <i className="fa-solid fa-play"></i>
            </div>
            <p className="text-white" style={{ fontSize: 20, fontWeight: 400 }}>
              Play Video
            </p>
          </div>
          <div className="video">
            <video
              src="https://www.youtube.com/embed/uSHSdasYsAU"
              controls
            ></video>
            <p className="close">Close</p>
          </div>
        </div>
      </div>
      {/* end top */}

      <div
        id="middle"
        className="text-dark pt-3 container"
        style={{
          width: "100%",
          height: 120,
          marginTop: 80,
          padding: "0px 20px 0px 20px",
        }}
      >
        <Slider {...settings}>
          <NavLink to="#" className="item-icon1">
            <img src="./img/icon/1.jpg" alt="icon" width="40" height="40" />
            <p>Nhiệt đới</p>
          </NavLink>
          <NavLink to="#" className="item-icon2">
            <img src="./img/icon/2.jpg" alt="icon" width="40" height="40" />
            <p>Lâu đài</p>
          </NavLink>
          <NavLink to="#" className="item-icon3">
            <img src="./img/icon/3.jpg" alt="icon" width="40" height="40" />
            <p>Nông thôn</p>
          </NavLink>
          <NavLink to="#" className="item-icon4">
            <img src="./img/icon/4.jpg" alt="icon" width="40" height="40" />
            <p>Đảo</p>
          </NavLink>
          <NavLink to="#" className="item-icon5">
            <img src="./img/icon/5.jpg" alt="icon" width="40" height="40" />
            <p>Thuyền</p>
          </NavLink>
          <NavLink to="#" className="item-icon6">
            <img src="./img/icon/6.jpg" alt="icon" width="40" height="40" />
            <p>Nhà chung</p>
          </NavLink>
          <NavLink to="#" className="item-icon7">
            <img src="./img/icon/7.jpg" alt="icon" width="40" height="40" />
            <p>Thiết kế</p>
          </NavLink>
          <NavLink to="#" className="item-icon8">
            <img src="./img/icon/8.jpg" alt="icon" width="40" height="40" />
            <p>Khung cảnh tuyệt vời</p>
          </NavLink>
          <NavLink to="#" className="item-icon9">
            <img src="./img/icon/9.jpg" alt="icon" width="40" height="40" />
            <p>Thật ấn tượng!</p>
          </NavLink>
          <NavLink to="#" className="item-icon10">
            <img src="./img/icon/10.jpg" alt="icon" width="40" height="40" />
            <p>Raid</p>
          </NavLink>
          <NavLink to="#" className="item-icon11">
            <img src="./img/icon/11.jpg" alt="icon" width="40" height="40" />
            <p>Grand piano</p>
          </NavLink>
          <NavLink to="#" className="item-icon12">
            <img src="./img/icon/12.jpg" alt="icon" width="40" height="40" />
            <p>Nhà mang tính lịch sử</p>
          </NavLink>
          <NavLink to="#" className="item-icon13">
            <img src="./img/icon/13.jpg" alt="icon" width="40" height="40" />
            <p>Nhà nhỏ</p>
          </NavLink>
          <NavLink to="#" className="item-icon14">
            <img src="./img/icon/14.jpg" alt="icon" width="40" height="40" />
            <p>Biệt thự</p>
          </NavLink>
          <NavLink to="#" className="item-icon15">
            <img src="./img/icon/15.jpg" alt="icon" width="40" height="40" />
            <p>Công viên quốc gia</p>
          </NavLink>
        </Slider>
      </div>
      {/* end middle */}

      <div className="bottom container">
        <div className="row">{renderProduct()}</div>
      </div>
      {/* end bottom */}
    </section>
  );
}
