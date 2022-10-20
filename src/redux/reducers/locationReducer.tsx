import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";


export interface GetAllLocationModel {
    id:        number;
    tenViTri:  string;
    tinhThanh: string;
    quocGia:   string;
    hinhAnh:   string;
}

export interface PostLocationModel extends GetAllLocationModel{

}



const initialState: any = {
  arrLocation: []
};

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {
    getAllLocationAction: (state, action: PayloadAction<GetAllLocationModel[]>) => {
      state.arrLocation = action.payload;
    },
  },
});

export const { getAllLocationAction } =
  locationReducer.actions;

export default locationReducer.reducer;

// ---------------Action Api----------------- //


export const getLocationApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/vi-tri");
      const action = getAllLocationAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      alert(err.response?.data.content);
    }
  };
};

export const postLocationApi = (addLocation: PostLocationModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/vi-tri", addLocation);
      dispatch(getLocationApi());
      alert("Thêm mới thành công");
    } catch (err: any) {
      alert(err.response?.data.content);
    }
  };
};
