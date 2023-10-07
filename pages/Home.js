import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router';
import dotenv from 'dotenv';
import path from 'path';

// dotenv.config()
dotenv.config({ path: path.resolve('../.env') });

// const PORT = process.env.PORT;
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

function Home() {

  const [data, setData] = useState([]);

  const router = useRouter()

  useEffect(() => {
    // console.log('process.env.PORT:', process.env.PORT); // Add this line
    // axios.get(`http://localhost:${PORT}`)
    console.log("NEXT_PUBLIC_BACKEND_URL : " + process.env.NEXT_PUBLIC_BACKEND_URL)
    // axios.get(process.env.NEXT_PUBLIC_BACKEND_URL)
    axios.get(backend_url)
      // axios.get(`http://localhost:8000/`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }) // don't add empty array dependency. That will prevent the page from reflecting changes after delete

  // const handleUpdate = async (id) => {

  //   console.log("handle delete for id = " + id)

  //   await axios.get(backend_url + "Update/" + id)

  //     // axios.get(`http://localhost:8000/Update/${id}`)
  //     .then(res => {
  //       const user = res.data
  //       setName(user.name)
  //       setPhone(user.phone)
  //       setEmail(user.email)
  //     }).catch(err => console.log(err));

  //     await router.push(`/Update/${id}`)
  // }

  const handleDelete = (id) => {
    console.log("delete url : " + backend_url + id)
    axios
      // .delete(`http://localhost:8000/Delete/${id}`)
      .delete(backend_url + "Delete/" + id)
      // .then(res => { 
      //   router.push('/') // not being triggered
      // })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark vh-100 '>
      <div className='bg-white rounded w-50 p-3'>
        <h2>My CRUD App</h2>
        <Link href="/Create" className='btn btn-success'>Add +</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {Array.isArray(data) && data.map( (d, i) => ( */}
            {data.map((d, i) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.phone}</td>
                <td>{d.email}</td>
                <td>
                  <Link href = {`/Update/${d.id}`} className = "btn btn-sm btn-primary">Update</Link>
                  {/* <button onClick={e => handleUpdate(d.id)} className="btn btn-sm btn-primary">Update</button> */}
                  <button onClick={e => handleDelete(d.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home

