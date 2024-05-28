export function InputText ({ label, placeholder, type, className, handleChange, value, error }) {
  return (
    <label className={`form-control w-full mx-auto ${className}`}>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input type={type} onChange={handleChange} value={value} placeholder={placeholder} className='input input-bordered input-sm w-full' />
      {error && <span className='text-sm text-red-500/90 my-2'>* {error}</span>}
    </label>
  )
}
