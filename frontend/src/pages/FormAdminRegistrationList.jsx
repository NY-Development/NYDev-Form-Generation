import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { listRegistrations } from "../services/registrationService";
import { fadeUp, pageFade, staggerContainer } from "../utils/motionPresets";

const FormAdminRegistrationList = () => {
  const { formId } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!formId) {
      return;
    }

    const fetchRegistrations = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const data = await listRegistrations(formId);
        setRegistrations(data.registrations || []);
      } catch (error) {
        setErrorMessage("Unable to load registrations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, [formId]);

  const filteredRegistrations = useMemo(() => {
    return registrations.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const searchTarget = `${item.attendee?.firstName || ""} ${item.attendee?.lastName || ""} ${item.attendee?.email || ""} ${item.registrationId || ""}`.toLowerCase();
      const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [registrations, searchQuery, statusFilter]);

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return { date: "-", time: "-" };
    }
    const date = new Date(dateValue);
    return {
      date: date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    };
  };

  const statusStyles = {
    verified: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
    pending: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800",
    rejected: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800"
  };

  const totalCount = registrations.length;
  const showingCount = filteredRegistrations.length;
  return (
    <motion.div className="bg-background-light dark:bg-background-dark text-[#111318] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden" {...pageFade}>
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] dark:border-[#222831] px-10 py-3 bg-white dark:bg-[#18212f]">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-[#111318] dark:text-white">
                <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                  <span className="material-symbols-outlined">assignment</span>
                </div>
                <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">FormAdmin</h2>
              </div>
              <div className="flex items-center gap-9 hidden md:flex">
                <a className="text-[#111318] dark:text-[#9ca3af] hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">
                  Dashboard
                </a>
                <a className="text-[#111318] dark:text-white text-sm font-bold leading-normal" href="#">
                  Events
                </a>
                <a className="text-[#111318] dark:text-[#9ca3af] hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">
                  Reports
                </a>
                <a className="text-[#111318] dark:text-[#9ca3af] hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">
                  Settings
                </a>
              </div>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              <div className="hidden sm:flex items-center gap-2">
                <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#616f89] dark:text-[#9ca3af]">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="flex items-center justify-center size-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#616f89] dark:text-[#9ca3af]">
                  <span className="material-symbols-outlined">help</span>
                </button>
              </div>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#e5e7eb] dark:border-[#222831]"
                data-alt="User profile avatar"
                style={{
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBQSCr66Gat0izlNksJ5oMlu6XufulpFUgjPgdOOw8-PPJbbuAMphkKGj83qe1inIPHR0k3o_6m1kftIQHwZOISQGT28Tbm4rK_M_1UHoDN67XdrpK8Kky-EoWd2J5zBobC4ve30bAgOm9aEkX1bMzq7vGmhjmwz7sMgYkoK6L9iwsukJSsuEuwGR2CGKh6mwq79wm_hKNBc5Tk0PUQoZttOSaKOmlq2igV3GtUHElsuVCpNw5Y3Ei3e9--GHZZUF2oru3ob-mRXoE)"
                }}
              ></div>
            </div>
          </header>
          <div className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-20">
            <motion.div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1" variants={staggerContainer} initial="initial" animate="animate">
              <div className="flex flex-wrap gap-2 px-4 py-2">
                <a className="text-[#616f89] dark:text-[#9ca3af] text-sm font-medium leading-normal hover:underline" href="#">
                  Dashboard
                </a>
                <span className="text-[#616f89] dark:text-[#9ca3af] text-sm font-medium leading-normal">/</span>
                <a className="text-[#616f89] dark:text-[#9ca3af] text-sm font-medium leading-normal hover:underline" href="#">
                  Events
                </a>
                <span className="text-[#616f89] dark:text-[#9ca3af] text-sm font-medium leading-normal">/</span>
                <span className="text-[#111318] dark:text-white text-sm font-medium leading-normal">Worship Night 2024</span>
              </div>
              <motion.div className="flex flex-col md:flex-row justify-between gap-6 px-4 py-6 items-start md:items-end" variants={fadeUp}>
                <div className="flex flex-col gap-2">
                  <h1 className="text-[#111318] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Registrations</h1>
                  <p className="text-[#616f89] dark:text-[#9ca3af] text-base font-normal leading-normal max-w-xl">
                    Manage attendee list, verify tickets, and track status for <span className="font-semibold text-primary">Worship Night 2024</span>.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="relative group">
                    <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-gray-100 dark:bg-[#1f2937] text-gray-400 dark:text-gray-500 text-sm font-bold cursor-not-allowed border border-transparent" disabled>
                      <span className="material-symbols-outlined text-[20px]">download</span>
                      <span>Export CSV</span>
                      <span className="bg-gray-200 dark:bg-gray-700 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider text-gray-500 font-bold ml-1">Pro</span>
                    </button>
                    <div className="tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 invisible transition-all whitespace-nowrap z-10">
                      Upgrade to Pro to export data
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-sm shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                    <span>Scan QR Code</span>
                  </button>
                </div>
              </motion.div>
              <motion.div className="px-4 pb-6" variants={fadeUp}>
                <div className="bg-white dark:bg-[#18212f] rounded-xl border border-[#e5e7eb] dark:border-[#222831] p-2 flex flex-col md:flex-row gap-2 shadow-sm">
                  <div className="flex-1 min-w-[200px]">
                    <label className="flex w-full items-center h-10 rounded-lg bg-background-light dark:bg-[#101622] px-3 border border-transparent focus-within:border-primary/50 transition-colors">
                      <span className="material-symbols-outlined text-[#616f89] dark:text-[#9ca3af]">search</span>
                      <input
                        className="w-full bg-transparent border-none focus:ring-0 text-[#111318] dark:text-white placeholder:text-[#616f89] dark:placeholder:text-[#6a7280] ml-2 text-sm"
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search by name, email, or ticket ID"
                        value={searchQuery}
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    <button
                      className={`h-10 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        statusFilter === "all"
                          ? "bg-[#eef4ff] dark:bg-primary/20 text-primary dark:text-blue-300"
                          : "hover:bg-background-light dark:hover:bg-[#101622] text-[#616f89] dark:text-[#9ca3af]"
                      }`}
                      onClick={() => setStatusFilter("all")}
                      type="button"
                    >
                      All Statuses
                    </button>
                    <button
                      className={`h-10 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                        statusFilter === "verified"
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                          : "hover:bg-background-light dark:hover:bg-[#101622] text-[#616f89] dark:text-[#9ca3af]"
                      }`}
                      onClick={() => setStatusFilter("verified")}
                      type="button"
                    >
                      <span className="size-2 rounded-full bg-emerald-500"></span> Verified
                    </button>
                    <button
                      className={`h-10 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                        statusFilter === "pending"
                          ? "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                          : "hover:bg-background-light dark:hover:bg-[#101622] text-[#616f89] dark:text-[#9ca3af]"
                      }`}
                      onClick={() => setStatusFilter("pending")}
                      type="button"
                    >
                      <span className="size-2 rounded-full bg-amber-500"></span> Pending
                    </button>
                    <button
                      className={`h-10 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                        statusFilter === "rejected"
                          ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                          : "hover:bg-background-light dark:hover:bg-[#101622] text-[#616f89] dark:text-[#9ca3af]"
                      }`}
                      onClick={() => setStatusFilter("rejected")}
                      type="button"
                    >
                      <span className="size-2 rounded-full bg-red-500"></span> Rejected
                    </button>
                  </div>
                  <button className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg hover:bg-background-light dark:hover:bg-[#101622] text-[#616f89] dark:text-[#9ca3af] border border-transparent dark:border-[#222831] md:border-l-[#e5e7eb] md:rounded-l-none md:border-l md:pl-2">
                    <span className="material-symbols-outlined">filter_list</span>
                  </button>
                </div>
              </motion.div>
              <motion.div className="px-4 flex-1" variants={fadeUp}>
                <div className="overflow-hidden rounded-xl border border-[#e5e7eb] dark:border-[#222831] bg-white dark:bg-[#18212f] shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-background-light dark:bg-[#101622]">
                        <tr>
                          <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-[#9ca3af] w-12">
                            <input className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/20 bg-white dark:bg-[#1f2937]" type="checkbox" />
                          </th>
                          <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-[#9ca3af]">Attendee</th>
                          <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-[#9ca3af]">Ticket Type</th>
                          <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-[#9ca3af]">Date Registered</th>
                          <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-[#9ca3af]">Status</th>
                          <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#616f89] dark:text-[#9ca3af] text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#222831]">
                        {isLoading && (
                          <tr>
                            <td className="py-6 px-4 text-sm text-[#616f89] dark:text-[#9ca3af]" colSpan={6}>
                              Loading registrations...
                            </td>
                          </tr>
                        )}
                        {!isLoading && errorMessage && (
                          <tr>
                            <td className="py-6 px-4 text-sm text-red-500" colSpan={6}>
                              {errorMessage}
                            </td>
                          </tr>
                        )}
                        {!isLoading && !errorMessage && filteredRegistrations.length === 0 && (
                          <tr>
                            <td className="py-6 px-4 text-sm text-[#616f89] dark:text-[#9ca3af]" colSpan={6}>
                              No registrations found.
                            </td>
                          </tr>
                        )}
                        {!isLoading && !errorMessage && filteredRegistrations.map((registration) => {
                          const attendeeName = `${registration.attendee?.firstName || ""} ${registration.attendee?.lastName || ""}`.trim() || "Guest";
                          const initials = attendeeName.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
                          const dateInfo = formatDateTime(registration.createdAt);
                          const statusClass = statusStyles[registration.status] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";

                          return (
                            <tr key={registration._id || registration.registrationId} className="group hover:bg-[#f9fafb] dark:hover:bg-[#1f2937]/50 transition-colors">
                              <td className="py-3 px-4">
                                <input className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/20 bg-white dark:bg-[#1f2937]" type="checkbox" />
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="size-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                                    {initials || "NA"}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-[#111318] dark:text-white">{attendeeName}</p>
                                    <p className="text-xs text-[#616f89] dark:text-[#9ca3af]">{registration.attendee?.email || "-"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">General Admission</span>
                              </td>
                              <td className="py-3 px-4">
                                <p className="text-sm text-[#616f89] dark:text-[#9ca3af]">{dateInfo.date}</p>
                                <p className="text-xs text-[#9ca3af] dark:text-[#6b7280]">{dateInfo.time}</p>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusClass}`}>
                                  <span className="size-1.5 rounded-full bg-current"></span>
                                  {registration.status || "pending"}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button className="text-[#616f89] dark:text-[#9ca3af] hover:text-[#111318] dark:hover:text-white p-1 rounded hover:bg-gray-100 dark:hover:bg-[#374151]" type="button">
                                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-[#e5e7eb] dark:border-[#222831] gap-4">
                    <p className="text-sm text-[#616f89] dark:text-[#9ca3af]">
                      Showing <span className="font-medium text-[#111318] dark:text-white">{showingCount}</span> of <span className="font-medium text-[#111318] dark:text-white">{totalCount}</span> results
                    </p>
                    <div className="flex gap-2">
                      <button className="h-9 px-3 rounded border border-[#e5e7eb] dark:border-[#222831] bg-white dark:bg-[#18212f] text-[#616f89] dark:text-[#9ca3af] text-sm font-medium hover:bg-background-light dark:hover:bg-[#101622] disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        Previous
                      </button>
                      <button className="h-9 px-3 rounded border border-[#e5e7eb] dark:border-[#222831] bg-white dark:bg-[#18212f] text-[#111318] dark:text-white text-sm font-medium hover:bg-background-light dark:hover:bg-[#101622]">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="px-4 py-8">
                <p className="text-xs text-center text-[#616f89] dark:text-[#9ca3af]">FormAdmin &copy; 2024. All rights reserved.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FormAdminRegistrationList;
