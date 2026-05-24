const API_BASE = '/api/v1'

export async function generateFromPR(prUrl) {
  const response = await fetch(`${API_BASE}/docs/generate/from-pr`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pr_url: prUrl }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || `Server error: ${response.status}`)
  }

  return response.json()
}

export async function generateFromCode(code, filename) {
  const response = await fetch(`${API_BASE}/docs/generate/from-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, filename }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || `Server error: ${response.status}`)
  }

  return response.json()
}
