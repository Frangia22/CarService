import { ItemList } from './ItemList'

export function ServiCardDetail ({ dataRow }) {
  return (
    dataRow.map(item => (
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
  )
}
