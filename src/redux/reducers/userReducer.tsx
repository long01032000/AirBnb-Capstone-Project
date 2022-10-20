import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";

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
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: boolean;
  role: string;
}

export interface AddUserModel extends UserRegisterModel {}

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
      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);

      setStore(ACCESS_TOKEN, result.data.content.accessToken);
      alert("Đăng nhập thành công");
      history.push("/home");
      setStoreJson(USER_LOGIN, result.data.content);
      //Sau khi đăng nhập thành công thì dispatch action getProfile
    } catch (err: any) {
      console.log(typeof err.response?.data.content);
      alert(err.response?.data.content);
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

export const GetUserByIdApi = (userId:  { id: number }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/users/${userId?.id}`);
      const action = getUserByIdAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err)
    }
  };
};
