import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { Avatar, Comment, List, Tooltip } from "antd";
import moment from "moment";
import React, { createElement, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
import { CommentUser } from "../../redux/reducers/userRoleUserReducer";

type Props = {};

export default function UserComment({}: Props) {
  const { comment } = useSelector(
    (state: RootState) => state.userRoleUserReducer
  );
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];
  return (
    <>
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={comment}
        renderItem={(item: any) => (
          <li className="w-50">
            <Comment
              actions={actions}
              author={<p>{item.tenNguoiBinhLuan}</p>}
              avatar={<Avatar src={item.avatar} alt="..." />}
              content={<p>{item.noiDung}</p>}
              datetime={<>{moment(item.ngayBinhLuan).fromNow()}</>}
            />
          </li>
          // <>
          //  {comment.map((prod: any, key:number)=> {
          //   return <Comment key={key}
          //   actions={actions}
          //   author={<p>{prod.tenNguoiBinhLuan}</p>}
          //   avatar={
          //     <Avatar src={prod.avatar} alt="..." />
          //   }
          //   content={
          //     <p>
          //      {prod.noiDung}
          //     </p>
          //   }
          //   datetime={<>
          //     {moment(prod.ngayBinhLuan).fromNow()}
          //     </>
          //   }
          // />
          // })}
          // </>
        )}
      />
    </>
  );
}
