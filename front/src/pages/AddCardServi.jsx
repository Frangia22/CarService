import { Link } from 'react-router-dom'
import { InputText } from '../components/Input'
import { Checkbox, MultiCheckbox } from '../components/Checkbox'
import { useState } from 'react'

export function AddCardServi () {
  const [patent, setPatent] = useState('')
  const [kilometers, setKilometers] = useState('')
  const [date, setDate] = useState('')
  const [engine, setEngine] = useState(false)
  const [typeOfOil, setTypeOfOil] = useState('')
  const [filterOfOil, setFilterOfOil] = useState(false)
  const [filterOfAir, setFilterOfAir] = useState('')
  const [gasolineFilter, setGasolineFilter] = useState(false)
  const [filterOfGasoil, setFilterOfGasoil] = useState(false)
  const [filterAntiPolen, setFilterAntiPolen] = useState('')
  const [plugs, setPlugs] = useState(false)
  const [boxOfVelocity, setBoxOfVelocity] = useState('')
  const [timingBelt, setTimingBelt] = useState(false)
  const [brakeFluid, setBrakeFluid] = useState(false)
  const [brakePads, setBrakePads] = useState(false)
  const [alignment, setAlignment] = useState(false)
  const [differential, setDifferential] = useState(false)
  const [changeEngineWater, setChangeEngineWater] = useState(false)
  const handleChangePatent = (event) => {
    const newPatent = event.target.value
    setPatent(newPatent)
  }
  const handleChangeKilometers = (event) => {
    const newKilometers = event.target.value
    setKilometers(newKilometers)
  }
  const handleChangeDate = (event) => {
    const newDate = event.target.value
    setDate(newDate)
  }
  const handleChangeEngine = (event) => {
    const newEngine = event.target.checked
    setEngine(newEngine)
  }
  const handleTypeOfOil = (event) => {
    const newTypeOfOil = event.target.value
    setTypeOfOil(newTypeOfOil)
  }
  const handleChangeFilterOfOil = (event) => {
    const newFilterOfOil = event.target.checked
    setFilterOfOil(newFilterOfOil)
  }
  const handleFilterOfAir = (event) => {
    const newFilterOfAir = event.target.value
    setFilterOfAir(newFilterOfAir)
  }
  const handleChangeGasolineFilter = (event) => {
    const newGasolineFilter = event.target.checked
    setGasolineFilter(newGasolineFilter)
  }
  const handleChangeFilterOfGasoil = (event) => {
    const newFilterOfGasoil = event.target.checked
    setFilterOfGasoil(newFilterOfGasoil)
  }
  const handleFilterAntiPolen = (event) => {
    const newFilterAntiPolen = event.target.value
    setFilterAntiPolen(newFilterAntiPolen)
  }
  const handleChangePlugs = (event) => {
    const newPlugs = event.target.checked
    setPlugs(newPlugs)
  }
  const handleChangeBoxOfVelocity = (event) => {
    const newBoxOfVelocity = event.target.value
    setBoxOfVelocity(newBoxOfVelocity)
  }
  const handleChangeTimingBelt = (event) => {
    const newTimingBelt = event.target.checked
    setTimingBelt(newTimingBelt)
  }
  const handleChangeBrakeFluid = (event) => {
    const newBrakeFluid = event.target.checked
    setBrakeFluid(newBrakeFluid)
  }
  const handleChangeBrakePads = (event) => {
    const newBrakePads = event.target.checked
    setBrakePads(newBrakePads)
  }
  const handleChangeAlignment = (event) => {
    const newAlignment = event.target.checked
    setAlignment(newAlignment)
  }
  const handleChangeDifferential = (event) => {
    const newDifferential = event.target.checked
    setDifferential(newDifferential)
  }
  const handleChangeEngineWater = (event) => {
    const newEngineWater = event.target.checked
    setChangeEngineWater(newEngineWater)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <main className='md:w-full my-6'>
      <section className='mx-4 md:w-1/4 md:mx-auto bg-slate-100/80 dark:bg-stone-800/50 rounded-lg shadow-xl'>
        <form className='px-4 md:px-2' onSubmit={handleSubmit}>
          <InputText label='Patente' type='text' placeholder='Ej: AB777CD' value={patent} handleChange={handleChangePatent} />
          <InputText label='Kilometros' type='text' placeholder='Ej: 10000' value={kilometers} handleChange={handleChangeKilometers} />
          <InputText label='Fecha' type='date' value={date} handleChange={handleChangeDate} className='mb-4' />
          <Checkbox title='Motor' label='Cambio de aceite' value={engine} handleChange={handleChangeEngine} />
          <MultiCheckbox title='Tipo de aceite' name='typeOfOil' label='5w40' label2='10w40' value='5w40' value2='10w40' handleChange={handleTypeOfOil} />
          <Checkbox title='Filtro de aceite' label='Cambio de aceite' value={filterOfOil} handleChange={handleChangeFilterOfOil} />
          <MultiCheckbox title='Filtro de aire' name='filterOfAir' label='Cambio' label2='Limpieza' value='Cambio' value2='Limpieza' handleChange={handleFilterOfAir} />
          <Checkbox title='Filtro de nafta' label='Cambio' value={gasolineFilter} handleChange={handleChangeGasolineFilter} />
          <Checkbox title='Filtro de gasoil' label='Cambio' value={filterOfGasoil} handleChange={handleChangeFilterOfGasoil} />
          <MultiCheckbox title='Filtro anti-polen' name='filterAntiPolen' label='Cambio' label2='Limpieza' value='Cambio' value2='Limpieza' handleChange={handleFilterAntiPolen} />
          <Checkbox title='Bujias' label='Cambio' value={plugs} handleChange={handleChangePlugs} />
          <MultiCheckbox title='Caja de velocidad' name='boxOfVelocity' label='Nivel' label2='Cambio de aceite' value='Nivel' value2='Cambio de aceite' handleChange={handleChangeBoxOfVelocity} />
          <Checkbox title='Correa de distribución' label='Cambio' value={timingBelt} handleChange={handleChangeTimingBelt} />
          <Checkbox title='Liquido de freno' label='Nivel' value={brakeFluid} handleChange={handleChangeBrakeFluid} />
          <Checkbox title='Pastillas de freno' label='Cambio' value={brakePads} handleChange={handleChangeBrakePads} />
          <Checkbox title='Alineación' label='Si' value={alignment} handleChange={handleChangeAlignment} />
          <Checkbox title='Diferencial' label='Si' value={differential} handleChange={handleChangeDifferential} />
          <Checkbox title='Reemplazo agua motor' label='Si' value={changeEngineWater} handleChange={handleChangeEngineWater} />
          <div className='flex justify-evenly py-4'>
            <button type='submit' className='btn btn-sm btn-primary'>Agregar</button>
            <Link to='/' className='btn btn-sm btn-outline btn-accent'>Cancelar</Link>
          </div>
        </form>
      </section>
    </main>
  )
}
