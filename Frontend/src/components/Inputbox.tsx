

const Inputbox = ({type,label,...props}:any) => {
  return (
    <div className="text my-2">
        <label className="block text-xl mb-2 text-black" htmlFor={label}>{label}</label>
        <input className="w-full rounded-md p-2 outline-none " type={type} {...props}/>
    </div>
  )
}

export default Inputbox