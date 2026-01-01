import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

// Custom Components Imports
import HomePage from "./pages/HomePage.jsx"
import ProductList from "./pages/ProductList.jsx";


export const TAB1_NAME = 'See All Products'
export const TAB2_NAME = 'Create Product'
// main:
function App() {
  // kept const cause, I am not gonna manually change the value. dynamically change hobe!
  const location = useLocation(); //made an instance of the function, not nacessary but dont do useLoca().pathname inside return cause it may cause render issue. You can even do const {pathname} = useLocation();
  return (
      <div className={"container"}>
        <nav>
          { location.pathname === "/"? null: (
              //react always renders a single component Returned from a condition or function So, <></>
              <>
                  <Link to="/">Home</Link> | " "
              </>
          ) }
          <Link to="/product-list">{TAB1_NAME}</Link> | {" "}
          <Link to="/create-product">{TAB2_NAME}</Link>
        </nav>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </div>

  )
}

export default App
