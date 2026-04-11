import { DashboardLayout } from "@/components/DashboardLayout";

const stats = [
  { label: "Total Active Requests", value: "34", icon: "ri-file-list-3-line", color: "bg-[#ff4f01]", change: "+5 today" },
  { label: "Requests in Queue", value: "12", icon: "ri-time-line", color: "bg-[#f59e0b]", change: "+3 today" },
  { label: "Designers Online", value: "8", icon: "ri-team-line", color: "bg-[#22c55e]", change: "of 10 total" },
  { label: "Completed Today", value: "7", icon: "ri-check-double-line", color: "bg-[#0ea5e9]", change: "+2 vs yesterday" },
];

const recentActivity = [
  { client: "TechCo", request: "Social Media Campaign", designer: "Sarah M.", status: "In Progress", time: "10 min ago" },
  { client: "FoodBrand", request: "Email Newsletter", designer: "Alex K.", status: "Review", time: "30 min ago" },
  { client: "EcoGoods", request: "Product Packaging", designer: "Maria L.", status: "Completed", time: "1 hour ago" },
  { client: "TechCo", request: "Pitch Deck Design", designer: "Alex K.", status: "In Progress", time: "2 hours ago" },
  { client: "StartupX", request: "Logo Design", designer: "Sarah M.", status: "Queue", time: "3 hours ago" },
];

const designerWorkload = [
  { name: "Sarah M.", active: 5, completed: 12, avatar: "S" },
  { name: "Alex K.", active: 4, completed: 9, avatar: "A" },
  { name: "Maria L.", active: 3, completed: 15, avatar: "M" },
  { name: "James R.", active: 2, completed: 8, avatar: "J" },
];

const statusColors: Record<string, string> = {
  Queue: "bg-[#f5f5f5] text-[#666]",
  "In Progress": "bg-[#7c3aed]/10 text-[#7c3aed]",
  Review: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Completed: "bg-[#22c55e]/10 text-[#22c55e]",
};

const weeklyData = [
  { day: "Mon", requests: 8 },
  { day: "Tue", requests: 12 },
  { day: "Wed", requests: 6 },
  { day: "Thu", requests: 15 },
  { day: "Fri", requests: 10 },
  { day: "Sat", requests: 3 },
  { day: "Sun", requests: 1 },
];

const maxRequests = Math.max(...weeklyData.map((d) => d.requests));

export default function AdminDashboard() {
  return (
    <DashboardLayout type="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Admin Dashboard</h1>
        <p className="text-sm text-[rgb(119,119,125)]">Overview of all design operations.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-[#e5e5e5] hover:border-[#ff4f01]/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-lg`} />
              </div>
            </div>
            <p className="text-3xl font-bold font-bricolage text-[#101010]">{stat.value}</p>
            <p className="text-sm text-[rgb(119,119,125)] mt-1">{stat.label}</p>
            <p className="text-xs text-[#ff4f01] mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Requests Per Day Chart */}
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
          <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-4">Requests Per Day</h2>
          <div className="flex items-end gap-3 h-48">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-medium text-[#101010]">{d.requests}</span>
                <div
                  className="w-full bg-gradient-to-t from-[#ff4f01] to-[#ff8c42] rounded-t-md transition-all duration-500"
                  style={{ height: `${(d.requests / maxRequests) * 100}%`, minHeight: "8px" }}
                />
                <span className="text-xs text-[rgb(119,119,125)]">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Designer Workload */}
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-5">
          <h2 className="text-lg font-semibold font-bricolage text-[#101010] mb-4">Designer Workload</h2>
          <div className="space-y-4">
            {designerWorkload.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#ff4f01]/20 flex items-center justify-center text-sm font-bold text-[#ff4f01] shrink-0">
                  {d.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#101010]">{d.name}</span>
                    <span className="text-xs text-[rgb(119,119,125)]">{d.active} active</span>
                  </div>
                  <div className="w-full bg-[#f5f5f5] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#ff4f01] to-[#ff8c42] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(d.active / 8) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-[#e5e5e5]">
        <div className="p-5 border-b border-[#e5e5e5]">
          <h2 className="text-lg font-semibold font-bricolage text-[#101010]">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Client</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Designer</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item, i) => (
                <tr key={i} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-[#101010]">{item.client}</td>
                  <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{item.request}</td>
                  <td className="px-5 py-3.5 text-sm text-[rgb(119,119,125)]">{item.designer}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}