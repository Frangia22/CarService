import { Link } from 'react-router-dom'
import debounce from 'just-debounce-it'
import { useCallback, useState } from 'react'
import { ServiCardDetail } from '../components/ServiCardDetail'
import { TableCard } from '../components/TableCard'
import { useServiCard } from '../hooks/useServiCard'
import { TableSkeleton } from '../skeletons/Table'
import { Footer } from '../components/Footer'
import { Popups } from '../components/Popups'

export default function Home () {
  const [rows] = useState(5)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState({ error: false, success: false, message: '' })
  const { getServiCard, dataRow, loading, getServiCardByPk, cardSelect, deletedServiCard } = useServiCard({ rows, search })
  const hasServiCard = dataRow.length > 0
  const debounceSearchData = useCallback(
    debounce((rows, search) => {
      getServiCard(rows, search)
    }, 500), []
  )
  const handleView = (id) => {
    document.getElementById('my_modal_1').showModal()
    getServiCardByPk(id)
  }
  const handleDelete = async (id) => {
    try {
      const res = await deletedServiCard(id)
      if (res) {
        getServiCard(rows)
        setShow({ ...show, success: true, error: false, message: 'Tarjeta eliminada con éxito!' })
        setTimeout(() => {
          setShow({ ...show, success: false, error: false, message: '' })
        }, 1500)
      }
    } catch (error) {
      setShow({ ...show, success: false, error: true, message: 'Hubo un error al eliminar la tarjeta' })
    }
  }
  const handleChangeSearch = (event) => {
    const newSearch = event.target.value
    debounceSearchData(rows, newSearch)
    setSearch(newSearch)
  }
  return (
    <>
      <main className='w-full my-6'>
        <form className='w-full px-4 md:w-1/4 md:mx-auto'>
          <label className='input input-bordered flex items-center gap-2'>
            <input onChange={handleChangeSearch} type='text' className='grow' placeholder='Buscar por patente' />
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-4 h-4 opacity-70'><path fillRule='evenodd' d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z' clipRule='evenodd' /></svg>
          </label>
          <Link to='add-card-servi' className='btn btn-sm btn-primary my-4'>Agregar tarjeta</Link>
        </form>
        <div className='overflow-x-auto w-full md:w-1/4 px-4 md:mx-auto'>
          {
            loading
              ? <TableSkeleton rows={[1, 2, 3, 4, 5]} />
              : <TableCard dataRow={dataRow} hasCardServi={hasServiCard} onHandleView={handleView} onHandleDelete={handleDelete} />
          }
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
      {show && <Popups showMessage={show.success || show.error} message={show.message} showIcon={show.success} className={show.error ? 'alert-error' : 'alert-success'} onClick={() => setShow(false)} />}
      <Footer />
    </>
  )
}
