import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const NavbarComp = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>NextJS Firebase Auth</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <div>

                
                <Navbar.Brand
                  onClick={() => {
                    logout()
                    router.push('/login')
                  }}
                >
                  Logout
                </Navbar.Brand>
                <Navbar.Brand
                  onClick={() => {
                    router.push('/dashboard')
                  }}
                >
                  dashboard
                </Navbar.Brand>
                <Link href="/newlamp" passHref>
                  <Navbar.Brand>Add Lamp</Navbar.Brand>
                </Link>
                <Link href="/profile" passHref>
                  <Navbar.Brand>User Profile</Navbar.Brand>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Navbar.Brand>Signup</Navbar.Brand>
                </Link>
                <Link href="/login" passHref>
                  <Navbar.Brand>Login</Navbar.Brand>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComp