export default function GradientButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 font-medium text-white shadow-lg transition hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
}