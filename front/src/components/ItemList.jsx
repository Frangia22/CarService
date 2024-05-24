export function ItemList ({ title, value }) {
  return (
    <li>
      <p className='text-sm my-4'>{title}: <strong className='text-base mx-4'>{value}</strong></p>
    </li>
  )
}
