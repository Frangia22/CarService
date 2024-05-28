import { Link } from 'react-router-dom'

export function NotFound404 () {
  return (
    <section className='grid place-items-center h-screen mx-auto'>
      <div className='flex flex-col mx-auto'>
        <span className='text-center text-slate-950 dark:text-slate-50 text-xl font-medium'>Lo siento! Pagina no encontrada</span>
        <img className='w-full h-5/6' src='../img/BrokenCar.svg' alt='Pagina no encontrada' />
        <Link to='/' className='text-center no-underline text-slate-950 dark:text-slate-50 hover:font-bold'>Volver a la home</Link>
      </div>
    </section>
  )
}
