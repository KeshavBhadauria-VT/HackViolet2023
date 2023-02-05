import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { addNewLamp } from '../config/firebase'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'


const NewLamp = () => {
  const router = useRouter()


  const { user, logout } = useAuth();
  const [data, setData] = useState({
    device: '',
    model: '',
    name: '',
    carbon: 0
  })

  const handleNewLamp = async (e: any) => {
    e.preventDefault()

    try {
      //data.device, data.model, data.name
      // console.log(user);
      addNewLamp(data.device, data.model, data.name, user.email);

      router.push('/dashboard');


      //TODO: create database lamp 
      //   addNewLamp(data.device, data.model)
      //
    } catch (err) {
      console.log(err)
    }

    console.log(data)
  }

  return (
    <div
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <h1 className="text-center my-3 ">Add New Lamp</h1>
      <Form onSubmit={handleNewLamp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Device ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Goove device ID"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                device: e.target.value,
              })
            }
            value={data.device}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Goove model"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                model: e.target.value,
              })
            }
            value={data.model}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            value={data.name}
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Add Lamp
        </Button>
      </Form>
    </div>
  )
}

export default NewLamp;