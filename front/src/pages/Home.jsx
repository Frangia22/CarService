import { Link } from 'react-router-dom'

export function ItemList ({ title, value }) {
  return (
    <li>
      <p className='text-sm my-4'>{title}: <strong className='text-base mx-4'>{value}</strong></p>
    </li>
  )
}

export function Home () {
  return (
    <>
      <main className='w-full my-6'>
        <header className='w-full px-4 md:w-1/4 md:mx-auto'>
          <label className='input input-bordered flex items-center gap-2'>
            <input type='text' className='grow' placeholder='Buscar por patente' />
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor' className='w-4 h-4 opacity-70'><path fillRule='evenodd' d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z' clipRule='evenodd' /></svg>
          </label>
          <Link to='add-card-servi' class='btn btn-sm btn-primary my-4'>Agregar tarjeta</Link>
        </header>
        <div className='overflow-x-auto w-full md:w-1/4 px-4 md:mx-auto'>
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
              {/* row 1 */}
              <tr className='hover'>
                <td>AB777BC</td>
                <td>23-05-2024</td>
                <td><button className='btn btn-sm btn-active btn-link' onClick={() => document.getElementById('my_modal_1').showModal()}>Ver</button></td>
              </tr>
              {/* row 2 */}
              <tr>
                <td>AB777BC</td>
                <td>23-05-2024</td>
                <td><button className='btn btn-sm btn-active btn-link' onClick={() => document.getElementById('my_modal_1').showModal()}>Ver</button></td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>AB777BC</td>
                <td>23-05-2024</td>
                <td><button className='btn btn-sm btn-active btn-link' onClick={() => document.getElementById('my_modal_1').showModal()}>Ver</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <dialog id='my_modal_1' className='modal'>
          <div className='modal-box'>
            <ul>
              <li>
                <h2 className='text-xl font-bold text-center'>
                  Servi
                  <span className='badge badge-neutral badge-lg mx-4'>AB777CD</span>
                </h2>
              </li>
              <li>
                <p className='my-4'>Kilometros: <strong className='mx-4 badge badge-info'>100000 KM</strong></p>
              </li>
              <ItemList title='Fecha' value='25-05-2024' />
              <ItemList title='Motor' value='Cambio de aceite' />
              <ItemList title='Tipo de aceite' value='5w40' />
              <ItemList title='Filtro de aceite ' value='Cambio de aceite' />
              <ItemList title='Filtro de aire' value='Limpieza' />
              <ItemList title='Filtro de nafta' value='Cambio' />
              <ItemList title='Filtro de gasoil' value='Cambio' />
              <ItemList title='Filtro anti-polen' value='Cambio' />
              <ItemList title='Bujias' value='Cambio' />
              <ItemList title='Caja de velocidad' value='Nivel' />
              <ItemList title='Correa de distribución' value='-' />
              <ItemList title='Liquido de freno' value='Nivel' />
              <ItemList title='Pastillas de freno' value='Cambio' />
              <ItemList title='Alineación' value='No' />
              <ItemList title='Diferencial' value='No' />
              <ItemList title='Reemplazo agua motor' value='Si' />
            </ul>
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
