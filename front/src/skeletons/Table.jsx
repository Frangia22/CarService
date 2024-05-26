export function TableSkeleton ({ rows }) {
  return (
    <table className='table table-xs md:table-md table-zebra'>
      <thead>
        <tr>
          <th className='skeleton w-32'>Patente</th>
          <th className='skeleton w-32'>Fecha</th>
          <th className='skeleton w-32'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          rows.map(card => (
            <tr key={card}>
              <td className='skeleton w-auto' />
              <td className='skeleton w-auto' />
              <td className='skeleton w-auto' />
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
