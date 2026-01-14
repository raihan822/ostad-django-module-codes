/**
 Why is passing ProductID on the URL better is than passing/exporting from a component as a state?
 Deep Linking: A user can refresh the Edit page, and it won't break. If you just passed the data via state, refreshing would lose that data.
 Bookmarking: You can bookmark a specific edit page.
 Reliability: The Edit component can fetch the "freshest" data from the API using the ID from the URL
 */
/*
steps of link and redirect and catch from URL:
make navigate with useNavigate() and navigate('RouteKey')
then make Route in App.jsx
then come to redirected page and do, useParams() to catch the navigate RouteKey
* */

/** why I am using useEffect(func, [id]) == on change of id, run. instead of useEffect(func, []) == run once on mount into Ram?
 React is designed for Single Page Applications (SPA). When you navigate from /update/1 to /update/2, React is smart. It sees that the same component (EditProduct) is being used for both URLs. Instead of destroying the component and recreating it (unmounting and mounting), it simply re-renders the existing component with the new parameters.
 If you use [], The useEffect runs only once (when the component first appears). If the user navigates from product 1 to product 2, the id changes, but your useEffect won't fire again, and the form will still show Product 1's data.
 If you use [id], You are telling React: "Hey, every time the id in the URL changes, please re-run my API fetch."
 */

import {useParams, useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import axios from "axios";

// My Custom Components:
import LoaderComponent from "../components/loader/LoaderComponent.jsx";

export default function EditProduct(){
    const {id} = useParams(); //this "id" has to be on the URL and match exactly!!
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        ProductName:"",
        ProductCode:"",
        Img:"",
        UnitPrice:"",
        Qty:"",
        TotalPrice:""
    })
    const [loading, setLoading] = useState(true);   //for tracking GET product info
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);    //for tracking SUBMIT POST btn for update product

    // (GET) Retrieving Product Info DATA:
    useEffect( () => {
        const controller = new AbortController();
        const PRODUCT_DETAILS_URL = `https://crud.teamrabbil.com/api/v1/ReadProductByID/${id}`;

        const fetchData = async ()=>{
            try{
                const response = await axios.get(PRODUCT_DETAILS_URL);
                // AXIOS sends response into response.data
                if (response.data.status === "success"){
                    //my api data is in .data key first idx So,
                    const a_product = response.data.data[0];    //accessing the first array[0] data.
                    setFormData(
                    {
                            ProductName: a_product.ProductName,
                            ProductCode: a_product.ProductCode,
                            Img: a_product.Img,
                            UnitPrice : a_product.UnitPrice,
                            Qty: a_product.Qty,
                            TotalPrice: a_product.TotalPrice
                        }
                    );
                }
                else {
                    console.error(`API FAILURE: ${response.data.status}`);
                }
            }
            catch (err){
                if (axios.isCancel(err)){
                    console.log(`Request Cancelled Manually! Error: ${err.message}`);
                }
                else {
                    setError(err.message);
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchData();
        return ()=> controller.abort();
    }, []); //Run on mount

    // (POST) Updating Product DATA:
    const handleFormData = (e)=>{
        const {name, value} = e.target;
        setFormData(prevState => {
                const nextState = {...prevState, [name]:value};
                // Best practice for Derived Data (auto-calculation during other state updates):
                nextState.TotalPrice = nextState.UnitPrice * nextState.Qty;
                return nextState;
            }
        );
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        // console.log("Handle SUBMIT Triggered. FormData: ",formData);

        const UPDATE_URL = `https://crud.teamrabbil.com/api/v1/UpdateProduct/${id}`;
        const PAYLOAD = formData;
        const updateProduct = async ()=>{
            try{
                const response = await axios.post(UPDATE_URL, PAYLOAD);
                if (response.data.status === "success"){
                    window.alert("Product Updated Successfully!");
                    navigate("/product-list");
                }
                else {
                    window.alert(`API Error: ${response.data.status}`);
                }
            }
            catch (err){
                if (axios.isCancel(err)){
                    console.log("Manual cancellation");
                }
                else {
                    console.error(err.message);
                    window.alert(`Error occurred`);
                }
            }
            finally {
                setIsSubmitting(false); //finally block e disi instead of submit success block cause, POST request successful hok ba na hok, btn will get back to its previous normal SUBMIT btn state.
            }
        }
        updateProduct();
    };



    // Rendering UIs: ==>
    // Others:
    if (loading){
        return <LoaderComponent />
    }
    if (error){
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }
    // Main UI:
    // id="ProductName" name="ProductName"    /* I kept both of them unique. So, any of this can be used as unique identifier in handleFormData() func event, e.target.id/name */
 return(

     <div>
         <h1>Update Product ID: </h1>
         <h4>ID No.: {id}</h4>
         <form onSubmit={handleSubmit}>
             <label htmlFor="ProductName">Product Name</label>
             <input
                 type="text"
                 id="ProductName" name="ProductName"
                 placeholder="Write Product Name"
                 value={formData.ProductName}
                 onChange={handleFormData}
             />


             <label htmlFor="ProductCode">Product Code</label>
             <input
                 type="text"
                 id="ProductCode" name="ProductCode"
                 placeholder="Write Product Code"
                 value={formData.ProductCode}
                 onChange={handleFormData}
             />


             <label htmlFor="Img">Img Info</label>
             <input
                 type="text"
                 id="Img" name="Img"
                 placeholder="Write Img info"
                 value={formData.Img}
                 onChange={handleFormData}
             />


             <label htmlFor="UnitPrice">Unit Price</label>
             <input
                 type="number"
                 id="UnitPrice" name="UnitPrice"
                 placeholder="Write Unit Price"
                 value={formData.UnitPrice}
                 onChange={handleFormData}
             />


             <label htmlFor="Qty">Quantity</label>
             <input
                 type="number"
                 id="Qty" name="Qty"
                 placeholder="Write Quantity"
                 value={formData.Qty}
                 onChange={handleFormData}
             />


             <label htmlFor="TotalPrice">Total Price</label>
             <input
                 style={{border: 'none', outline: 'none', fontWeight: 'bold' }}
                 type="text" id="TotalPrice"
                 placeholder="Total Price (Derived from UnitPrice & Qty)"
                 value={formData.TotalPrice}
                 readOnly
             />

             <button type="submit">{isSubmitting? "Submitting":"Submit"}</button>
         </form>
     </div>
 );
}
