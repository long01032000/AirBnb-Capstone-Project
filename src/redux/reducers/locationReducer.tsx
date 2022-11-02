import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  config,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";
import axios from "axios";
import { Modal } from "antd";
import { RcFile } from "antd/lib/upload";

export interface GetAllLocationModel {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface PostLocationModel extends GetAllLocationModel {}

export interface UpdateLocationModel extends GetAllLocationModel {}

export interface UploadLocationImageModel {
  maViTri: string;
  formFile: any;
}

const initialState: any = {
  arrLocation: [],
  locationEdit: {},
};

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {
    getAllLocationAction: (
      state,
      action: PayloadAction<GetAllLocationModel[]>
    ) => {
      state.arrLocation = action.payload;
    },
    deleteLocationAction: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const deleteLocation = state.arrLocation.filter(
        (e: { id: number }) => e.id !== id
      );
      state.arrLocation = deleteLocation;
    },
    getLocationByIdAction: (state, action: PayloadAction<any>) => {
      state.locationEdit = action.payload;
    },
  },
});

export const {
  getAllLocationAction,
  deleteLocationAction,
  getLocationByIdAction,
} = locationReducer.actions;

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
      console.log(addLocation);
      alert(err.response?.data.content);
    }
  };
};

export const deleteLocationApi = (del: { id: number }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/vi-tri/${del.id}`);
      // const result = await axios({
      //   url: `https://airbnbnew.cybersoft.edu.vn/api/vi-tri/${del.id}`,
      //   method: "DELETE",
      //   data:"body",
      //   headers: {
      //     //headers là các phần dữ liệu mặc định gửi đi
      //     token: `${token}`,
      //     TokenCybersoft: TOKEN_CYBERSOFT,
      //   },
      // });
      dispatch(deleteLocationAction(del.id));
      alert(result.data.message);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
};

export const uploadLocationImageApi = async (data: UploadLocationImageModel) => {
  // return async (dispatch: AppDispatch) => {
   
    try {
      
      const result = await http.post(`/vi-tri/upload-hinh-vitri?maViTri=${data.maViTri}`, data)
    } catch (err: any) {
      console.log(err);
    }
  // };
};

export const getLocationByIdApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/vi-tri/${id}`);
      const action = getLocationByIdAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const UpdateLocationByIdApi = (locationUpdate: UpdateLocationModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(
        `/vi-tri/${locationUpdate.id}`,
        locationUpdate
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
        history.push("/admin/locationInformation");
      };
      dispatch(getLocationApi());
      countDown();
    } catch (err: any) {}
  };
};
