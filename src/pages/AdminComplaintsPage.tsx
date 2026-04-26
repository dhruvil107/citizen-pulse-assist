import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

// Dummy data for demonstration
const dummyComplaints = [
  {
    id: "CMP-GJ-AN-20250829-00001",
    title: "Pothole on Main Street",
    description: "There is a large pothole causing traffic issues.",
    status: "pending",
    reporter: "",
    date: "2025-08-29",
  },
  {
    id: "CMP-GJ-AN-20250829-00002",
    title: "Streetlight not working",
    description: "The streetlight near the park is not working at night.",
    status: "pending",
    reporter: "",
    date: "2025-08-29",
  },
];

const AdminComplaintsPage = () => {
  const [complaints, setComplaints] = useState(dummyComplaints);

  const handleAction = (id: string, action: "accepted" | "rejected") => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: action } : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">All Complaints (Admin Panel)</h1>
        <div className="space-y-6">
          {complaints.length === 0 && (
            <div className="text-center text-muted-foreground">No complaints found.</div>
          )}
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{complaint.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    complaint.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : complaint.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-sm text-muted-foreground">ID: {complaint.id}</div>
                <div className="mb-2 text-sm">{complaint.description}</div>
                <div className="mb-2 text-xs text-muted-foreground">Reported by: {complaint.reporter} on {complaint.date}</div>
                {complaint.status === "pending" && (
                  <div className="flex space-x-4 mt-4">
                    <Button variant="success" onClick={() => handleAction(complaint.id, "accepted")}>Accept</Button>
                    <Button variant="destructive" onClick={() => handleAction(complaint.id, "rejected")}>Reject</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintsPage;
