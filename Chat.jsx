import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import PotentialChats from "../components/chat/PotentialChats";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import ChatBox from "../components/chat/ChatBox";


const Chat = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat, currentChat } = useContext(ChatContext);

    return (
        <Container>
            <PotentialChats />
            {userChats?.length < 1 ? null: (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                        {isUserChatsLoading && <p>Loading chats...</p>}
                        {userChats?.map((chat, index) => (
                            <div key={index} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))}
                    </Stack>
                    <ChatBox />
                </Stack>
            )}
        </Container>
    );
};

export default Chat;
