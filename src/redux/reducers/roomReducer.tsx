import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";
import { Modal } from "antd";


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

export interface PostRoomInformationModel extends GetAllRoomInformationModel {
}

export interface UpdateRoomInformationModel extends GetAllRoomInformationModel{

}



const initialState: any = {
  arrRoomInformation: [],
  roomInformationEdit: {},
};

const roomReducer = createSlice({
  name: "roomReducer",
  initialState,
  reducers: {
    getAllRoomInformationAction: (state, action: PayloadAction<GetAllRoomInformationModel[]>) => {
      state.arrRoomInformation = action.payload;
    },
    deleteRoomInformationAction: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const deleteRoomInformation = state.arrRoomInformation.filter(
        (e: { id: number }) => e.id !== id
      );
      state.arrRoomInformation = deleteRoomInformation;
    },
    getRoomInformationByLocationCodeAction:  (state, action: PayloadAction<any>) => {
      state.arrRoomInformation = action.payload;
    },
    getRoomInformationByIdAction: (state, action: PayloadAction<any>) => {
      state.roomInformationEdit = action.payload;
    },
  },
  },
);

export const { getAllRoomInformationAction ,deleteRoomInformationAction,getRoomInformationByIdAction,getRoomInformationByLocationCodeAction} =
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

export const postRoomInformationApi = (addRoom: PostRoomInformationModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/phong-thue", addRoom);

      dispatch(getRoomInformationApi());
      alert("Thêm mới thành công");
    } catch (err: any) {
      console.log(addRoom);
      alert(err.response?.data.content);
    }
  };
};

export const deleteRoomInformationApi = (del: { id: number }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/phong-thue/${del.id}`);
      dispatch(deleteRoomInformationAction(del.id));
      alert(result.data.message);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
};

export const getRoomInformationByIdApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/phong-thue/${id}`);
      const action = getRoomInformationByIdAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const getRoomInformationByLocationCodeApi = (id: {id: string}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${id.id}`);
      const action = getRoomInformationByLocationCodeAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const UpdateRoomInformationByIdApi = (roomInformationUpdate: UpdateRoomInformationModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(
        `/phong-thue/${roomInformationUpdate.id}`,
        roomInformationUpdate
      );
      const countDown = () => {
        let secondsToGo = 5;
        const modal = Modal.success({
          title: "Update Success",
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
        const timer = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `This modal will be destroyed after ${secondsToGo} second.`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          modal.destroy();
        }, secondsToGo * 1000);
        history.push("/admin/roomInformation");
      };
      dispatch(getRoomInformationApi());
      countDown();
    } catch (err: any) {}
  };
};


