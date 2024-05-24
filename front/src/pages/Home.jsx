import { Link } from 'react-router-dom'
import responseApi from '../mocks/res-servicar.json'
import { useState } from 'react'

export function ItemList ({ title, value }) {
  return (
    <li>
      <p className='text-sm my-4'>{title}: <strong className='text-base mx-4'>{value}</strong></p>
    </li>
  )
}

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
          {
            hasServiCard
              ? (
                <table className='table table-xs md:table-md table-zebra'>
                  {/* head */}
                  <thead>
                    <tr>
                      <th className='text-neutral dark:text-neutral-content'>Patente</th>
                      <th className='text-neutral dark:text-neutral-content'>Fecha</th>
                      <th className='text-neutral dark:text-neutral-content'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        serviCard.map(card => (
                          <tr key={card.id}>
                            <td>{card.patent}</td>
                            <td>{card.date}</td>
                            <td><button className='btn btn-sm btn-active btn-link' onClick={() => handleView(card.id)}>Ver</button></td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
                )
              : <p className='text-center'>No hay datos</p>
          }
        </div>
        <dialog id='my_modal_1' className='modal'>
          <div className='modal-box'>
            {
                cardSelect.map(item => (
                  <ul key={item.id}>
                    <li>
                      <h2 className='text-xl font-bold text-center'>
                        Servi
                        <span className='badge badge-neutral badge-lg mx-4'>{item.patent}</span>
                      </h2>
                    </li>
                    <li>
                      <p className='my-4'>Kilometros: <strong className='mx-4 badge badge-info'>{item.kilometers} KM</strong></p>
                    </li>
                    <ItemList title='Fecha' value={item.date} />
                    <ItemList title='Motor' value={item.motor ? 'Cambio de aceite' : ''} />
                    <ItemList title='Tipo de aceite' value={item['type-of-oil']} />
                    <ItemList title='Filtro de aceite' value={item['filter-of-oil'] ? 'Cambio de aceite' : ''} />
                    <ItemList title='Filtro de aire' value={item['filter-of-air']} />
                    <ItemList title='Filtro de nafta' value={item['gasolime-filter'] ? 'Cambio' : ''} />
                    <ItemList title='Filtro de gasoil' value={item['filter-of-gasoil'] ? 'Cambio' : ''} />
                    <ItemList title='Filtro anti-polen' value={item['filter-anti-polen']} />
                    <ItemList title='Bujias' value={item.plugs ? 'Cambio' : ''} />
                    <ItemList title='Caja de velocidad' value={item['box-of-velocity']} />
                    <ItemList title='Correa de distribución' value={item['timing-belt'] ? 'Cambio' : ''} />
                    <ItemList title='Liquido de freno' value={item['brake-fluid'] ? 'Nivel' : ''} />
                    <ItemList title='Pastillas de freno' value={item['brake-pads'] ? 'Cambio' : ''} />
                    <ItemList title='Alineación' value={item.alignment ? 'Si' : 'No'} />
                    <ItemList title='Diferencial' value={item.differential ? 'Si' : 'No'} />
                    <ItemList title='Reemplazo agua motor' value={item['change-engine-water'] ? 'Si' : 'No'} />
                  </ul>
                ))
            }
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
