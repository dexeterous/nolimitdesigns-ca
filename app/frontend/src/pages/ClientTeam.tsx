import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

interface TeamMember {
  id: number;
  member_email: string;
  member_name: string;
  role: string;
  status: string;
  created_at: string;
}

const roles = [
  { value: "admin", label: "Admin", desc: "Full access to all features" },
  { value: "editor", label: "Editor", desc: "Can create and edit requests" },
  { value: "viewer", label: "Viewer", desc: "Can only view requests" },
];

const roleColors: Record<string, string> = {
  admin: "bg-[#ff4f01]/10 text-[#ff4f01]",
  editor: "bg-[#7c3aed]/10 text-[#7c3aed]",
  viewer: "bg-[#0ea5e9]/10 text-[#0ea5e9]",
};

const statusColors: Record<string, string> = {
  active: "bg-[#22c55e]/10 text-[#22c55e]",
  pending: "bg-[#f59e0b]/10 text-[#f59e0b]",
  removed: "bg-[#ef4444]/10 text-[#ef4444]",
};

export default function ClientTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    member_email: "",
    member_name: "",
    role: "editor",
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await client.entities.team_members.query({
        sort: "-created_at",
        limit: 50,
      });
      setMembers(response?.data?.items || []);
    } catch (err) {
      console.error("Failed to load team:", err);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.member_email.trim()) {
      toast.error("Email is required");
      return;
    }

    setSubmitting(true);
    try {
      await client.entities.team_members.create({
        data: {
          member_email: form.member_email,
          member_name: form.member_name || form.member_email.split("@")[0],
          role: form.role,
          status: "pending",
        },
      });
      toast.success("Team member invited!");
      setForm({ member_email: "", member_name: "", role: "editor" });
      setShowInvite(false);
      loadMembers();
    } catch (err) {
      console.error("Failed to invite:", err);
      toast.error("Failed to invite team member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      await client.entities.team_members.update({
        id: String(id),
        data: { role: newRole },
      });
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
      );
      toast.success("Role updated");
    } catch (err) {
      console.error("Failed to update role:", err);
      toast.error("Failed to update role");
    }
  };

  const handleRemove = async (id: number) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    try {
      await client.entities.team_members.delete({ id: String(id) });
      setMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success("Team member removed");
    } catch (err) {
      console.error("Failed to remove:", err);
      toast.error("Failed to remove team member");
    }
  };

  const activeMembers = members.filter((m) => m.status !== "removed");

  return (
    <DashboardLayout type="client">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Team</h1>
          <p className="text-sm text-[rgb(119,119,125)]">
            Manage your team members and their access levels.
          </p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="btn btn-primary !mb-0 !py-2.5 !px-5 text-sm"
        >
          <i className="ri-user-add-line mr-1" /> Invite Member
        </button>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {roles.map((role) => {
          const count = activeMembers.filter((m) => m.role === role.value).length;
          return (
            <div key={role.value} className="bg-white rounded-xl border border-[#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[role.value]}`}>
                  {role.label}
                </span>
                <span className="text-2xl font-bold font-bricolage text-[#101010]">{count}</span>
              </div>
              <p className="text-xs text-[rgb(119,119,125)]">{role.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
              <h2 className="text-xl font-bold font-bricolage text-[#101010]">Invite Team Member</h2>
              <button onClick={() => setShowInvite(false)} className="text-[rgb(119,119,125)] hover:text-[#101010] cursor-pointer">
                <i className="ri-close-line text-xl" />
              </button>
            </div>
            <form onSubmit={handleInvite} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#101010] mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={form.member_email}
                  onChange={(e) => setForm({ ...form, member_email: e.target.value })}
                  placeholder="team@company.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#101010] mb-1.5">Display Name</label>
                <input
                  type="text"
                  value={form.member_name}
                  onChange={(e) => setForm({ ...form, member_name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] bg-[#f9f9f9] text-sm text-[#101010] placeholder:text-[rgb(119,119,125)]/50 focus:outline-none focus:border-[#ff4f01] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#101010] mb-1.5">Role</label>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        form.role === role.value ? "border-[#ff4f01] bg-[#ff4f01]/5" : "border-[#e5e5e5] hover:border-[#ff4f01]/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={form.role === role.value}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="accent-[#ff4f01]"
                      />
                      <div>
                        <p className="text-sm font-medium text-[#101010]">{role.label}</p>
                        <p className="text-xs text-[rgb(119,119,125)]">{role.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary !mb-0 !py-3 !px-8 disabled:opacity-50"
                >
                  {submitting ? "Inviting..." : "Send Invite"}
                </button>
                <button type="button" onClick={() => setShowInvite(false)} className="btn btn-outline !mb-0 !py-3 !px-8">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Members List */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4f01] mx-auto mb-3"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading team...</p>
        </div>
      ) : activeMembers.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <i className="ri-team-line text-4xl text-[rgb(119,119,125)] mb-3 inline-block" />
          <h3 className="text-lg font-semibold text-[#101010] mb-2">No team members yet</h3>
          <p className="text-sm text-[rgb(119,119,125)] mb-4">
            Invite your team to collaborate on design requests.
          </p>
          <button
            onClick={() => setShowInvite(true)}
            className="btn btn-primary !mb-0 !py-2 !px-5 text-sm"
          >
            <i className="ri-user-add-line mr-1" /> Invite Member
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa]">
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Member</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Role</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Joined</th>
                  <th className="text-left text-xs font-medium text-[rgb(119,119,125)] uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeMembers.map((member) => (
                  <tr key={member.id} className="border-b border-[#f0f0f0] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#ff4f01]/20 flex items-center justify-center text-sm font-bold text-[#ff4f01] shrink-0">
                          {(member.member_name || member.member_email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#101010]">{member.member_name || "—"}</p>
                          <p className="text-xs text-[rgb(119,119,125)]">{member.member_email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className={`text-xs font-medium rounded-full px-2.5 py-1 border-0 focus:outline-none cursor-pointer ${roleColors[member.role] || ""}`}
                      >
                        {roles.map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[member.status] || "bg-[#f5f5f5] text-[#666]"}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[rgb(119,119,125)]">
                      {member.created_at ? new Date(member.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => handleRemove(member.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer"
                        title="Remove"
                      >
                        <i className="ri-delete-bin-line text-red-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}