// import { display } from "@mui/system";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { http } from "../../util/setting";

import { AppDispatch } from "../configStore";

export interface ProductModel {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface ProductModelRoom {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}
const initialState: any = {
  arrProductViTri: [],
  arrProductRoom: {},
  arrProductAllRoom: [],

};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductViTriAction: (
      state,
      action: PayloadAction<ProductModel[]>
    ) => {
      {
        state.arrProductViTri = action.payload;
        return state;
      }
    },
    getAllProductRoomAction: (
      state,
      action: PayloadAction<ProductModelRoom[]>
    ) => {
      {
        state.arrProductRoom = action.payload;
        return state;
      }
    },
    getAllRoomAction:(
      state, action: PayloadAction<ProductModelRoom[]>
    ) => {
      state.arrProductAllRoom = action.payload;
      return state;
    }
  },
});

export const { getAllProductViTriAction, getAllProductRoomAction, getAllRoomAction } =
  productReducer.actions;

export default productReducer.reducer;

export const getProductApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/vi-tri");
      // Sau khi lất kết quả về đưa lên product
      let arrProduct: ProductModel[] = result.data.content;
      const action = getAllProductViTriAction(arrProduct);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductRoom = (id:number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/phong-thue/${id}`
      );
      let arrProductList: ProductModelRoom[] = result.data.content;
      const action = getAllProductRoomAction(arrProductList);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};


export const getProductAllRoom = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/phong-thue");
      // Sau khi lất kết quả về đưa lên product
      let arrProduct: ProductModelRoom[] = result.data.content;
      const action = getAllRoomAction(arrProduct);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};
