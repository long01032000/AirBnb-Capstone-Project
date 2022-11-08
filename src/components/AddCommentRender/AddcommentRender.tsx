import { Avatar, Button, Comment, Form, Input, List, Tooltip } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { GetCommentByRoomCode, PostComment } from "../../redux/reducers/userRoleUserReducer";
import { getStoreJson, USER_LOGIN } from "../../util/setting";
import { UserOutlined, CheckOutlined } from "@ant-design/icons";
import UserComment from "../UserComment/UserComment";

const { TextArea } = Input;


interface EditorProps {
  submitting: boolean;
}

type Props = {};

export default function AddcommentRender({}: Props) {
  const { imageUser } = useSelector(
    (state: RootState) => state.userRoleUserReducer
  );
  const dispatch: AppDispatch = useDispatch();
  let today = new Date();
  let date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const params = useParams();
  const userLogin = getStoreJson(USER_LOGIN).user;
  const { comment } = useSelector(
    (state: RootState) => state.userRoleUserReducer
  );
  const [submitting, setSubmitting] = useState(false);


  const onFinish = (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      id: 0,
      maPhong: parseInt(params.id as string),
      maNguoiBinhLuan: userLogin.id,
      ngayBinhLuan: date,
      saoBinhLuan: 0,
    };

    console.log("Received values of form: ", values);
    dispatch(PostComment(values));
    dispatch(GetCommentByRoomCode(parseInt(params.id as string)))
  };

  const Editor = ({ submitting }: EditorProps) => (
    <Form onFinish={onFinish}>
      <Form.Item name="noiDung">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
    
      <Comment
        avatar={
          imageUser.length === 0 ? (
            <Avatar size={30} icon={<UserOutlined />}>
              <UserOutlined />
            </Avatar>
          ) : imageUser.avatar !== "" ? (
            <Avatar size={30} src={imageUser.avatar} />
          ) : (
            <Avatar size={30} icon={<UserOutlined />}>
              <UserOutlined />
            </Avatar>
          )
        }
        content={<Editor submitting={submitting} />}
      />
    </>
  );
}
