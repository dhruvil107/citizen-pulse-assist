import React, { useEffect, useState } from "react";

type Complaint = {
  _id: string;
  title: string;
  description: string;
  votes?: { support: number; reject: number };
  userVotes?: { [userId: string]: "support" | "reject" };
};

function getUserId(): string {
  // Replace with your actual user ID logic (e.g., from auth context)
  return localStorage.getItem("userId") || "demo-user";
}

const ComplaintsList: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [userVotes, setUserVotes] = useState<{ [complaintId: string]: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line
  }, []);

  async function fetchComplaints() {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/complaints");
    const data = await res.json();
    setComplaints(data);
    setLoading(false);

    // Optionally, fetch user votes for all complaints
    const userId = getUserId();
    const votes: { [complaintId: string]: string } = {};
    for (const complaint of data) {
      const resp = await fetch(`http://localhost:5000/api/complaints/${complaint._id}/votes`);
      const voteData = await resp.json();
      if (voteData && voteData.userVotes && voteData.userVotes[userId]) {
        votes[complaint._id] = voteData.userVotes[userId];
      }
    }
    setUserVotes(votes);
  }

  async function handleVote(complaintId: string, vote: "support" | "reject") {
    const userId = getUserId();
    if (userVotes[complaintId]) return; // Already voted

    await fetch("http://localhost:5000/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaintId, userId, vote }),
    });

    // Refresh votes for this complaint
    const resp = await fetch(`http://localhost:5000/api/complaints/${complaintId}/votes`);
    const voteData = await resp.json();

    setComplaints((prev) =>
      prev.map((c) =>
        c._id === complaintId
          ? { ...c, votes: voteData.votes }
          : c
      )
    );
    setUserVotes((prev) => ({ ...prev, [complaintId]: vote }));
  }

  if (loading) return <div>Loading complaints...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Complaints</h2>
      {complaints.map((complaint) => (
        <div key={complaint._id} className="border rounded p-4 mb-4">
          <h3 className="font-semibold">{complaint.title}</h3>
          <p className="mb-2">{complaint.description}</p>
          <div className="flex items-center gap-4 mb-2">
            <span>Support: {complaint.votes?.support ?? 0}</span>
            <span>Reject: {complaint.votes?.reject ?? 0}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
              disabled={!!userVotes[complaint._id]}
              onClick={() => handleVote(complaint._id, "support")}
            >
              Support
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
              disabled={!!userVotes[complaint._id]}
              onClick={() => handleVote(complaint._id, "reject")}
            >
              Reject
            </button>
            {userVotes[complaint._id] && (
              <span className="ml-2 text-sm text-gray-500">
                You voted: {userVotes[complaint._id]}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintsList;
