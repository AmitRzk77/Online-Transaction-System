import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../Button";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";

const Allpayments = () => {
const alldata = useLoaderData();

  return (
    <div className=" bg-white-300 p-5">
      <h1 className="text-center text-4xl font-bold my-5 text-white">
        All payments
      </h1>
      <Link to="/">
      <Button btntext="Home" />
      </Link>

      <div className="container py-5">
        <table className="w-full my-5  border-blue-600 ">
          <thead>
            <tr className="border-2">
              <th className="p-2 border-2  text-left font-bold capitalize text-xl">
                sn
              </th>
              <th className="p-2 border-2 text-left font-bold capitalize text-xl">
                id
              </th>
              <th className="p-2 border-2 text-left  font-bold capitalize text-xl">
                name
              </th>
              <th className="p-2 border-2 text-left font-bold capitalize text-xl">
                phone
              </th>
              <th className="p-2 border-2 text-left font-bold capitalize text-xl">
                email
              </th>
              <th className="p-2 border-2 text-left font-bold capitalize text-xl">
                amount
              </th>
              <th className="p-2 border-2 text-left font-bold capitalize text-xl">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {alldata &&
              alldata.map((data: any, index: any) => {
                return (
                  <tr key={data.transaction_id} className="border-2">
                    <td className="border-2 text-lg p-2">{index + 1}</td>
                    <td className="border-2 text-lg p-2">
                      {data.transaction_id}
                    </td>
                    <td className="border-2 text-lg p-2">{data.name}</td>
                    <td className="border-2 text-lg p-2">{data.phone}</td>
                    <td className="border-2 text-lg p-2">{data.email}</td>
                    <td className="border-2 text-lg p-2">{data.amount}</td>
                    <td
                      className={`
                    ${
                      data.status === "approved"
                        ? "text-green-500"
                        : data.status === "pending"
                        ? "text-orange-500"
                        : "text-red-500"
                    }
                    border-2 text-lg p-2 capitalize 
                        `}
                    >
                      {data.status}
                    </td>
                    <td
                      className="border-2 text-lg p-2 w-[140px] "
                      onClick={async (e:any) => {
                        e.preventDefault()
                        console.log(data.transaction_id);
                        try {
                          const url = `http://127.0.0.1:8000/api/v1/pdf/transactions/${data.transaction_id}/`;

                          const response:any = await axios.get(url,{
                            responseType: 'blob',
                          });
                          console.log(response.data);
                          const blob = new Blob([response.data],{
                            type: 'application/pdf',
                          })
                          const link = document.createElement("a");
                          link.href  = URL.createObjectURL(blob)
                          link.download = `transactions_${data.transaction_id}.pdf`
                          link.click();
                          URL.revokeObjectURL(link.href);
                          toast.success("successfully generate pdf");
                          return response.data;
                        } catch (error: any) {
                          toast.error(error.message);
                        }
                      }}
                    >
                      <Button btntext="generate pdf" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allpayments;

export const alldata = async ()=>{
    try {
        const url = "http://127.0.0.1:8000/api/v1/transactions/";
        const response = await axios.get(url);
        return response.data;
        
    } catch (error:any) {
        return error.message;
    }
}