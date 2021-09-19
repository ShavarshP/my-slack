import { io } from "socket.io-client";
import Manue from "./components/manue";
import ChatList from "./components/chatList";
import ChatArea from "./components/chatArea";
import { useEffect, useMemo, useState } from "react";
import { isSimilar } from "./components/func/isSimilar";

const socket = io("https://appslack.herokuapp.com/");

const Index = ({ user, allUsers, verify }) => {
  const [msg, setmsg] = useState([]);
  const [text, setText] = useState("");
  const [group, setGroup] = useState(false);
  const [selected, setSelected] = useState(null);

  const [groupData, setGroupData] = useState([
    {
      name: ["group"],
      writes: [user.email],
    },
    user.email,
  ]);
  const chatData = useMemo(
    () =>
      JSON.parse(user.chatId).map((item) => {
        return {
          emails: item.emails.filter((item2) => item2 !== user.email),
          name: item.options.name.filter((item2) => item2 !== user.userName),
          msg: item.msg,
        };
      }),
    [user]
  );
  const [chateList, setChatList] = useState(chatData);

  useEffect(() => {
    socket.emit("ROOM:CHAT", {
      msg: "",
      email: user.email,
      id: socket.id,
    });
    socket.on("ROOM:CHAT", (data) => {
      if (data) {
        verify();
      }
    });
  }, []);

  const selectedUser = (email, name, msg) => {
    if (group) {
      if (
        groupData.slice(1).some((item) => item === email[0]) ||
        email.length > 1
      ) {
        return;
      }
      setGroupData([
        {
          name: [...groupData[0].name],
          writes: [...groupData[0].writes, ...email],
        },
        ...groupData.slice(1),
        ...email,
      ]);
      return;
    }
    console.log(email, name, msg);
    setSelected([
      { name: [name, user.userName], writes: [...email, user.email] },
      ...email,
      user.email,
    ]);
    if (msg) {
      setmsg(msg);
    } else {
      setmsg([]);
    }
  };

  const changeHendler = (e) => {
    setText(e.target.value);
  };

  const sendMsg = () => {
    if (text) {
      socket.emit("ROOM:CHAT", {
        msg: JSON.stringify({ text: text, writes: user.email }),
        email: JSON.stringify(selected),
        id: null,
      });
    }
    setText("");
  };

  const allUsersChat = () => {
    setChatList(allUsers);
  };

  const myUsersChat = () => {
    setChatList(chatData);
  };

  useEffect(() => {
    if (selected) {
      console.log(JSON.parse(user.chatId));
      JSON.parse(user.chatId).forEach((element) => {
        if (isSimilar(element.emails, selected.slice(1))) {
          if (msg) {
            setmsg(element.msg);
          } else {
            setmsg([]);
          }
        }
      });
    }
    setChatList(chatData);
  }, [chatData]);

  const sendFirstGroupMsg = () => {
    socket.emit("ROOM:CHAT", {
      msg: JSON.stringify({ text: "you joined the group", writes: "Slack" }),
      email: JSON.stringify(groupData),
      id: null,
    });
    setGroup(!group);
  };

  const addGroup = () => {
    setGroup(!group);
    setGroupData([
      {
        name: ["group"],
        writes: [user.email],
      },
      user.email,
    ]);
  };

  const changeGroupName = (e) => {
    setGroupData([
      {
        name: [e.target.value],
        writes: [...groupData[0].writes],
      },
      ...groupData.slice(1),
    ]);
  };

  const myPage = () => {
    setSelected(null);
  };

  const removeFromList = (email) => {
    console.log(email);
    setGroupData([
      {
        name: [...groupData[0].name],
        writes: [...groupData[0].writes.filter((item) => item !== email)],
      },
      ...groupData.slice(1).filter((item) => item !== email),
    ]);
  };

  const changeWriterStatus = (email) => {
    console.log(email);
    setGroupData([
      {
        name: [...groupData[0].name],
        writes: groupData[0].writes.some((item) => item === email)
          ? groupData[0].writes.filter((item) => item !== email)
          : [...groupData[0].writes, email],
      },
      ...groupData.slice(1),
    ]);
  };

  return (
    <main className="flex w-full h-full justify-center shadow-lg rounded-3xl ">
      <Manue
        allUsersChat={allUsersChat}
        myUsersChat={myUsersChat}
        verify={verify}
      />
      <ChatList allUsers={chateList} selectedUser={selectedUser} />
      <ChatArea
        user={user}
        sendMsg={sendMsg}
        msg={msg}
        text={text}
        changeHendler={changeHendler}
        group={group}
        selected={selected}
        addGroup={addGroup}
        groupData={groupData}
        sendFirstGroupMsg={sendFirstGroupMsg}
        groupName={groupData[0].name[0]}
        changeGroupName={changeGroupName}
        myPage={myPage}
        removeFromList={removeFromList}
        changeWriterStatus={changeWriterStatus}
      />
    </main>
  );
};

export default Index;
