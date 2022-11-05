import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, getStoreJson, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";
import { Modal } from "antd";

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
  userEdit: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getAllUserAction: (state, action: PayloadAction<GetAllUserModel[]>) => {
      state.arrUser = action.payload;
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
      state.userEdit = action.payload;
    },
  },
});

export const { getAllUserAction, deleteUserAction, searchUserAction,getUserByIdAction } =
  userReducer.actions;

export default userReducer.reducer;

// ---------------Action Api----------------- //
export const registerApi = (userRegister: UserRegisterModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/auth/signup", userRegister);
      //Sau khi đăng nhập thành công => lưu dữ liệu vào localstorage hoặc cookie
      alert("Đăng kí thành công");
      history.push("/login");
      //Sau khi đăng nhập thành công thì dispatch action getProfile
    } catch (err: any) {
      console.log(typeof err.response?.data.content);
      alert(err.response?.data.content);
    }
  };
};

export const loginApi = (userLogin: UserLoginModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/auth/signin", userLogin);
      //Sau khi đăng nhập thành công => lưu dữ liệu vào localstorage hoặc cookie

      alert("Đăng nhập thành công");
      setStoreJson(USER_LOGIN, result.data.content);
      const userRole = result.data.content.user.role
      if (userRole === "ADMIN"){
        history.push("/admin")
      } else {
        history.push("/")
      }
      //Sau khi đăng nhập thành công thì dispatch action getProfile
    } catch (err: any) {
      alert(err.response.data.content);
    }
  };
};

export const getUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/users");
      const action = getAllUserAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      alert(err.response?.data.content);
    }
  };
};

export const postUserApi = (addUser: AddUserModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/users", addUser);
      dispatch(getUserApi());
      alert("Thêm mới thành công");
    } catch (err: any) {
      alert(err.response?.data.content);
    }
  };
};

export const deleteUserApi = (del: { id: number }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/users?id=${del.id}`);
      dispatch(deleteUserAction(del.id));
      alert(result.data.message);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
};

export const searchUserApi = (e: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users/search/${e}`);
      const action = searchUserAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      dispatch(getUserApi());
    }
  };
};

export const GetUserByIdApi = (id: number) => {
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

export const UpdateUserByIdApi = (userUpdate : UpdateUserModel) => {
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
        history.push("/admin/userManagement")
      };
      dispatch(getUserApi)
      countDown()
      
    } catch (err: any) {
      
    }
  }
}
