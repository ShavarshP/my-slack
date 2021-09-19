const ChatList = ({ allUsers, selectedUser }) => {
  const userList = allUsers.map((item, index) =>
    item.userName ? (
      <li
        key={index}
        className="py-5 border-b px-3 transition hover:bg-indigo-100 cursor-pointer"
        onClick={() => {
          selectedUser([item.email], item.userName, null);
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
        className="py-5 border-b px-3 transition hover:bg-indigo-100 cursor-pointer"
        onClick={() => {
          selectedUser(item.emails, item.name[0], item.msg);
        }}
      >
        <a className=" items-center">
          {item.name.map((mail, index) => (
            <h6 className=" font-semibold" key={index}>
              {mail}
            </h6>
          ))}
        </a>
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
