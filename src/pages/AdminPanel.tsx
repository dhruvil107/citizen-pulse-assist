import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Complaint {
  _id: string;
  complaintId?: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
  priority?: string;
  userId?: string;
}

const AdminPanel: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [adminNote, setAdminNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [savingPriority, setSavingPriority] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/complaints");
      if (!res.ok) throw new Error("Failed to fetch complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      setError("Could not load complaints.");
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchComplaints();
      // If details modal open, refresh it
      if (detailsOpen && selectedComplaint?._id === id) {
        await fetchComplaintDetails(id);
      }
    } catch (err) {
      alert("Error updating status");
    }
  }

  async function fetchComplaintDetails(id: string) {
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error("Failed to fetch complaint details");
      const data = await res.json();
      setSelectedComplaint(data);
      setAdminNote(data.adminNote || "");
      setDetailsOpen(true);
    } catch (err) {
      alert("Could not load complaint details.");
    }
  }

  async function saveAdminNote() {
    if (!selectedComplaint) return;
    setSavingNote(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/note/${selectedComplaint._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: adminNote }),
      });
      if (!res.ok) throw new Error("Failed to save note");
      // refresh details
      await fetchComplaintDetails(selectedComplaint._id);
      fetchComplaints();
    } catch (err) {
      alert("Error saving note");
    }
    setSavingNote(false);
  }

  async function updatePriority(id: string, priority: string) {
    setSavingPriority(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/priority/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority }),
      });
      if (!res.ok) throw new Error("Failed to update priority");
      // refresh
      await fetchComplaintDetails(id);
      fetchComplaints();
    } catch (err) {
      alert("Error updating priority");
    }
    setSavingPriority(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel - All Complaints</h1>
        {loading ? (
          <div className="text-center">Loading complaints...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : complaints.length === 0 ? (
          <div className="text-center text-muted-foreground">No complaints found.</div>
        ) : (
          <div className="space-y-6">
            {complaints.map((complaint) => (
              <Card key={complaint._id} className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{complaint.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      complaint.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : complaint.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-sm text-muted-foreground">ID: {complaint.complaintId || complaint._id}</div>
                  <div className="mb-2 text-sm">{complaint.description}</div>
                  <div className="mb-2 text-xs text-muted-foreground">Priority: {complaint.priority || "-"}</div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={() => fetchComplaintDetails(complaint._id)}>
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => updateStatus(complaint._id, "approved")}
                      disabled={complaint.status === "approved"}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus(complaint._id, "rejected")}
                      disabled={complaint.status === "rejected"}
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      {/* Details modal */}
      {detailsOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetailsOpen(false)} />
          <div className="relative bg-background border rounded-lg shadow-lg max-w-3xl w-full mx-4 p-6 z-10">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Complaint Details</h3>
              <div className="text-sm text-muted-foreground">ID: {selectedComplaint.complaintId || selectedComplaint._id}</div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Title</div>
                <div className="mb-2">{selectedComplaint.title}</div>

                <div className="font-semibold">Description</div>
                <div className="mb-2">{selectedComplaint.description}</div>

                <div className="font-semibold">Status</div>
                <div className="mb-2">{selectedComplaint.status}</div>

                <div className="font-semibold">Priority</div>
                <div className="mb-2">{selectedComplaint.priority || selectedComplaint.priorityLevel || '-'}</div>
                <div className="mb-2">
                  <label className="block text-sm text-muted-foreground mb-1">Change priority</label>
                  <select className="w-full p-2 border rounded" value={selectedComplaint.priority || selectedComplaint.priorityLevel || ''} onChange={(e) => setSelectedComplaint((s:any)=>({...s, priority: e.target.value}))}>
                    <option value="">-- select --</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => updatePriority(selectedComplaint._id, selectedComplaint.priority || selectedComplaint.priorityLevel || '')} disabled={savingPriority}>{savingPriority ? 'Saving...' : 'Save Priority'}</Button>
                  </div>
                </div>

                <div className="font-semibold">Submitted</div>
                <div className="mb-2">{selectedComplaint.createdAt ? new Date(selectedComplaint.createdAt).toLocaleString() : '-'}</div>
                <div className="font-semibold">Last Updated</div>
                <div className="mb-2">{selectedComplaint.updatedAt ? new Date(selectedComplaint.updatedAt).toLocaleString() : '-'}</div>
                {selectedComplaint.history && selectedComplaint.history.length > 0 && (
                  <div className="mt-2">
                    <div className="font-semibold">Status History</div>
                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                      {selectedComplaint.history.map((h: any, i: number) => (
                        <li key={i}>{h.status} — {h.by || 'system'} @ {h.at ? new Date(h.at).toLocaleString() : ''}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold">User</div>
                <div className="mb-2">{selectedComplaint.userEmail || selectedComplaint.userId || '-'}</div>

                <div className="font-semibold">Location</div>
                <div className="mb-2">{selectedComplaint.location || '-'}</div>
                {selectedComplaint.location && (
                  <div className="mb-2"><a className="text-primary hover:underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedComplaint.location)}`} target="_blank" rel="noreferrer">Open in Maps</a></div>
                )}

                <div className="font-semibold">Votes</div>
                <div className="mb-2">Support: {selectedComplaint.votes?.support ?? 0} &nbsp; Reject: {selectedComplaint.votes?.reject ?? 0}</div>

                <div className="font-semibold">Attachments</div>
                <div className="mb-2">
                  {selectedComplaint.images && selectedComplaint.images.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {selectedComplaint.images.map((src: string, idx: number) => (
                        <img key={idx} src={src} alt={`attachment-${idx}`} className="h-20 w-20 object-cover rounded border" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No attachments</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="font-semibold mb-2">Admin Notes</div>
              <Textarea value={adminNote} onChange={(e) => setAdminNote((e.target as HTMLTextAreaElement).value)} rows={4} />
              <div className="flex gap-2 mt-3">
                <Button onClick={saveAdminNote} disabled={savingNote}>{savingNote ? 'Saving...' : 'Save Note'}</Button>
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
