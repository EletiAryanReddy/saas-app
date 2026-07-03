export default function StatCard({
  title,
  value,
  icon,
}: any) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {value ?? 0}
          </h2>
        </div>

        <div className="text-3xl">
          {icon}
        </div>
      </div>
    </div>
  );
}