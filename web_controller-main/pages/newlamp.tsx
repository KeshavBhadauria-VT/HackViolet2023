import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const NewLamp = () => {
  const [data, setData] = useState({
    device: '',
    model: '',
  })

  const handleNewLamp = async (e: any) => {
    e.preventDefault()

    try {
      await (data.device, data.model)
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
          <Form.Label>Password</Form.Label>
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

        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  )
}

export default NewLamp;