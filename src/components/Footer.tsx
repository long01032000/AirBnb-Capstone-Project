import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <section id="footer" style={{backgroundColor: "#F7F7F7"}}>
      <div className="container">
        <div className="row">
        <div className="col-3 ">
          <ul>
            <li className="fw-bolder">Giới thiệu</li>
            <li>Phương thức hoạt động của Airbnb</li>
            <li>Trang tin tức</li>
            <li>Nhà đầu tư</li>
            <li>Airbnb Plus</li>
            <li>Airbnb Luxe</li>
            <li>Hotel Tonight</li>
            <li>Airbnb for Work</li>
            <li>Nhờ có Host, mọi thứ điều có thể</li>
            <li>Cơ hội nghề nghiệp</li>
            <li>Thư của nhà sáng lập</li>
          </ul>
        </div>
        <div className="col-3">
          <ul>
            <li className="fw-bolder">Cộng đồng</li>
            <li>Hỗ trợ dân tị nạn Afghanistan</li>
            <li>Airbnb.org: nhà ở cứu trợ</li>
            <li>Chống phân biệt đối xử</li>
          </ul>
        </div>
        <div className="col-3">
          <ul>
            <li className="fw-bolder">Đón tiếp khách</li>
            <li>Thử đón tiếp khách</li>
            <li>Trang tin tức</li>
            <li>NAirCover cho Chủ nhà</li>
            <li>Xem tài nguyên đón tiếp khách</li>
            <li>Truy cập diễn đàn cộng đồng</li>
            <li>Đón tiếp khách có trách nhiệm</li>
          </ul>
        </div>
        <div className="col-3">
          <ul>
            <li className="fw-bolder">Airbnb</li>
            <li>Trang tin tức</li>
            <li>Tìm hiểu các tính năng mới</li>
            <li>Thư ngỏ từ các nhà sáng lập</li>
            <li>Cơ hội nghề nghiệp</li>
            <li>Nhà đầu tư</li>
          </ul>
        </div>
        </div>
      </div>
     <div>
        <hr />
     </div>
     <div className="container text-center">
     © 2022 Airbnb, Inc.·Quyền riêng tư·Điều khoản·Sơ đồ trang web
     </div>
    </section>
  );
}
