import Manue from "./components/manue";
import ChatList from "./components/chatList";
import ChatArea from "./components/chatArea";

const Index = () => {
  return (
    <main class="flex w-full h-full shadow-lg rounded-3xl">
      <Manue />
      <ChatList />
      <ChatArea />
    </main>
  );
};

export default Index;
