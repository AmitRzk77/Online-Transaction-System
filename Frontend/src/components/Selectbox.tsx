

const Selectbox = ({options,...props}:any) => {
  return (
    <div className="my-4">
        <select {...props} className="p-2 rounded-md  w-full bg-white">
            <option value="">---select your status ----</option>
            {options && options.map((data:any)=>{

             return <option key={data} value={data}>{data}</option>
            })}
        </select>
    </div>
  )
}

export default Selectbox