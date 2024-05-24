import { Link } from 'react-router-dom'

export function InputText ({ label, placeholder, type, className }) {
  return (
    <label className={`form-control w-full mx-auto ${className}`}>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input type={type} placeholder={placeholder} className='input input-bordered input-sm w-full' />
    </label>
  )
}
export function Checkbox ({ title, label, value }) {
  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <span className='label-text font-bold max-w-[3.75rem] md:w-[3.75rem]'>{title}:</span>
        <span className='label-text min-w-36'>{label}</span>
        <input type='checkbox' className='checkbox md:mr-8' />
      </label>
    </div>
  )
}
export function MultiCheckbox ({ title, label, label2, value }) {
  return (
    <div className='form-control'>
      <label className='label cursor-pointer'>
        <span className='label-text font-bold max-w-[3.75rem] md:w-[3.75rem]'>{title}:</span>
        <div className='md:w-[18.55rem]'>
          <div className='flex justify-between my-2 gap-8'>
            <span className='label-text min-w-36'>{label}</span>
            <input type='checkbox' defaultChecked className='checkbox md:mr-8' />
          </div>
          <div className='flex justify-between my-2'>
            <span className='label-text min-w-36'>{label2}</span>
            <input type='checkbox' defaultChecked className='checkbox md:mr-8' />
          </div>
        </div>
      </label>
    </div>
  )
}
export function AddCardServi () {
  return (
    <main className='md:w-full my-6'>
      <section className='mx-4 md:w-1/4 md:mx-auto bg-slate-100/80 dark:bg-stone-800/50 rounded-lg shadow-xl'>
        <form className='px-4 md:px-2'>
          <InputText label='Patente' type='text' placeholder='Ej: AB777CD' />
          <InputText label='Kilometros' type='text' placeholder='Ej: 10000' />
          <InputText label='Fecha' type='date' className='mb-4' />
          <Checkbox title='Motor' label='Cambio de aceite' />
          <MultiCheckbox title='Tipo de aceite' label='5w40' label2='10w40' />
          <Checkbox title='Filtro de aceite' label='Cambio de aceite' />
          <MultiCheckbox title='Filtro de aire' label='Cambio' label2='Limpieza' />
          <Checkbox title='Filtro de nafta' label='Cambio' />
          <Checkbox title='Filtro de gasoil' label='Cambio' />
          <MultiCheckbox title='Filtro anti-polen' label='Cambio' label2='Limpieza' />
          <Checkbox title='Bujias' label='Cambio' />
          <MultiCheckbox title='Caja de velocidad' label='Nivel' label2='Cambio de aceite' />
          <Checkbox title='Correa de distribución' label='Cambio' />
          <Checkbox title='Liquido de freno' label='Nivel' />
          <Checkbox title='Pastillas de freno' label='Cambio' />
          <Checkbox title='Alineación' label='Si' />
          <Checkbox title='Diferencial' label='Si' />
          <Checkbox title='Reemplazo agua motor' label='Si' />
          <div className='flex justify-evenly py-4'>
            <button type='submit' className='btn btn-sm btn-primary'>Agregar</button>
            <Link to='/' class='btn btn-sm btn-outline btn-accent'>Cancelar</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
