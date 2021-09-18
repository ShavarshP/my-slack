import { io } from "socket.io-client";
import Manue from "./components/manue";
import ChatList from "./components/chatList";
import ChatArea from "./components/chatArea";
import { useEffect, useMemo, useState } from "react";

const socket = io("http://localhost:5000/");

const Index = ({ user, allUsers }) => {
  const chatData = useMemo(() =>
    JSON.parse(user.chatId).map((item) => {
      return {
        emails: item.emails.filter((item2) => item2 !== user.email),
        msg: item.msg,
      };
    })
  );
  const [msg, setmsg] = useState([]);
  const [text, setText] = useState("");
  const [emails, setEmails] = useState("");
  const [selected, setSelected] = useState(null);
  const [chateList, setChatList] = useState(chatData);

  useEffect(() => {
    socket.emit("ROOM:CHAT", {
      msg: "",
      email: user.email,
      id: socket.id,
    });
    socket.on("ROOM:CHAT", (data) => {
      console.log(data);
    });
  }, []);

  const changeHendler = (e) => {
    setText(e.target.value);
  };

  const selectedUser = (data) => {
    console.log([...data, user.email]);
    setSelected([...data, user.email]);
  };

  const sendMsg = () => {
    socket.emit("ROOM:CHAT", {
      msg: JSON.stringify({ text: text, writes: user.email }),
      email: JSON.stringify(selected),
      id: null,
    });
  };
  const allUsersChat = () => {
    setChatList(allUsers);
  };
  const myUsersChat = () => {
    setChatList(chatData);
  };

  return (
    <main className="flex w-full h-full justify-center shadow-lg rounded-3xl ">
      <Manue allUsersChat={allUsersChat} myUsersChat={myUsersChat} />
      <ChatList allUsers={chateList} selectedUser={selectedUser} />
      <ChatArea
        user={user}
        sendMsg={sendMsg}
        msg={msg}
        text={text}
        changeHendler={changeHendler}
      />
    </main>
  );
};

export default Index;
