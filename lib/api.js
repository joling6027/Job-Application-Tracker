
const deleteData = async (jobid) => {
  const response = await fetch(`/api/test/${jobid}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data;
}

const statusOnChange = async (jobid, JSONData) => {
  const response = await fetch(`/api/test/${jobid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONData
  })
  const data = await response.json()
  return data;
}

export { deleteData, statusOnChange };