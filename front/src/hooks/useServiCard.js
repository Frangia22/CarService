import { useEffect, useState } from 'react'
import { createServiCard, deleteServiCard, getServiCardAll, getServiCardById } from '../services/serviCard'

export function useServiCard () {
  const [dataRow, setDataRow] = useState([])
  const [cardSelect, setCardSelect] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getServiCard = async (rows, search, page) => {
    try {
      setLoading(true)
      const serviCards = await getServiCardAll(rows, search, page)
      const { dataRow, totalItems, totalPages, currentPage } = serviCards
      setDataRow(dataRow)
      setTotalItems(totalItems)
      setTotalPages(totalPages)
      setCurrentPage(currentPage)
      setLoading(false)
    } catch (error) {
      setError(error.message)
    }
  }
  const getServiCardByPk = async (id) => {
    try {
      setLoading(true)
      const serviCard = await getServiCardById(id)
      const { dataRow } = serviCard
      setCardSelect(dataRow)
      setLoading(false)
    } catch (error) {
      setError(error.message)
    }
  }
  const createNewServiCard = async (dataServiCard) => {
    try {
      const res = createServiCard(dataServiCard)
      return res
    } catch (error) {
      setError(error.message)
    }
  }
  const deletedServiCard = async (id) => {
    setError(null)
    try {
      const res = await deleteServiCard(id)
      return res
    } catch (error) {
      setError(error)
    }
  }
  useEffect(() => {
    getServiCard()
  }, [])
  return { getServiCard, dataRow, totalItems, totalPages, currentPage, loading, error, getServiCardByPk, cardSelect, createNewServiCard, deletedServiCard }
}
