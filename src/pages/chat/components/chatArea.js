import { useEffect, useState } from "react";
import { loadState } from "../../../helpers/localStorage";
import { useHttp } from "../../../hooks/useHttp";
import ChatManage from "./chatManage";

const URL = "https://appslack.herokuapp.com/api/get_photo/";

const ChatArea = ({
  user,
  sendMsg,
  msg,
  text,
  changeHendler,
  group,
  selected,
  addGroup,
  groupData,
  sendFirstGroupMsg,
  groupName,
  changeGroupName,
  myPage,
  removeFromList,
  changeWriterStatus,
  communicate,
}) => {
  const [myPhoto, setMyPoto] = useState(user.userName[0]);

  const { request } = useHttp();
  const getPhoto = async () => {
    try {
      const token = await loadState("auth");

      const newData = await request(URL + token.userId, "get", null, {
        Authorization: `Bearer ${token.token}`,
      });
      const photo = JSON.parse(newData.photo)[0];
      console.log("maladec", JSON.parse(newData.photo)[0]);
      setMyPoto(
        photo ? (
          <div className="w-16">
            <img src={photo} />
          </div>
        ) : (
          myPhoto
        )
      );
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const msgList = msg.map((item, index) => {
    item = JSON.parse(item);
    return (
      <li key={index} className="py-5 border-b px-3 transition ">
        <span className="mr-4 ">
          {user.email === item.writes ? "" : item.writes}
        </span>
        <p
          className={
            user.email === item.writes
              ? "bg-gray-100 text-right"
              : "bg-green-50"
          }
        >
          {item.text}
        </p>
      </li>
    );
  });
  return (
    <section className="w-6/12 px-4 flex flex-col bg-white rounded-r-3xl">
      <div className="flex justify-between items-center h-48 border-b-2 mb-8">
        <div
          onClick={myPage}
          className="flex space-x-4 items-center cursor-pointer"
        >
          <div className="flex justify-center items-center h-14 w-14 rounded-full overflow-hidden bg-gray-200 border-2 border-green-800 ">
            <h2 className="font-semibold text-lg">{myPhoto}</h2>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{user.userName}</h3>
            <p className="text-light text-gray-400">{user.email}</p>
          </div>
        </div>
        <div>
          <ul className="flex text-gray-400 space-x-4">
            <li className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </li>
            <li className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
      {!group && selected ? (
        <>
          <section
            className="flex flex-col pt-1  bg-gray-50 h-full overflow-y-scroll"
            style={{ scrollPaddingBottom: "10px" }}
          >
            <ul className="max-h-32 ">{msgList}</ul>
          </section>
          {communicate ? (
            <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
              <textarea
                className="w-full bg-gray-50 p-2 rounded-xl"
                placeholder="Type your reply here..."
                rows="3"
                onChange={changeHendler}
                value={text}
              ></textarea>
              <div className="flex items-center justify-between p-2">
                <button className="h-6 w-6 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => sendMsg()}
                  className="bg-purple-600 text-white px-6 py-2 rounded-xl"
                >
                  Reply
                </button>
              </div>
            </section>
          ) : (
            <></>
          )}
        </>
      ) : (
        <section className="flex flex-col pt-1  bg-gray-50 h-full ">
          <ChatManage
            group={group}
            addGroup={addGroup}
            groupData={groupData}
            sendFirstGroupMsg={sendFirstGroupMsg}
            groupName={groupName}
            changeGroupName={changeGroupName}
            removeFromList={removeFromList}
            changeWriterStatus={changeWriterStatus}
          />
        </section>
      )}
    </section>
  );
};
export default ChatArea;
