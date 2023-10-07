import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import dotenv from 'dotenv';
dotenv.config()
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

function Update() {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const router = useRouter()
  const { id } = router.query;

  // const { id: idString } = router.query;
  // const id = Number(idString);

  useEffect(() => {
    if (id) {
      // https://crud-prototype-backend-dmakmh1rk-rohit-pais-projects.vercel.app/
      // axios.get(`https://crud-prototype-backend-dmakmh1rk-rohit-pais-projects.vercel.app/Update/${id}`)
      axios.get(backend_url + "Update/" + id)
      
      // axios.get(`http://localhost:8000/Update/${id}`)
        .then(res => {
          const user = res.data
          setName(user.name)
          setPhone(user.phone)
          setEmail(user.email)
        }).catch(err => console.log(err));
    }
  }, [id]) // id dependecy and if statement ensures the get request runs only after the id value is defined

  const handleSubmit = async (event) => {

    event.preventDefault();

    console.log("gonna_access : " + backend_url + "Update/" + id)

    axios
      // .put(`http://localhost:8000/Update/${id}`, { name, phone, email })
      .put(backend_url + "Update/" + id, { name, phone, email })
      .then(res => {
        router.push('/') // for some reason, .then() isn't accessible
        router.reload()
      }).catch(err => console.log(err))

    await router.push('/') 
    // await router.reload() // this is react code
    // await window.location.reload(); // this is javascript code

  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Update User #{id}</h2>
          {id && ( // this prevents the component from going from uncontrolled to controlled
            <div className='mb-2'>
              <label htmlFor="">ID</label>
              <input type="text" placeholder="Enter ID" className="form-control" value={id} disabled />
            </div>
          )}
          <div className='mb-2'>
            <label htmlFor="">Name</label>
            <input type="text" placeholder="Enter name" className="form-control" value={name}
              onChange={e => setName(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Phone</label>
            <input type="text" placeholder="Enter phone" className="form-control" value={phone}
              onChange={e => setPhone(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="">Email</label>
            <input type="text" placeholder="Enter email" className="form-control" value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Update

