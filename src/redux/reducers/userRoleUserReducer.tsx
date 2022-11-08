import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, getStoreJson, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";
import { Modal, notification } from "antd";

export interface UserRegisterModel {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}

export interface UserLoginModel {
  email: string;
  password: string;
}

export interface GetAllUserModel {
  [x: string]: any;
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: boolean;
  role: string;
}

export interface CommentUser {
  id:              number;
  maPhong:         number;
  maNguoiBinhLuan: number;
  ngayBinhLuan:    string;
  noiDung:         string;
  saoBinhLuan:     number;
}

export interface AddUserModel extends UserRegisterModel {}

export interface UpdateUserModel extends UserRegisterModel {}

const initialState: any = {
  userRegister: {
    id: 0,
    email: "",
    password: "",
    name: "",
    gender: true,
    phone: "",
    birthday: "",
    role: "",
  },
  userLogin: {
    email: "",
    password: "",
  },
  arrUser: [],
  room: [],
  imageUser: [],
  comment: []
};

const userRoleUserReducer = createSlice({
  name: "userRoleUserReducer",
  initialState,
  reducers: {
    getAllUserAction: (state, action: PayloadAction<GetAllUserModel[]>) => {
      state.imageUser = action.payload;
    },
    deleteUserAction: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const deleteUser = state.arrUser.filter(
        (e: { id: number }) => e.id !== id
      );
      state.arrUser = deleteUser;
    },
    searchUserAction: (state, action: PayloadAction<string>) => {
      state.arrUser = action.payload;
    },
    getUserByIdAction: (state, action: PayloadAction<any>) => {
      state.imageUser = action.payload;
    },
    getRoomAction:(state, action: PayloadAction<any>) => {
      state.room = action.payload;
    },
    getCommentAction: (state, action: PayloadAction<any>) => {
      state.comment = action.payload;
    },
  },
});

export const { getAllUserAction, deleteUserAction, searchUserAction,getUserByIdAction,getRoomAction,getCommentAction } =
userRoleUserReducer.actions;

export default userRoleUserReducer.reducer;

// ---------------Action Api----------------- //


export const GetUserRoleUserByIdApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users/${id}`);
      const action = getUserByIdAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err)
    }
  };
};

export const UpdateUserRoleUserByIdApi = (userUpdate : UpdateUserModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(`/users/${userUpdate.id}`,userUpdate);
      const countDown = () => {
        let secondsToGo = 5;
        const modal = Modal.success({
          title: 'Update Success',
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
        history.push("/Thongtinchitiet")
      };
      countDown()
      
    } catch (err: any) {
        alert(err.response.data.message);
    }
  }
}

export const HistoryBookRoomApi = (room : any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const userLogin = getStoreJson(USER_LOGIN).user;
      const result = await http.get(`/dat-phong/lay-theo-nguoi-dung/${userLogin.id}`,room);
      const action = getRoomAction(result.data.content);
      dispatch(action);
      
    } catch (err: any) {
        alert(err.response.data.message);
    }
  }
}

export const PostComment = (comment : CommentUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const openNotificationWithIconSuccess = (type: "success") => {
        notification[type]({
          message: "Success",
          description: "Add Comment Success",
        });
      };
      const result = await http.post(`/binh-luan`,comment);
      openNotificationWithIconSuccess("success");
    } catch (err: any) {
      const openNotificationWithIconError = (type: "error") => {
        notification[type]({
          message: "Error",
          description: err.response.data.content,
        });
      };
      openNotificationWithIconError("error");
    }
  }
}


export const GetCommentByRoomCode = (roomCode : any) => {
  return async (dispatch: AppDispatch) => {
    try {
     
      const result = await http.get(`/binh-luan/lay-binh-luan-theo-phong/${roomCode}`);
      const action = getCommentAction(result.data.content);
      dispatch(action);
      
    } catch (err: any) {
        alert(err.response.data.message);
    }
  }
}
