import { Link } from 'react-router-dom'
import { InputText } from '../components/Input'
import { Checkbox, MultiCheckbox } from '../components/Checkbox'

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
            <Link to='/' className='btn btn-sm btn-outline btn-accent'>Cancelar</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
