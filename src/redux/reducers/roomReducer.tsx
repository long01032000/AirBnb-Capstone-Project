import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";


export interface GetAllRoomInformationModel {
    id:       number;
    tenPhong: string;
    khach:    number;
    phongNgu: number;
    giuong:   number;
    phongTam: number;
    moTa:     string;
    giaTien:  number;
    mayGiat:  boolean;
    banLa:    boolean;
    tivi:     boolean;
    dieuHoa:  boolean;
    wifi:     boolean;
    bep:      boolean;
    doXe:     boolean;
    hoBoi:    boolean;
    banUi:    boolean;
    maViTri:  number;
    hinhAnh:  string;
}



const initialState: any = {
  arrRoomInformation: []
};

const roomReducer = createSlice({
  name: "roomReducer",
  initialState,
  reducers: {
    getAllRoomInformationAction: (state, action: PayloadAction<GetAllRoomInformationModel[]>) => {
      state.arrRoomInformation = action.payload;
    },
  },
});

export const { getAllRoomInformationAction } =
  roomReducer.actions;

export default roomReducer.reducer;

// ---------------Action Api----------------- //


export const getRoomInformationApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/phong-thue");
      const action = getAllRoomInformationAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      alert(err.response?.data.content);
    }
  };
};

