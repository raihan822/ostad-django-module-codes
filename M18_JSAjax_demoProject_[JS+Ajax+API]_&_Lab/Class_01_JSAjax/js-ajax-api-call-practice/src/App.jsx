/** My Mistakes 0 (Mini):
 1. DON'T FORGET TO PUT ; after Code Statements
 2. ARROW func e ()=>{} second braces dile return likhtei hobe must (if return data er necessity theke thake!). and ()=>code; then you don't have to write return (if return data necessity theke thake!). ar jei arrow func e data return er proyojon nei shekhene to ar eishob niye matha ghamanor kisu nai.
 3.
 */
/* ------------------ CSS Styling Quirk in REACT ------------------
* in React any css written in or out of a folder into a .css file, the css styling becomes one unified css in React.
so even if u write table css in tablestyle.css file, you will see the effect also in the app.jsx tables.

* To scope/restrictify it down to only into TableComponent.jsx DO THIS:
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

/*we use useEffect to render external effects/data. react by default can render internal effects/data of its own jsx files and etc. but from API receiving data, we need external effect handling feature to work in here.
so in react we use useEffect() with a func and array.

in modern era 2026 and on, industries uses TanStack in place of useEffect. which is more powerful and far better querying!

WHEN TO do useEffect()?
useEffect is for: “Do something automatically when something changes”
But when you manually interact with a button click or something: “Do something when the user clicks submit” so useEffect not needed
* */
/** what means mounting-unmounting in react app behavior:
 Instead of destroying the component and recreating it on the memory (unmounting and mounting), it simply re-renders the existing component with the new parameters.
 -- generally a component unmounts when you leave the page (resets form/inputs automatically as it unmounts).
 */

/*
Rule: Hooks (anything starting with use) must be called at the very top level of your component function.
    Wrong: Putting it outside the component (it will crash because it needs React's context).
    Wrong: Putting it inside handleEdit (Hooks cannot be called inside nested functions).
    Correct: Inside the component, but outside the helper function.
-------------
To keep your code from breaking, remember these three "Never" rules:
    Never call hooks outside of a function component.
    Never call hooks inside loops, conditions (if statements), or nested functions.
    Always call hooks at the Top Level of your React function.
 */

/* Q: When to use Link and when useNavigate?
<Link tag> == Triggered by a user clicking on the rendered element (an anchor tag).
useNavigate() == Triggered by code execution, such as after form submission, an API call completes, or other logic is run.
* */
import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

// My Custom Components Imports
//Pages:
import HomePage from "./pages/HomePage.jsx"
import ProductList from "./pages/ProductList.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
//Utilities:
import LoaderComponent from "./components/loader/LoaderComponent.jsx";


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
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>

  )
}

export default App
