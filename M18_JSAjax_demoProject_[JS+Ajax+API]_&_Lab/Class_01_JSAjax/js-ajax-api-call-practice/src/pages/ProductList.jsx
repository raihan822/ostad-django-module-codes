/*
* async.. await => async tells js that longer time required task will happen so heads up, await tells to wait here until this line finished getting data response from the internet or something.
* AJAX => axios/fetch }=> these are used for client side rendering single page app bananor, means without refresh data getting
* useState() for refresh the UI or Rerender just when the data is changed with setVariable(). [so, yeah, useState er karon e function two times execute hoy just to show the updated UI when data is changed]
* useEffect() for impure external net connection with react, the useEffect() block gets executed after all and everything. And at the end finally it refreshes/reRenders with setVariable() of the useState()
*
* */

import axios from "axios";


// My Custom Component Imports
import TableComponent from "../components/table/TableComponent.jsx";

export default async function ProductList(){
    const URL = 'https://crud.teamrabbil.com/api/v1/ReadProduct'
    const response = await axios.get(URL)
    console.log(response.data)

    return (
        <div>
            <h1>Product List</h1>
            <>Will Show data here</>
        </div>
        )
}