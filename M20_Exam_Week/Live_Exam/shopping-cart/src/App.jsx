import ProductList from './pages/ProductList.jsx'
import ViewCart from "./pages/ViewCart.jsx";
import TestComponent from "./pages/Test.jsx";
import TabularTechnologyInformation from "./pages/TechStackUsed.jsx";
import HomePage from "./pages/HomePage.jsx";

import { useState } from 'react'
import './App.css'
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Routes, Route, Link, useLocation} from "react-router-dom";
import {CartProvider} from "./context/CartContext.jsx";

// Nav tab names:
export const TAB_BRAND_NAME = 'ShoppingCART'
export const TAB1_NAME = 'Product List';
export const TAB2_NAME = 'View Cart';

export const EXTRA_TAB1 = 'Used Tech Stack';
export const EXTRA_TAB_TEST = 'Test Component';

function App() {
  const location = useLocation();
  return (
      <Container>
        {/*Section: NAVBAR*/}
        <Navbar expand="md" sticky='top' bg="light">
          <Navbar.Brand as={Link} to="/">{TAB_BRAND_NAME}</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {location.pathname !== '/' && (
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
              )}
              <Nav.Link as={Link} to="/product-list">{TAB1_NAME}</Nav.Link>
              <Nav.Link as={Link} to="/view-cart">{TAB2_NAME}</Nav.Link>

              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/weather">{TAB2_NAME}</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/tech-stack">{EXTRA_TAB1}</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/test-component">{EXTRA_TAB_TEST}</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar.Collapse>
        </Navbar>

        {/*Section: ALL ROUTES Here*/}
        <CartProvider>
        <Routes>
          {/*Show at Homepage:*/}
          <Route path='/' element={<HomePage />} />

          {/*Other Tabs:*/}
            <Route path='/product-list' element={<ProductList />} />
            <Route path='/view-cart' element={<ViewCart />} />


          {/*Optionals Tabs:*/}
          <Route path='/tech-stack' element={<TabularTechnologyInformation />} />
          <Route path='/test-component' element={<TestComponent />} />
        </Routes>
      </CartProvider>

      </Container>
  )
}

export default App
