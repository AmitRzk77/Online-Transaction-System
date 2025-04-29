import { useState } from "react"
import Button from "./components/Button"
import Inputbox from "./components/Inputbox"
import Selectbox from "./components/Selectbox"
import axios from "axios"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"


function App() {

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    phone: "",
    amount :"",
    transaction_date:"",
    status:""
  })



  const inputHandle = (e:any)=>{
    const {name,value} = e.target;
    // console.log(e.target.value)
    setformdata((prev)=>({...prev,[name]:value}))
  

  }


  const handlesubmit = async (e:any)=>{
    e.preventDefault();
    // console.log(formdata)
    if(formdata.amount.length > 8){
      toast.error("amount digit must be less equal to 8 digit")
      return;
    }
    try {
      const url = "http://127.0.0.1:8000/api/v1/transactions/"
      const response = await axios.post(url,formdata)
      // console.log(response.data)
   
      setformdata({
        name: "",
        email: "",
        phone: "",
        amount :"",
        transaction_date:"",
        status:""
      })
      toast.success("Payment is successfully receive")
      return response.data;
    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }

  }
  

  return (
   <div className="formcontainer h-screen flex-col flex  items-center bg-purple-300">
  <div className="content w-full flex items-center justify-center gap-5">
  <h1 className="my-10 text-5xl text-white font-bold capitalize    text-center">payment system</h1>
  <Link to={"/allpayments"}>
  <Button btntext="All Payments" />
  </Link>
  </div>
    <form onSubmit={handlesubmit} className="p-5 w-[500px] bg-purple-400 rounded-md">

<Inputbox label="Name" type="text" name="name" value={formdata.name} onChange={inputHandle} required/>
<Inputbox label="phone number" type="number" name="phone" value={formdata.phone}  onChange={inputHandle} required/>
<Inputbox label="Email" type="email" name="email" onChange={inputHandle} value={formdata.email} required/>
<Inputbox label="Amount" type="number" name="amount" onChange={inputHandle} value={formdata.amount} required/>
<Inputbox label="Date" type="date" name="transaction_date" onChange={inputHandle} value={formdata.transaction_date} required/>
<Selectbox options={["pending","approved","rejected"]} name="status" onChange={inputHandle} value={formdata.status} required/>
<Button btntext="submit" />

    </form>
   </div>
  )
}

export default App
