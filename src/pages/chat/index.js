import { io } from "socket.io-client";
import Manue from "./components/manue";
import ChatList from "./components/chatList";
import ChatArea from "./components/chatArea";
import { useEffect, useState } from "react";

const socket = io("https://appslack.herokuapp.com/");
console.log(socket);

const Index = ({ user, allUsers }) => {
  const [msg, setmsg] = useState([]);
  const [text, setText] = useState("");

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

  const sendMsg = (email) => {
    socket.emit("ROOM:CHAT", {
      msg: JSON.stringify({ text: text, writes: user.email }),
      email: JSON.stringify([
        "papoyan101097@mail.ru",
        "shavarshpapoyan97@gmail.com",
      ]),
      id: null,
    });
  };
  return (
    <main className="flex w-full h-full justify-center shadow-lg rounded-3xl ">
      <Manue />
      <ChatList allUsers={allUsers} />
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
