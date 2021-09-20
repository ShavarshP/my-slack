import { isSimilar } from "./func/isSimilar";

const ChatList = ({
  allUsers,
  selectedUser,
  selectedUserChat,
  isCommunicate,
  userEmail,
}) => {
  console.log(allUsers);
  const userList = allUsers.map((item, index) =>
    item.userName ? (
      <li
        key={index}
        className={
          item.email === selectedUserChat[0]
            ? "py-5 border-b px-3 bg-indigo-100 transition hover:bg-indigo-200 cursor-pointer"
            : "py-5 border-b px-3 transition hover:bg-indigo-200 cursor-pointer"
        }
        onClick={() => {
          selectedUser([item.email], item.userName, null);
          isCommunicate(true);
        }}
      >
        <a className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{item.userName}</h3>
          <p className="text-md text-gray-400">{"???"}</p>
        </a>
        <div className="text-md italic text-gray-400">{item.email}</div>
      </li>
    ) : (
      <li
        key={index}
        className={
          isSimilar(item.emails, selectedUserChat)
            ? "py-5 border-b px-3 bg-indigo-100 transition hover:bg-indigo-200 cursor-pointer"
            : "py-5 border-b px-3 transition hover:bg-indigo-100 cursor-pointer"
        }
        onClick={() => {
          selectedUser(item.emails, item.name[0], item.msg);
          isCommunicate(item.writes.some((item3) => item3 === userEmail));
        }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-md text-gray-400">
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </p>
        </div>
      </li>
    )
  );
  return (
    <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll mt-4 min-h-screen">
      <label className="px-3">
        <input
          className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
          placeholder="Search..."
        />
      </label>

      <ul className="mt-6 max-h-screen">{userList}</ul>
    </section>
  );
};

export default ChatList;
