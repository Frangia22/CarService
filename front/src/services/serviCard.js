const API_URL = import.meta.env.VITE_API_URL
export const getServiCardAll = async (rows, search, page) => {
  try {
    const res = await fetch(`${API_URL}/servi-card?rows=${rows || 5}&search=${search || ''}`)
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}
export const getServiCardById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/servi-card/${id}`)
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}
export const createServiCard = async (dataServiCard) => {
  try {
    const res = await fetch(`${API_URL}/servi-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataServiCard)
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}
