import { Link } from 'react-router-dom'
import responseApi from '../mocks/res-servicar.json'
import { useState } from 'react'
import { ServiCardDetail } from '../components/ServiCardDetail'
import { TableCard } from '../components/TableCard'

export function Home () {
  const [cardSelect, setCardSelect] = useState([])
  const [search, setSearch] = useState('')
  let serviCard = search ? responseApi.dataRow.filter((cards) => cards.patent.includes(search)) : responseApi.dataRow
  const hasServiCard = serviCard.length > 0
  const handleView = (id) => {
    document.getElementById('my_modal_1').showModal()
    const selectCard = serviCard.filter((card) => card.id === id)
    setCardSelect(selectCard)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    serviCard = responseApi.dataRow.filter((cards) => cards.patent.includes(search))
  }
  const handleChangeSearch = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
  }
  return (
    <>
      <main className='w-full my-6'>
        <form className='w-full px-4 md:w-1/4 md:mx-auto' onSubmit={handleSubmit}>
          <label className='input input-bordered flex items-center gap-2'>
            <input onChange={handleChangeSearch} type='text' className='grow' placeholder='Buscar por patente' />
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-4 h-4 opacity-70'><path fillRule='evenodd' d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z' clipRule='evenodd' /></svg>
          </label>
          <Link to='add-card-servi' className='btn btn-sm btn-primary my-4'>Agregar tarjeta</Link>
        </form>
        <div className='overflow-x-auto w-full md:w-1/4 px-4 md:mx-auto'>
          <TableCard dataRow={serviCard} hasCardServi={hasServiCard} onHandleView={handleView} />
        </div>
        <dialog id='my_modal_1' className='modal'>
          <div className='modal-box'>
            <ServiCardDetail dataRow={cardSelect} />
            <div className='modal-action justify-center'>
              <form method='dialog'>
                <button className='btn btn-sm btn-accent w-32'>Cerrar</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>
    </>
  )
}
