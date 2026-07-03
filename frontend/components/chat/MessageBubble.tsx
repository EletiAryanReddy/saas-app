export default function MessageBubble({
  message,
}: any) {

  return (
    <div className="border rounded p-2 mb-2">

      <p className="font-bold">
        {
          message.senderId?._id
        }
      </p>

      <p>
        {message.message}
      </p>

    </div>
  );
}