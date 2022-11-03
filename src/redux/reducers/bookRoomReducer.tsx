import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, getStore, http, setCookie, setStore, setStoreJson, USER_LOGIN } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { history } from "../../index";
import { Modal } from "antd";


export interface BookRoomModel {
  id:           number;
  maPhong:      number;
  ngayDen:      Date;
  ngayDi:       Date;
  soLuongKhach: number;
  maNguoiDung:  number;
}

export interface PostBookRoomModel extends BookRoomModel{

}

export interface UpdateBookRoomModel extends BookRoomModel{

}



const initialState: any = {
  arrBookRoom: [],
  bookRoomEdit: {},
};

const bookRoomReducer = createSlice({
  name: "bookRoomReducer",
  initialState,
  reducers: {
    getAllBookRoomAction: (state, action: PayloadAction<BookRoomModel[]>) => {
      state.arrBookRoom = action.payload;
    },
    searchBookRoomAction:(state, action: PayloadAction<any[]>) => {
      state.arrBookRoom = action.payload;
    },
    deleteBookRoomAction: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const deleteBookRoom = state.arrBookRoom.filter(
        (e: { id: number }) => e.id !== id
      );
      state.arrBookRoom = deleteBookRoom;
    },
    getBookRoomByIdAction: (state, action: PayloadAction<any>) => {
      state.bookRoomEdit = action.payload;
    },
  },
});

export const { getAllBookRoomAction , searchBookRoomAction, deleteBookRoomAction, getBookRoomByIdAction} =
bookRoomReducer.actions;

export default bookRoomReducer.reducer;

// ---------------Action Api----------------- //


export const getBookRoomApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/dat-phong");
      const action = getAllBookRoomAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      alert(err.response?.data.content);
    }
  };
};

export const postBookRoomApi = (addBookRoom: PostBookRoomModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/dat-phong", addBookRoom);
      dispatch(getBookRoomApi());
      alert("Thêm mới thành công");
    } catch (err: any) {
      alert(err.response?.data.content);
    }
  };
};

export const searchBookRoomApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let arr: any[] =[];
      const result = await http.get(`/dat-phong/${id}`);
      arr.push(result.data.content)
      const action = searchBookRoomAction(arr);
      dispatch(action);
    } catch (err: any) {
      alert(err.response?.data.message)
      dispatch(getBookRoomApi());
    }
  };
};

export const deleteBookRoomApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.delete(`/dat-phong/${id}`);
      dispatch(deleteBookRoomAction(id));
      alert(result.data.message);
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
};

export const GetBookRoomByIdApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/dat-phong/${id}`);
      const action = getBookRoomByIdAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      console.log(err)
    }
  };
};

export const UpdateBookRoomByIdApi = (bookRoomUpdate : UpdateBookRoomModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(`/dat-phong/${bookRoomUpdate.id}`,bookRoomUpdate);
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
        history.push("/admin/bookRoomManagement")
      };
      dispatch(getBookRoomApi)
      countDown()
      
    } catch (err: any) {
      
    }
  }
}


