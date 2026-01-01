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