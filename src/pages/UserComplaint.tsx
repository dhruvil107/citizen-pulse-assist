import React, { useEffect, useState } from "react";

type Complaint = {
  _id: string;
  title: string;
  description: string;
  status: string;
  votes?: { support: number; reject: number };
};

const API_BASE = "http://localhost:5000/api";

const UserComplaint: React.FC = () => {
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

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const complaintId = localStorage.getItem("complaintId");
    if (email && complaintId) {
      setIsReturning(true);
      fetchComplaint(email);
    }
  }, []);

  async function fetchComplaint(email: string) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/complaints/user/${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Complaint not found");
      const data = await res.json();
      setComplaint(data);
    } catch (err) {
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
      fetchComplaint(form.email);
    } catch (err) {
      alert("Error submitting complaint.");
    }
    setLoading(false);
  }

  async function handleVote(vote: "support" | "reject") {
    if (!complaint) return;
    try {
      await fetch(`${API_BASE}/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complaintId: complaint._id,
          userId: form.email,
          vote,
        }),
      });
      fetchComplaint(form.email);
    } catch {
      alert("Error voting.");
    }
  }

  if (loading) return <div>Loading...</div>;

  if (!isReturning) {
    return (
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Submit a Complaint</h2>
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
    return <div>No complaint found for your email.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Your Complaint</h2>
      <div><strong>Title:</strong> {complaint.title}</div>
      <div><strong>Description:</strong> {complaint.description}</div>
      <div><strong>Status:</strong> {complaint.status}</div>
      <div>
        <strong>Votes:</strong> Support: {complaint.votes?.support ?? 0} | Reject: {complaint.votes?.reject ?? 0}
      </div>
      <div className="flex gap-2 mt-4">
        <button onClick={() => handleVote("support")} className="px-3 py-1 bg-green-500 text-white rounded">Support</button>
        <button onClick={() => handleVote("reject")} className="px-3 py-1 bg-red-500 text-white rounded">Reject</button>
      </div>
    </div>
  );
};

export default UserComplaint;
