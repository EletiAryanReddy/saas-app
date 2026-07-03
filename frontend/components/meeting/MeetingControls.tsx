type Props = {
  toggleMic: () => void;
  toggleCamera: () => void;
  shareScreen: () => void;
};

export default function MeetingControls({
  toggleMic,
  toggleCamera,
  shareScreen,
}: Props) {
  return (
    <div className="flex gap-3 p-4">
      <button
        onClick={toggleMic}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Mic
      </button>

      <button
        onClick={toggleCamera}
        className="bg-green-600 px-4 py-2 rounded"
      >
        Camera
      </button>

      <button
        onClick={shareScreen}
        className="bg-purple-600 px-4 py-2 rounded"
      >
        Share Screen
      </button>
    </div>
  );
}