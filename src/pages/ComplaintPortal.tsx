import React, { useEffect, useState } from "react";

type Complaint = {
  _id: string;
  title: string;
  description: string;
  status: string;
  votes?: { support: number; reject: number };
};

const API_BASE = "http://localhost:5000/api";

const ComplaintPortal: React.FC = () => {
  const [isReturning, setIsReturning] = useState(false);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const complaintId = localStorage.getItem("complaintId");
    if (complaintId) {
      setIsReturning(true);
      fetchComplaint(complaintId);
    }
  }, []);

  async function fetchComplaint(id: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/complaints/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Complaint not found");
      const data = await res.json();
      setComplaint(data);
    } catch (err) {
      setError("Could not fetch complaint details.");
      setComplaint(null);
    }
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleGetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((f) => ({
            ...f,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString(),
          }));
        },
        () => alert("Unable to retrieve location")
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit complaint");
      const data = await res.json();
      localStorage.setItem("complaintId", data._id);
      localStorage.setItem("userEmail", form.email);
      alert(`Complaint submitted! Your ID: ${data._id}`);
      setIsReturning(true);
      fetchComplaint(data._id);
    } catch (err) {
      setError("Error submitting complaint.");
    }
    setLoading(false);
  }

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (!isReturning) {
    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 mt-10">
        <h2 className="text-2xl font-bold text-center mb-2">Submit a Complaint</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-2 border rounded" />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" className="w-full p-2 border rounded" />
          <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" className="w-full p-2 border rounded" />
          <button type="button" onClick={handleGetLocation} className="px-2 py-1 bg-blue-500 text-white rounded">Get Location</button>
        </div>
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">Submit</button>
      </form>
    );
  }

  if (!complaint) {
    return <div className="text-center py-8 text-red-500">No complaint found for your ID.</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-100 dark:bg-green-900";
      case "rejected": return "text-red-600 bg-red-100 dark:bg-red-900";
      default: return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Complaint Progress</h2>
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

export default ComplaintPortal;
