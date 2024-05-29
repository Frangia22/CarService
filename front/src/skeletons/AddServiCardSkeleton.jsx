export function InputSkeleton () {
  return (
    <div className='form-control w-full mx-auto'>
      <div className='label'>
        <div className='skeleton w-20 h-4' />
      </div>
      <div className='skeleton w-full h-6' />
    </div>
  )
}
export function CheckboxSkeleton () {
  return (
    <div className='form-control my-4'>
      <div className='flex justify-between'>
        <div className='skeleton h-4 w-[3.75rem] md:w-[3.75rem]' />
        <div className='skeleton h-4 label-text min-w-36' />
        <div className='skeleton w-4 rounded-md md:mr-8' />
      </div>
    </div>
  )
}
export function MultiCheckboxSkeleton () {
  return (
    <div className='form-control'>
      <div className='flex items-baseline justify-between'>
        <div className='skeleton h-4 w-[3.75rem]' />
        <div className=''>
          <div className='flex justify-between my-2 gap-8'>
            <div className='skeleton min-w-36 h-4 md:pl-4 xl:pl-8' />
            <div className='skeleton w-4 rounded-lg md:mr-8' />
          </div>
          <div className='flex justify-between my-2'>
            <div className='skeleton min-w-36 h-4 md:pl-4 xl:pl-8' />
            <div className='skeleton w-4 rounded-lg md:mr-8' />
          </div>
        </div>
      </div>
    </div>
  )
}
export function AddServiCardSkeleton () {
  return (
    <main className='md:w-full my-6'>
      <section className='mx-4 md:w-1/4 md:mx-auto bg-base-300/50 rounded-lg shadow-xl'>
        <form className='px-4 md:px-2'>
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />
          <CheckboxSkeleton />
          <MultiCheckboxSkeleton />
          <CheckboxSkeleton />
          <MultiCheckboxSkeleton />
          <CheckboxSkeleton />
          <CheckboxSkeleton />
          <MultiCheckboxSkeleton />
          <CheckboxSkeleton />
          <MultiCheckboxSkeleton />
          <CheckboxSkeleton />
          <CheckboxSkeleton />
          <CheckboxSkeleton />
          <CheckboxSkeleton />
          <CheckboxSkeleton />
          <CheckboxSkeleton />
          <div className='flex justify-evenly py-4'>
            <div className='skeleton w-20 h-6' />
            <div className='skeleton w-20 h-6' />
          </div>
        </form>
      </section>
    </main>
  )
}
