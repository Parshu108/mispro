function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl mt-2">120</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl mt-2">80</p>
        </div>

        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl mt-2">45</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
