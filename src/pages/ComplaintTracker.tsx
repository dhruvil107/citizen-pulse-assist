import React, { useState } from "react";

type Complaint = {
  _id: string;
  title: string;
  description: string;
  status: string;
  votes?: { support: number; reject: number };
};

const ComplaintTracker: React.FC = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setComplaint(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${encodeURIComponent(complaintId)}`);
      if (!res.ok) throw new Error("Complaint not found");
      const data = await res.json();
      setComplaint(data);
    } catch (err) {
      setError("Invalid complaint ID or complaint not found.");
    }
    setLoading(false);
  }

  // Theme-aware background and status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-100 dark:bg-green-900";
      case "rejected": return "text-red-600 bg-red-100 dark:bg-red-900";
      default: return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors">
      <h2 className="text-2xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">Track Your Complaint</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
        <input
          type="text"
          value={complaintId}
          onChange={e => setComplaintId(e.target.value)}
          placeholder="Enter Complaint ID"
          required
          className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow hover:from-blue-700 hover:to-cyan-500 transition-colors disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            "Track"
          )}
        </button>
      </form>
      {error && <div className="text-red-500 text-center mb-4 font-medium animate-pulse">{error}</div>}
      {complaint && (
        <div className="rounded-xl p-6 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow flex flex-col gap-3 animate-fade-in">
          <div className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{complaint.title}</div>
          <div className="text-zinc-600 dark:text-zinc-300">{complaint.description}</div>
          <div className={`inline-block px-3 py-1 rounded-full font-semibold text-sm mt-2 mb-1 ${getStatusColor(complaint.status)}`}
          >
            Status: {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
          </div>
          <div className="flex gap-4 mt-2">
            <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              Support: {complaint.votes?.support ?? 0}
            </span>
            <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              Reject: {complaint.votes?.reject ?? 0}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintTracker;
