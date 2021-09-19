const ChatManage = ({
  group,
  addGroup,
  groupData,
  sendFirstGroupMsg,
  groupName,
  changeGroupName,
  removeFromList,
}) => {
  console.log(groupData);

  const participants = groupData.slice(1).map((item, index) => (
    <li key={index} className="py-2 border-b h-12 px-3 transition  ">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{item}</h3>
        {index === 0 ? (
          <></>
        ) : (
          <p
            onClick={() => {
              removeFromList(item);
            }}
            className="text-md w-12 h-12 cursor-pointer p-3 relative -top-2 rounded-lg border-b-4 border-l-2 text-gray-400  hover:bg-yellow-200 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </p>
        )}
      </div>
    </li>
  ));

  return (
    <>
      {!group ? (
        <div
          onClick={addGroup}
          className="flex flex-row-reverse flex-wrap m-auto relative -top-16"
        >
          <button className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-900 text-white">
            + Add Group
          </button>
          <button
            className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-50 "
            href=""
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <ul className="mt-6 max-h-screen">{participants}</ul>
          <label className="flex justify-center py-4">
            <input
              className="w-2/3 rounded-lg h-12 p-4 bg-gray-100 transition duration-200 ring-1 focus:outline-none focus:ring-2 "
              placeholder="Group name"
              value={groupName}
              onChange={changeGroupName}
            />
          </label>
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (groupName && groupData.length > 3) {
                  sendFirstGroupMsg();
                }
              }}
              className=" w-1/3 rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-900 text-white"
            >
              + Create
            </button>

            <button
              onClick={addGroup}
              className=" w-1/3 rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-gray-200 border-gray-300 "
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ChatManage;
