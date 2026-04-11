import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { client } from "@/lib/api";
import { toast } from "sonner";

interface NotificationPrefs {
  email_status_changes: boolean;
  email_comments: boolean;
  email_assignments: boolean;
  email_files: boolean;
  email_weekly_summary: boolean;
}

const defaultPrefs: NotificationPrefs = {
  email_status_changes: true,
  email_comments: true,
  email_assignments: true,
  email_files: true,
  email_weekly_summary: false,
};

const notificationTypes = [
  {
    key: "email_status_changes" as const,
    label: "Status Changes",
    description: "Get notified when your request status changes (e.g., In Progress, In Review, Completed)",
    icon: "ri-refresh-line",
    iconColor: "#7c3aed",
  },
  {
    key: "email_comments" as const,
    label: "New Comments",
    description: "Get notified when someone adds a comment to your request",
    icon: "ri-chat-3-line",
    iconColor: "#0ea5e9",
  },
  {
    key: "email_assignments" as const,
    label: "Designer Assignments",
    description: "Get notified when a designer is assigned to your request",
    icon: "ri-user-star-line",
    iconColor: "#ff4f01",
  },
  {
    key: "email_files" as const,
    label: "File Uploads",
    description: "Get notified when new files or deliverables are uploaded to your request",
    icon: "ri-file-download-line",
    iconColor: "#22c55e",
  },
  {
    key: "email_weekly_summary" as const,
    label: "Weekly Summary",
    description: "Receive a weekly email summary of all your active requests and updates",
    icon: "ri-calendar-check-line",
    iconColor: "#f59e0b",
  },
];

export default function ClientNotificationSettings() {
  const [prefs, setPrefs] = useState<NotificationPrefs>(defaultPrefs);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPrefs();
  }, []);

  const loadPrefs = async () => {
    try {
      const response = await client.apiCall.invoke({
        url: "/api/v1/notifications/preferences",
        method: "GET",
      });
      if (response?.data) {
        setPrefs({ ...defaultPrefs, ...response.data });
      }
    } catch {
      // Use defaults
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key: keyof NotificationPrefs) => {
    const newValue = !prefs[key];
    const updatedPrefs = { ...prefs, [key]: newValue };
    setPrefs(updatedPrefs);

    setSaving(true);
    try {
      await client.apiCall.invoke({
        url: "/api/v1/notifications/preferences",
        method: "PUT",
        data: { [key]: newValue },
      });
      toast.success(`${newValue ? "Enabled" : "Disabled"} ${notificationTypes.find((n) => n.key === key)?.label || key}`);
    } catch {
      // Revert
      setPrefs((prev) => ({ ...prev, [key]: !newValue }));
      toast.error("Failed to update preference");
    } finally {
      setSaving(false);
    }
  };

  const handleEnableAll = async () => {
    const allEnabled: NotificationPrefs = {
      email_status_changes: true,
      email_comments: true,
      email_assignments: true,
      email_files: true,
      email_weekly_summary: true,
    };
    setPrefs(allEnabled);
    setSaving(true);
    try {
      await client.apiCall.invoke({
        url: "/api/v1/notifications/preferences",
        method: "PUT",
        data: allEnabled,
      });
      toast.success("All notifications enabled");
    } catch {
      toast.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  const handleDisableAll = async () => {
    const allDisabled: NotificationPrefs = {
      email_status_changes: false,
      email_comments: false,
      email_assignments: false,
      email_files: false,
      email_weekly_summary: false,
    };
    setPrefs(allDisabled);
    setSaving(true);
    try {
      await client.apiCall.invoke({
        url: "/api/v1/notifications/preferences",
        method: "PUT",
        data: allDisabled,
      });
      toast.success("All notifications disabled");
    } catch {
      toast.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  const enabledCount = Object.values(prefs).filter(Boolean).length;

  return (
    <DashboardLayout type="client">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-bricolage text-[#101010]">Notification Settings</h1>
        <p className="text-sm text-[rgb(119,119,125)]">
          Configure how and when you receive email notifications about your design requests.
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[#e5e5e5] p-10 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4f01] mx-auto mb-3"></div>
          <p className="text-sm text-[rgb(119,119,125)]">Loading preferences...</p>
        </div>
      ) : (
        <div className="max-w-2xl space-y-6">
          {/* Email Notifications Section */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-[#e5e5e5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff4f01]/10 flex items-center justify-center">
                  <i className="ri-mail-send-line text-[#ff4f01] text-lg" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#101010]">Email Notifications</h2>
                  <p className="text-xs text-[rgb(119,119,125)]">
                    {enabledCount} of {notificationTypes.length} enabled
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEnableAll}
                  disabled={saving}
                  className="text-xs text-[#ff4f01] hover:underline cursor-pointer disabled:opacity-50"
                >
                  Enable All
                </button>
                <span className="text-[rgb(119,119,125)]">·</span>
                <button
                  onClick={handleDisableAll}
                  disabled={saving}
                  className="text-xs text-[rgb(119,119,125)] hover:text-[#101010] cursor-pointer disabled:opacity-50"
                >
                  Disable All
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#f0f0f0]">
              {notificationTypes.map((notif) => (
                <div
                  key={notif.key}
                  className="flex items-center justify-between p-5 hover:bg-[#fafafa] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${notif.iconColor}15` }}
                    >
                      <i className={`${notif.icon} text-lg`} style={{ color: notif.iconColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#101010]">{notif.label}</p>
                      <p className="text-xs text-[rgb(119,119,125)] mt-0.5 max-w-md">{notif.description}</p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    onClick={() => handleToggle(notif.key)}
                    disabled={saving}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50 ${
                      prefs[notif.key] ? "bg-[#ff4f01]" : "bg-[#e5e5e5]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        prefs[notif.key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-[#ff4f01]/5 border border-[#ff4f01]/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <i className="ri-information-line text-[#ff4f01] text-lg mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#101010] mb-1">How email notifications work</p>
                <ul className="text-xs text-[rgb(119,119,125)] space-y-1.5">
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-[#22c55e] mt-0.5 shrink-0" />
                    Email notifications are sent to your registered email address
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-[#22c55e] mt-0.5 shrink-0" />
                    In-app notifications appear in the bell icon regardless of email settings
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-[#22c55e] mt-0.5 shrink-0" />
                    You can click any notification to jump directly to the related request
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="ri-check-line text-[#22c55e] mt-0.5 shrink-0" />
                    Weekly summaries are sent every Monday at 9:00 AM
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}