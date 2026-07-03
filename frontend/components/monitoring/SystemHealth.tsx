export default function SystemHealth({
  health,
}: any) {
  const data = health || {};

  return (
    <div className="border rounded p-4 bg-white">
      <h2 className="font-bold mb-3">
        System Health
      </h2>

      <p>CPU: {data.cpuUsage || 0}%</p>
      <p>Memory: {data.memoryUsage || 0}%</p>
      <p>Storage: {data.storageUsage || 0} MB</p>
      <p>Active Users: {data.activeUsers || 0}</p>
    </div>
  );
}