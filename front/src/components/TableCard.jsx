export function WithCardServi ({ dataRow, onHandleView }) {
  const handleView = (id) => {
    onHandleView(id)
  }
  return (
    <table className='table table-xs md:table-md table-zebra'>
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
              <td><button className='btn btn-sm btn-active btn-link' onClick={() => handleView(card.id)}>Ver</button></td>
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
export function TableCard ({ hasCardServi, dataRow, onHandleView }) {
  return (
    hasCardServi
      ? <WithCardServi dataRow={dataRow} onHandleView={onHandleView} />
      : <WithoutCardServi />
  )
}
