import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import dotenv from 'dotenv';
dotenv.config()
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

function Create() {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const router = useRouter()

  const handleSubmit = (event) => {

    event.preventDefault();

    axios
    // .post('http://localhost:8000/Create', {name, phone, email})
    .post(backend_url + "Create", {name, phone, email})
    .then(res => {
      // console.log("gonna call router.push('/')")
      // router.push('/')
    }).catch(err => console.log(err))

    router.push('/')
    
  }

  return (
    <div className = 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className = 'w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className = 'mb-2'>
            <label htmlFor="">Name</label>
            <input type = "text" placeholder="Enter name" className = "form-control"
            onChange = { e => setName(e.target.value)}/>
          </div>
          <div className = 'mb-2'>
            <label htmlFor="">Phone</label>
            <input type = "text" placeholder="Enter phone" className = "form-control"
            onChange = { e => setPhone(e.target.value)}/>
          </div>
          <div className = 'mb-2'>
            <label htmlFor="">Email</label>
            <input type = "text" placeholder="Enter email" className = "form-control"
            onChange = { e => setEmail(e.target.value)}/>
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create

