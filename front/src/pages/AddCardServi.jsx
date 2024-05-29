import { Link, useNavigate } from 'react-router-dom'
import { InputText } from '../components/Input'
import { Checkbox, MultiCheckbox } from '../components/Checkbox'
import { useState } from 'react'
import { useServiCard } from '../hooks/useServiCard'
import { Popups } from '../components/Popups'
import { validateIsNumber, validateRequired } from '../helpers/validations'

export default function AddCardServi () {
  const navigate = useNavigate()
  const { createNewServiCard } = useServiCard()
  const [patent, setPatent] = useState('')
  const [kilometers, setKilometers] = useState(0)
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
  const [show, setShow] = useState({ error: false, success: false, message: '' })
  const [errors, setErrors] = useState({ patent: '', kilometers: '', date: '' })
  const handleChangePatent = (event) => {
    const newPatent = event.target.value
    setPatent(newPatent.toUpperCase())
    setErrors({ ...errors, patent: validateRequired(newPatent, 'Patente') })
  }
  const handleChangeKilometers = (event) => {
    const newKilometers = event.target.value
    setKilometers(newKilometers)
    setErrors({ ...errors, kilometers: (validateRequired(newKilometers, 'Kilometros') || validateIsNumber(newKilometers, 'Kilometros')) })
  }
  const handleChangeDate = (event) => {
    const newDate = event.target.value
    setDate(newDate)
    setErrors({ ...errors, date: validateRequired(newDate, 'Fecha') })
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
  const resetForm = () => {
    setPatent('')
    setKilometers(0)
    setDate('')
    setEngine(false)
    setTypeOfOil('')
    setFilterOfOil(false)
    setFilterOfAir('')
    setGasolineFilter(false)
    setFilterOfGasoil(false)
    setFilterAntiPolen('')
    setPlugs(false)
    setBoxOfVelocity('')
    setTimingBelt(false)
    setBrakeFluid(false)
    setBrakePads(false)
    setAlignment(false)
    setDifferential(false)
    setChangeEngineWater(false)
  }
  const isFormValid = () => {
    return !validateRequired(patent) && !validateRequired(kilometers) && !validateIsNumber(kilometers) && !validateRequired(date) && Object.values(errors).every(error => error === '')
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isFormValid()) {
      const data = {
        patent,
        kilometers,
        date,
        engine,
        type_of_oil: typeOfOil,
        filter_of_oil: filterOfOil,
        filter_of_air: filterOfAir,
        gasoline_filter: gasolineFilter,
        filter_of_gasoil: filterOfGasoil,
        filter_anti_polen: filterAntiPolen,
        plugs,
        box_of_velocity: boxOfVelocity,
        timing_belt: timingBelt,
        brake_fluid: brakeFluid,
        brake_pads: brakePads,
        alignment,
        differential,
        change_engine_water: changeEngineWater
      }
      try {
        const res = await createNewServiCard(data)
        if (!res.errors) {
          setShow({ ...show, success: true, error: false, message: 'Tarjeta creada con exito!, en breve vuelve al inicio.' })
          resetForm()
          setTimeout(() => {
            navigate('/')
          }, 2000)
        } else {
          setShow({ ...show, error: true, message: 'Hubo un error al crear la tarjeta' })
        }
      } catch (error) {
        setShow({ ...show, error: true, message: 'Hubo un error al crear la tarjeta' })
        console.error('Hubo un error al crear la tarjeta: ', error)
      }
    } else {
      const newErrors = {
        patent: validateRequired(patent, 'Patente'),
        kilometers: (validateRequired(kilometers, 'Kilometros'), validateIsNumber(kilometers, 'Kilometros')),
        date: validateRequired(date, 'Fecha')
      }
      setErrors(newErrors)
    }
  }
  return (
    <main className='md:w-full my-6'>
      <section className='mx-4 md:w-1/4 md:mx-auto bg-base-300/50 rounded-lg shadow-xl'>
        <form className='px-4 md:px-2' onSubmit={handleSubmit}>
          <InputText label='Patente' type='text' error={errors.patent} placeholder='Ej: AB777CD' value={patent} handleChange={handleChangePatent} />
          <InputText label='Kilometros' type='number' error={errors.kilometers} placeholder='Ej: 10000' value={kilometers} handleChange={handleChangeKilometers} />
          <InputText label='Fecha' type='date' error={errors.date} value={date} handleChange={handleChangeDate} className='mb-4' />
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
            <button type='submit' className={!isFormValid() ? 'btn btn-sm btn-disabled cursor-not-allowed' : 'btn btn-sm btn-primary'}>Agregar</button>
            <Link to='/' className='btn btn-sm btn-outline btn-accent'>Cancelar</Link>
          </div>
        </form>
      </section>
      {show && <Popups showMessage={show.success || show.error} message={show.message} showIcon={show.success} className={show.error ? 'alert-error' : 'alert-success'} onClick={() => setShow(false)} />}
    </main>
  )
}
