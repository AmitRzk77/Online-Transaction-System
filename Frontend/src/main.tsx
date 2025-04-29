import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Allpayments, { alldata } from './components/Pages/Allpayments.tsx'
import Layout from './Layout.tsx'

const router = createBrowserRouter(
createRoutesFromElements(
  <Route path='/' element={<Layout/>} >
      <Route path='/' element={<App/>} />
      <Route path='/allpayments' element={<Allpayments/>} loader={alldata}/>
  </Route>
)
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     
    <RouterProvider  router={router} />
  </StrictMode>,
)
