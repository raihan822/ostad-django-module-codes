import {useState, useEffect} from "react";
import axios from "axios";

export default function CreateProduct(){
    const [formData, setFormData] = useState({
        ProductName:"",
        ProductCode:"",
        Img:"",
        UnitPrice:"",
        Qty:"",
        TotalPrice:""
    })
    // To prevent double-submissions and show UI feedback
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Setting Derived variable (means, auto calculated) [below is not the best practice]:
    useEffect(()=>{
        setFormData( (prev) => ({...prev, TotalPrice : (prev.UnitPrice * prev.Qty)}) //orthat, ..prev ja ase tai, just TotalPrice ta change hobe on change of formData.UnitPrice, formData.Qty
            );  //for this react have to double render on change so, better to do this task in handleFormData on change all together.
                // User types → state changes → effect runs → state changes again → render
    }
            ,[formData.UnitPrice,formData.Qty]  //this is also a reason that you can just take prev or from formData.UnitPrice direct, both are newest data!
    );
    /** The above useEffect's prev is the newest cause its not taking from somewhere else and its taking only AFTER unitprice/Qty is CHANGED otherwise not so, only if new data enterd then do! its using whatever is saved in the state and calculating with it*/

    /** But the below func prev case: This is where new data enters into your system from Browser where user typed into your code- the react state! so e.target has the newest values!*/
    const handleFormData = (e_newDataEvent)=>{  //this e is the syntehticEvent passed automatically from the html tag when called onChange
        // this func doesn't need to return anything because, kono return data er proyojon nei, direct set kore ditesi value so. React doesn't use the return value from here!.
        // e as 'e_newDataEvent' is the new current data.
        // console.log(e_newDataEvent);
        /** e == 'e_newDataEvent'
         * e is containing the new data "Email", and prev is everything else as of of the previous state!
         * If you type in the Email field, e.target.name tells React: "Update the email part of the state".
            * prev is the snapshot of everything else currently in that state (like the Username and Password etc you already typed).
         * then you make (prev) => ( {BRAND NEW OBJECT to be returned} )
         * then you copy the everything else called prev datas by ...prev ope into the {}
         * then you just change the value of the key that matches with any of the unique key name you set in the <input /> like name, id, value etc...
            * , [id]:value} //matched id with new value caught from "e"
         */

        /* Catching the new data into my variables by destructuring the keys with the same name from Input Tag:-
         * "id" or "name" (I kept them unique in Input Tag),
            * any of this can be used as unique identifier in handleFormData() event e.target
            <input  type="text"
                    id="ProductName" name="ProductName"
                    placeholder="Write Product Name"
                    value={formData.ProductName}
                    onChange={handleFormData}
                />
        * and the e.target.value is always the value of the html tag I caught on to this function!
        * */
        const {id, value} = e_newDataEvent.target;
        // setting the new data to my state variable and also copying the other things into new object{}:-
        setFormData(
            (prevState) =>
                (
                    {...prevState, [id]:value}
                    /** better solution than useEffect(for Derived veriable TotalPrice)?! [below is the best practice]
                     { const nextState = {...prevState, [id]:value}
                     // Update TotalPrice immediately in the same state update
                     nextState.TotalPrice = nextState.UnitPrice * nextState.Qty;
                     return nextState;  }//just when return, react re-renders!!!!!
                     * */
                )

        );
    };
    const handleSubmit = async (e)=>{
        e.preventDefault(); // Always Add this line on Submit
        setIsSubmitting(true);
        // console.log("after submit formData:", formData);
        const PAYLOAD = formData
        const CREATE_URL ='https://crud.teamrabbil.com/api/v1/CreateProduct';

        try{
            const response = await axios.post(CREATE_URL, PAYLOAD);
            if (response.data.status === "success"){
                window.alert("Product Created Successfully!");
                // Reset form after success:
                setFormData({
                    ProductName:"",
                    ProductCode:"",
                    Img:"",
                    UnitPrice:"",
                    Qty:"",
                    TotalPrice:""
                });
            }
            else {
                window.alert(`API Error: ${response.data.status}`);
            }
        }
        catch (e){
            console.error(`Error occurred: ${e}`);
            window.alert(`Error occurred`);
        }
        finally {
            setIsSubmitting(false);  //finally block e disi instead of submit success block cause, POST request successful hok ba na hok, btn will get back to its previous normal SUBMIT btn state.
        }

        // return;
    };

    return (
        <div>
            <h1>Add New Product</h1>
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
                    type="text"
                    id="TotalPrice"
                    placeholder="Total Price (Derived from UnitPrice & Qty)"
                    value={formData.TotalPrice}
                    readOnly
                />

                <button type="submit">{isSubmitting? "Submitting":"Submit"}</button>
            </form>
        </div>
    );
}