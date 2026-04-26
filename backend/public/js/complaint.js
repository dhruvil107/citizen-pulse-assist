const API = window.API_BASE || 'http://localhost:5000';

async function submitComplaint(e) {
  if (e) e.preventDefault();
  const form = document.getElementById('complaintForm');
  if (!form) return;
  const fd = new FormData(form);
  const data = {
    title: fd.get('title'),
    description: fd.get('description'),
    location: fd.get('location'),
    priority: fd.get('priority')
  };
  try {
    const res = await fetch(`${API}/api/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    document.getElementById('message').innerText = 'Submitted. ID: ' + (json.complaintId || json._id);
    localStorage.setItem('complaintId', json.complaintId || json._id);
  } catch (err) {
    document.getElementById('message').innerText = 'Submit error';
  }
}

async function loadComplaints() {
  try {
    const res = await fetch(`${API}/api/complaints`);
    const list = await res.json();
    const container = document.getElementById('complaints');
    const adminContainer = document.getElementById('adminComplaints');
    if (container) {
      container.innerHTML = list.map(c => `
        <div class="card">
          <div class="card-title">${c.title} (${c.complaintId || c._id})</div>
          <div class="card-desc">${c.description}</div>
          <div class="card-meta">Status: ${c.status}</div>
        </div>
      `).join('');
    }
    if (adminContainer) {
      adminContainer.innerHTML = list.map(c => `
        <div class="card">
          <div class="card-title">${c.title} (${c.complaintId || c._id})</div>
          <div class="card-desc">${c.description}</div>
          <div class="card-meta">Status: ${c.status}</div>
          <div class="card-actions">
            <button onclick="updateStatus('${c._id}', 'approved')">Approve</button>
            <button onclick="updateStatus('${c._id}', 'rejected')">Reject</button>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

async function updateStatus(id, status) {
  try {
    await fetch(`${API}/api/admin/approve/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    loadComplaints();
  } catch (err) {
    console.error(err);
  }
}

// attach handlers
if (document.getElementById('complaintForm')) {
  document.getElementById('complaintForm').addEventListener('submit', submitComplaint);
}
if (document.getElementById('refresh')) {
  document.getElementById('refresh').addEventListener('click', loadComplaints);
}

// initial load
loadComplaints();
