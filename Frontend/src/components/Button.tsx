

const Button = ({btntext}:any) => {
  return (
    <div>
        <button className=" text-lg p-2 bg-green-500 w-full text-pink rounded-lg hover:bg-red-700">{btntext}</button>
    </div>
  )
}

export default Button