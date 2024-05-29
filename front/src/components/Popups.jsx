export function Popups ({ showMessage, message, className, onClick, showIcon }) {
  return (
    <div className={showMessage ? 'toast toast-top toast-center md:toast-bottom md:toast-end md:bottom-10' : 'hidden'}>
      <div className={`alert ${className}`}>
        {
        showIcon
          ? <svg xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
          : <svg onClick={onClick} xmlns='http://www.w3.org/2000/svg' className='stroke-current shrink-0 h-6 w-6' fill='none' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
        }
        <span>{message}</span>
      </div>
    </div>
  )
}
export function ConfirmPopups ({ onCancel, onConfirm }) {
  return (
    <div className='absolute bottom-0 right-0 bg-base-100 p-2 rounded-lg shadow-lg z-50'>
      <h2 className='text-xs'>¿Estás seguro de eliminar?</h2>
      <div className='flex justify-center gap-3 mt-2'>
        <button className='btn btn-xs md:btn-sm btn-primary' onClick={onConfirm}>Si</button>
        <button className='btn btn-xs md:btn-sm btn-accent btn-outline mr-2' onClick={onCancel}>No</button>
      </div>
    </div>
  )
}
