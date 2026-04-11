import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

const stats = [
  { label: "Active Requests", value: "12", icon: "ri-file-list-3-line", color: "bg-[#ff4f01]" },
  { label: "In Progress", value: "5", icon: "ri-loader-4-line", color: "bg-[#7c3aed]" },
  { label: "Completed", value: "48", icon: "ri-check-double-line", color: "bg-[#22c55e]" },
  { label: "Pending Feedback", value: "3", icon: "ri-chat-3-line", color: "bg-[#0ea5e9]" },
];

const recentRequests = [
  { id: "REQ-001", title: "Social Media Campaign Graphics", brand: "TechCo", status: "In Progress", designer: "Sarah M.", updated: "2 hours ago" },
  { id: "REQ-002", title: "Email Newsletter Header", brand: "FoodBrand", status: "Review", designer: "Alex K.", updated: "4 hours ago" },
  { id: "REQ-003", title: "Landing Page Redesign", brand: "TechCo", status: "Queued", designer: "Unassigned", updated: "1 day ago" },
  { id: "REQ-004", title: "Product Packaging Label", brand: "EcoGoods", status: "Completed", designer: "Maria L.", updated: "1 day ago" },
  { id: "REQ-005", title: "Brand Guidelines Update", brand: "TechCo", status: "In Progress", designer: "Sarah M.", updated: "2 days ago" },
];

const activityFeed = [
  { icon: "ri-upload-2-line", text: "Sarah M. uploaded files for Social Media Campaign Graphics", time: "2 hours ago", color: "text-[#7c3aed]" },
  { icon: "ri-chat-3-line", text: "You requested revisions on Email Newsletter Header", time: "4 hours ago", color: "text-[#0ea5e9]" },
  { icon: "ri-check-line", text: "Product Packaging Label was marked as completed", time: "1 day ago", color: "text-[#22c55e]" },
  { icon: "ri-add-circle-line", text: "You submitted Landing Page Redesign", time: "1 day ago", color: "text-[#ff4f01]" },
  { icon: "ri-upload-2-line", text: "Alex K. uploaded files for Brand Guidelines Update", time: "2 days ago", color: "text-[#7c3aed]" },
];

const statusColors: Record<string, string> = {
  Queued: "bg-[#f5f5f5] text-[#666]",
  "In Progress": "bg-[#7c3aed]/10 text-[#7c3aed]",
  Review: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
  Completed: "bg-[#22c55e]/10 text-[#22c55e]",
};

export default function ClientDashboard() {
  return (
    <DashboardLayout type="client">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Dashboard</h1>
        <p className="text-sm text-[rgb(119,119,125)]">Welcome back, John. Here's your design activity overview.</p>
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
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-xl border border-[#e5e5e5]">
          <div className="flex items-center justify-between p-5 border-b border-[#e5e5e5]">
            <h2 className="text-lg font-semibold font-bricolage text-[#101010]">Recent Requests</h2>
            <Link to="/client/requests" className="text-sm text-[#ff4f01] font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Request</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Brand</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Designer</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-sm font-medium text-[#101010]">{req.title}</p>
                        <p className="text-xs text-[rgb(119,119,125)]">{req.id}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-[#101010]">{req.brand}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm text-[rgb(119,119,125)]">{req.designer}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs text-[rgb(119,119,125)]">{req.updated}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-[#e5e5e5]">
          <div className="p-5 border-b border-[#e5e5e5]">
            <h2 className="text-lg font-semibold font-bricolage text-[#101010]">Activity</h2>
          </div>
          <div className="p-5 space-y-5">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0`}>
                  <i className={`${item.icon} ${item.color} text-sm`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#101010] leading-5">{item.text}</p>
                  <p className="text-xs text-[rgb(119,119,125)] mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}