import { Link } from 'react-router-dom'

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
            <h3 className='font-bold text-lg'>Hello!</h3>
            <p className='py-4'>Press ESC key or click the button below to close</p>
            <div className='modal-action'>
              <form method='dialog'>
                {/* if there is a button in form, it will close the modal */}
                <button className='btn'>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>
    </>
  )
}
