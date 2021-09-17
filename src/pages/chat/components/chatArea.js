const ChatArea = () => {
  const obj = {
    name: "Akhil Gautam",
    email: "akhil.gautam123@gmail.com",
    msg: [
      { my: true, msg: "malde" },
      { my: false, msg: "malde mal ad sdfsd adsf adsf sadfasdf sadfa dasf" },
      {
        my: true,
        msg: " adsf dsaf sad f dsaf  dsaf  dsfadasf  dasadsfads adsfalde",
      },
      {
        my: true,
        msg: " adsf dsaf sad f dsaf  dsaf  dsfadasf  dasadsfads adsfalde",
      },
      {
        my: true,
        msg: " adsf dsaf sad f dsaf  dsaf  dsfadasf  dasadsfads adsfalde",
      },
      {
        my: false,
        msg: " adsf dsaf sad f dsaf  dsaf  dsfadasf  dasadsfads adsfalde",
      },
      {
        my: true,
        msg: " adsf dsaf sad f dsaf  dsaf  dsfadasf  dasadsfads adsfalde",
      },
    ],
  };

  const msgList = obj.msg.map((item) => (
    <li className="py-5 border-b px-3 transition ">
      <span className="mr-4 ">{item.my ? "" : obj.name}</span>
      <p className={item.my ? "bg-gray-100 text-right" : "bg-green-50"}>
        {item.msg}
      </p>
    </li>
  ));
  return (
    <section className="w-6/12 px-4 flex flex-col bg-white rounded-r-3xl">
      <div className="flex justify-between items-center h-48 border-b-2 mb-8">
        <div className="flex space-x-4 items-center">
          <div className="flex justify-center items-center h-12 w-12 rounded-full overflow-hidden bg-red-400  ">
            <h2 className="font-semibold text-lg">{obj.name[0]}</h2>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{obj.name}</h3>
            <p className="text-light text-gray-400">{obj.email}</p>
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
      <section className="flex flex-col pt-1  bg-gray-50 h-full overflow-y-scroll">
        <ul className="max-h-28">{msgList}</ul>
      </section>
      <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
        <textarea
          className="w-full bg-gray-50 p-2 rounded-xl"
          placeholder="Type your reply here..."
          rows="3"
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
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl">
            Reply
          </button>
        </div>
      </section>
    </section>
  );
};
export default ChatArea;
