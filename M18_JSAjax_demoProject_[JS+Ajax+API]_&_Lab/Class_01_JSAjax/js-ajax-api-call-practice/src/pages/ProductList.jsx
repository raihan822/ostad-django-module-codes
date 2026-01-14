/* always const gula SCREAMING_SNAKE_CASE hoy but react er khetre tai hobe but onnno normal variable jegulo ekbar set howar pore ar change hobe na
shegulo o amra const declare korleo camelCase kore dibo. [just on REACT]
* */

// 1. React Best Practice (How everyone writes api call):
/*
Best Practice: Correct Way in React + Vite
✔ Key rules:
    Use useEffect() for API calls and stop infinity loop call,
    Use useState() to store data and Rerun func to show/render UI with api data
    Handle loading & error states variables too, to show loading screen and handle any api call fail errors.

API → useEffect (with arrow func/js IIFE func, []) → useState → UI re-render

And no you cant do like,
useEffect(async () => {
   ...
}, []);

Because useEffect must return either:
    nothing (undefined)
    or a cleanup function
An async function returns a Promise, which React doesn’t want.
*/



// 2. My Mistakes:
/* My Mistakes 1: DO NOT WRITE async before func component like "export default async function"
In standard React, components must be synchronous functions. React expects a component to return JSX (HTML) immediately.
[BUT, normal JavaScript functions gulay async function x(){await} kora jabe for example, sub function like deleteAPI etc.
 but React component function gulay async howa jabe na o just HTML return korbe bas etai kaj!]

    In a React + Vite (client-side) app:
    React components must be synchronous
    async/await cannot be used directly in the component function
    async components are only allowed in Next.js Server Components, not normal React.
* REACT is a Client side rendering, Next.js is Server side rendering.
Only the Next.js Server Components allow async components "export default async function".
If you aren't using Next.js, this React app will throw an error.
* */

/* My Mistakes 2: You didnt use useEffect() with useState():
`const response = await axios.get(URL)`
It causes:
    Infinite render loop risk
    API call on every render
    No control over loading / error states
👉 In React, side effects (API calls) must go inside useEffect().
* */

// Notes:
/* Why should I do trippled ===, !== insted of doubled?
5 != "5" is false (JavaScript converts the string to a number and then tries to match).
5 !== "5" is true (type also different here. trppled e exact match hoite hoy. the types—number and string—are different). So this one is better and always used now a days

* */

/* What are async..await, Ajax, useState, useEffect?:
* async.. await => async tells js that longer time required task will happen so heads up, await tells to wait here until this line finished getting data response from the internet or from modules.
* await e wait kore and pormise return kore rakhe je she amake promise kortse she result dibe and promise kore she nicher lines a execute korte chole jay
* and oije promise korsilo oitar karon e result ashle then.... react rerenders it?
*
* AJAX => axios/fetch }=> these are used for client side rendering single page app bananor, means without refresh data getting
* useState() for refresh the UI or Rerender just when the data is changed with setVariable(). [so, yeah, useState er karon e function two times execute hoy just to show the updated UI when data is changed]
* useEffect() for impure external net connection with react, the useEffect() block gets executed after all and everything. And at the end finally it refreshes/reRenders with setVariable() of the useState()
* */


/* How react works internally:
    Jotokkhon api call kore response ashte thakbe totokkhon loeading spinner/loading screen dekhanor jonno we took loading variable.
and returned with loading UI html
and the main UI html chilo oitar niche, sheta ki render kokhonoi hobe na jodi react ekhan theke ber hoye jay? YES Hobe! after it gets the
api response after maybe 2/3s of the other rendered htmls.
karon useEffect(0 er karon e ei api call jinish ta function call execution sesh howar por ekdom sesh e useEffect niye boshbe react.
and just when useState er variable e changes ashbe due to api response (state variable setVar), then react will come back to this function again to rerender the UI of it.

==> The key is realizing that, React calls this function multiple times. It isn't a "run once and done" script;
it's a loop managed by React's engine.

==> If the function just "waited" for the API (like a standard script), the user would see a completely blank white screen for 2 seconds while the internet was working.
    In React, think of the return not as the "end of the program," but as the "Answer for right now."
    Question: "What should I show right now?"
    Answer 1 (at 0ms): "Show the loading div."
    Answer 2 (at 500ms): "Now that the data is here, show the table."
* */
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// My Custom Component Imports
import LoaderComponent from "../components/loader/LoaderComponent.jsx";
import TableComponentPro from "../components/table/TableComponentPro.jsx";
import ButtonComponent from "../components/button/ButtonComponent.jsx";

// Helper Function:     (Helper Functions will be thoese who are independent logically. like getPartialMatch(), sum() etc operation )
                        // Since, handleEdit and handleDelete() are not independent logic, infact a part of the ProductList() mother function so i keep them packed inside the mother func.

// Main Page-Component Function:
export default function ProductList(){      //React component func, must be synchronous
    const navigate = useNavigate(); //anything with use keyword should be inside the mother func in react, and not in sub func

    /*    below func are kept inside the mother func cause they needs access to the context also of the useHooks data, like useNavigate() Map() func context, which is available on inside this mother block scope!
        also these are not independent logical function, rather a part of the mother func instead. so I keep them packed inside the mother.
    */
    function handleEdit(id){    //generally industry te component er vitor e ei sub function gula arrow func akare likha hoy (best practice) not like this
        if (!id) {
            console.warn("Attempted to edit an item with no ID!");
            return;
        }
        console.log(`You clicked EDIT Button with ID: ${id}`);
        navigate(`/edit/${id}`); //you must have this navigate RouteKey in the Route declared
    }

    /*  Question: Should I filter and show with prev.filter() or should I do a ProductList() call or something to refresh the list?
        The Best Practice for Delete:
        - Use the local filter for a smooth experience (Industry standard),
        - but if your application is highly collaborative (meaning other people are deleting items at the same time),
          a re-fetch ensures your list is 100% accurate. For most CRUD apps, the Local Filter is preferred.
     */
    async function handleDelete(id){    //generally industry te component er vitor e ei sub function gula arrow func akare likha hoy (best practice) not like this
        if (!id) {
            console.warn("Attempted to delete an item with no ID!");
            return;
        }
        const IS_DELETE_CONFIRMATION = window.confirm("Sure to Delete this Product?")
        if (!IS_DELETE_CONFIRMATION) return;

        try{
            const DELETE_URL = `https://crud.teamrabbil.com/api/v1/DeleteProduct/${id}`
            const response = await axios.get(DELETE_URL);
            /* Response:
            {
                "status": "success",
                "data": {
                    "acknowledged": true,
                    "deletedCount": 1
                }
            }
            * */
            if (response.data.status === "success"){
                setProducts(prevState => { //this prevState is an array type, (we declared in useState([]))
                        //Curly braces disi so MUST RETURN likhtei hobee!!!!
                    return prevState.filter(item => item._id !== id); //filter accepts if True only
                    }
                )
            }
            else {
                window.alert("Delete failed on server.");
            }
        }
        catch (e){
            console.log(`Delete failed! Error: ${e}`)
            window.alert("Network error during delete.");
        }
    }

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = 'https://crud.teamrabbil.com/api/v1/ReadProduct'

    // API Call:
    useEffect(() => {
        //React calls executes everything two  times due to strict mode. So I want to cancel/cleanup 1st call when the 2nd and final one starts.
        const controller = new AbortController();

        // API Calling function:
        const getProductData = async ()=>{
            try{
                //Step 1: API Call
                const response = await axios.get(URL);
                //Step 2: Updating myData State
                if (response.data.status === "success"){    // Note: Axios pushes the API result in .data [so response.data then .yourTargetKey names from API response]
                    setProducts(response.data.data); //in this setVer, React will rerender then will set value to products //in the api "data" key is a list of dict [{},{},{}] so I destructured upto this so set to setProducts
                    // setProducts((prevState) => {
                    //     const nextState = response.data.data;
                    //     console.log("Actual Previous State:", prevState); // This will be []
                    //     console.log("Actual New State being set:", nextState); // This will be the fetched datas. // will be set after re-render!
                    //     return nextState;
                    // });
                } else{ setError("Failed to fetch valid data structure") }
            }
            //Step 3: Catch any errors Updates
            catch (err){
                if (axios.isCancel(err)){   //manually err.message !== "CanceledError" korar cheye, axios thekei isCancel(value) provide kore jeta dynamically any type of cancellation msg catch korte pare and match korte pare amader if condition er sathe.
                    // so, axios theke provide kora func diye condition match korano bhalo, to check if used cancel/changed page, so api call complete hoy nai and error ta kono error na instead, just a cancellation. so we'll not update the errorState. just log a print korbo thats all!
                    console.log(`Request Cancelled Manually! Error: ${err.message}`);
                }
                else{
                    setError(err.message);
                }
            }
            //Step 4: Finally Update loading state
            finally {
                setLoading(false);
            }
        };
        // Call the Function:
        getProductData();

        //useEffect() er return eta. so controller.abort() func akare rekhe jacchi eta react nije call korbe future e (when unmounts). ar api call function ami call kore disi cause eta immidietly dokar during rendering so.
        //useEffect() er return e ()=>{] arrow func e likhte hoy jei kaj gula all finished and react starts to unmount oi shomoy sudhu run korte chai she jonno!

        /*WHY REACT CALLS this portion by itself and I don't have to call the function manually?
        react renders only the return portion itself always! So, react k diye future e koraite chaile ba onClick js e kichu korte chaile
        ALWAYS USE ARROW FUNCTION ()=>{..}
        * */
        return () => controller.abort();    //react will render this|| Cleans up the strictmode's 1st call, and lets the 2nd and final call keep executing. as that was redundant to perform but strctMode is important to keep!
    }, []);     // finished useEffect();

    // Rendering UIs: ==>
    // Others:
    if (loading) {
        return <LoaderComponent />;}
    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;}

    // Main UI:
    const columnConfiguration = [
        {header : "Product Name", key: "ProductName"},
        {header : "Product Code", key: "ProductCode"},
        {header : "Unit Price", key: "UnitPrice"},
        {header : "Quantity", key: "Qty"},
        {header : "Total Price", key: "TotalPrice"},
        {header : "Actions",
            render :
                (apiData)=>    //Ekhane just any thing x then vitroe x._id as api te _id name e key chilo. so table component e jeye ei x er jagay data disi and data._id
                    <div
                        style={{display: "flex", justifyContent: "space-around"}}>
                        <ButtonComponent onClickFunc={()=> handleEdit(apiData._id)} buttonTitle={"Edit"}/>
                        <ButtonComponent onClickFunc={()=> handleDelete(apiData._id)} buttonTitle={"Delete"} styleObj={{backgroundColor: "red"}}/>
                    </div>
        },
    ]

    return (
        <div>
            <h1>Product List</h1>
            {/*<TableComponent dataObjArray={products} excludedKeys={['_id', 'Img', 'CreatedDate']} />*/}
            <TableComponentPro dataObjArray={products} columns={columnConfiguration} />
        </div>
        )
}