import React, { useEffect, useState } from "react";

type Complaint = {
  _id: string;
  complaintId?: number;
  title: string;
  description: string;
  status: string;
  votes?: { support: number; reject: number };
};

const ComplaintStatus: React.FC = () => {
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const complaintId = localStorage.getItem("complaintId");
    const userEmail = localStorage.getItem("userEmail");
    if (complaintId) {
      fetchComplaintById(complaintId);
    } else if (userEmail) {
      fetchComplaintByEmail(userEmail);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchComplaintById(id: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Complaint not found");
      const data = await res.json();
      setComplaint(data);
    } catch (err) {
      setError("No complaint found. Please submit a complaint first.");
    }
    setLoading(false);
  }

  async function fetchComplaintByEmail(email: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/user/${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Complaint not found");
      const data = await res.json();
      setComplaint(data);
    } catch (err) {
      setError("No complaint found. Please submit a complaint first.");
    }
    setLoading(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-100 dark:bg-green-900";
      case "rejected": return "text-red-600 bg-red-100 dark:bg-red-900";
      default: return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (!complaint) {
    return <div className="text-center py-8 text-red-500">No complaint found. Please submit a complaint first.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Your Complaint Status</h2>
      {complaint.complaintId && (
        <div className="mb-2"><strong>Complaint ID:</strong> {complaint.complaintId}</div>
      )}
      <div className="mb-2"><strong>Title:</strong> {complaint.title}</div>
      <div className="mb-2"><strong>Description:</strong> {complaint.description}</div>
      <div className={`inline-block px-3 py-1 rounded-full font-semibold text-sm mb-2 ${getStatusColor(complaint.status)}`}>
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
  );
};

export default ComplaintStatus;
