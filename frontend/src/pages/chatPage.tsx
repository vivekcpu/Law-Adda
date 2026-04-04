import Chat from "../sections/chat";
import Navbar from "../components/navbar";

const ChatPage = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">

            {/* NAVBAR (takes natural height) */}
            <div className="border-b border-gray-200 bg-white">
                <Navbar />
            </div>

            {/* CHAT (completely separate below) */}
            <div className="flex-1 overflow-hidden">
                <Chat />
            </div>

        </div>
    );
};

export default ChatPage;