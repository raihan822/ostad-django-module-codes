/* ------------------ CSS Styling Quirk in REACT ------------------
* in React any css written in or out of a folder into a .css file, the css styling becomes one unified css in React.
so even if u write table css in tablestyle.css file, you will see the effect also in the app.jsx tables.

* To scopify/restrict it down to only into TableComponent.jsx DO THIS:
* =====================================
Use CSS Modules (Recommended):
Rename your file to TableComponent.module.css. This tells React to "scope" the classes so they only apply to the component where they are imported.
In CSS: .table { color: red; }
In JS: import styles from './TableComponent.module.css';
In JSX: <table className={styles.table}>

* i.e:----->>>
 filename.module.css
 and wrote=> .tableComp, table, th, td{}
 then on jsx do, import styles from 'filename.module.css'
 then in code, className={styles.tableComp}
* ======================================
Increase Specificity:
Wrap your table in a unique container ID or class and nest your CSS rules inside it so they don't affect global tables.
// Only affects tables inside TableComponent:
.table-component-container table {
    border: 1px solid blue;
}
* */

/*we use useEffect to render external effects/data. react by default can render internal effects/data of its own jsx files and etc. but from API revicing data, we need external effect handling feature to work in here.
so in react we use useEffect() wtih a func and array.

in modern era 2026 and on, industries uses TanStack in place of useEffect. which is more powerful and far better querying!
* */

import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

// My Custom Components Imports
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
                  <Link to="/">Home</Link> | {" "}
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
