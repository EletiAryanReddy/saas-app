import MessageBubble
from "./MessageBubble";

export default function ChatWindow({
  messages,
}: any) {

  return (
    <div className="h-[500px] overflow-y-auto border p-3">

      {messages.map(
        (message: any) => (

          <MessageBubble
            key={message._id}
            message={message}
          />

        )
      )}

    </div>
  );
}