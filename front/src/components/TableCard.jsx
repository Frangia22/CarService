import { useState } from 'react'
import { ConfirmPopups } from './Popups'

export function WithCardServi ({ dataRow, onHandleView, onHandleDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const handleView = (id) => {
    onHandleView(id)
  }
  const handleDelete = (id) => {
    setShowConfirm(id)
  }
  const handleConfirmDelete = (id) => {
    onHandleDelete(id)
    setShowConfirm(false)
  }
  const handleCancelDelete = () => {
    setShowConfirm(false)
  }
  return (
    <table className='table table-xs md:table-md table-zebra mt-4'>
      <thead>
        <tr>
          <th className='text-neutral dark:text-neutral-content'>Patente</th>
          <th className='text-neutral dark:text-neutral-content'>Fecha</th>
          <th className='text-neutral dark:text-neutral-content'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          dataRow.map(card => (
            <tr key={card.id}>
              <td>{card.patent}</td>
              <td>{card.date}</td>
              <td className='relative flex align-center'>
                <button className='btn btn-sm btn-active btn-link' onClick={() => handleView(card.id)}>Ver</button>
                <button onClick={() => handleDelete(card.id)}>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-5 hover:stroke-accent'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0' />
                  </svg>
                </button>
                {showConfirm === card.id && (
                  <ConfirmPopups onCancel={handleCancelDelete} onConfirm={() => handleConfirmDelete(card.id)} />
                )}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
export function WithoutCardServi () {
  return (
    <p className='text-center'>No hay datos</p>
  )
}
export function TableCard ({ hasCardServi, dataRow, onHandleView, onHandleDelete }) {
  return (
    hasCardServi
      ? <WithCardServi dataRow={dataRow} onHandleView={onHandleView} onHandleDelete={onHandleDelete} />
      : <WithoutCardServi />
  )
}
