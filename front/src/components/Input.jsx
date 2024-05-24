export function InputText ({ label, placeholder, type, className, handleChange, value }) {
  return (
    <label className={`form-control w-full mx-auto ${className}`}>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input type={type} onChange={handleChange} value={value} placeholder={placeholder} className='input input-bordered input-sm w-full' />
    </label>
  )
}
