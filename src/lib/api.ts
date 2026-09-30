// src/lib/api.ts
const API_BASE = "http://localhost:8080/api";

export async function getBorrowers() {
  const res = await fetch(`${API_BASE}/borrowers`);
  return res.json();
}

export async function addBorrower(data: any) {
  const res = await fetch(`${API_BASE}/borrowers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
