/*
** React e return e custom html tag as component render korte hobe Capital case e function gula rakhte hobe, otherwise react thinks it as normal HTML tag. but custom tag gular nam e kono html tag nei jar karone kisui render hobe na
    * Capitalization: Renamed briefIntroduction to BriefIntroduction. This tells React it is a custom component and not a built-in HTML tag.
** react e prottekta sibling list e key/id thaka important.
    * Missing Keys: Added key={i.sl} and key={index}. React requires a unique key prop for every element in a list to track changes and optimize rendering.
** react e <br /> is important to add /> not just <br >
** react e CSS attribute gular naam jemon border-radius likhte hobe borderRadius (camelCase e)
* */
import {TAB1_NAME, TAB2_NAME} from "../App.jsx";

function BriefIntroduction() {
    return(
        <div>
            <h2>Info:</h2>
            <p>
                Here I have practiced API CRUD Operations with React and <strong><i>Rabbil bhai's</i></strong> Postman Practice Api
                (<a href="https://documenter.getpostman.com/view/39406886/2sAY4vh3UX" target="_blank" rel="noopener noreferrer">Link</a>)
            </p>
        </div>
    );
}
function TabularTechnologyInformation(){
    const technology_used = [
        {sl:1, name: "React", description: "Frontend Tech"},
        {sl:2, name: "axios", description: "An Ajax tech"},
        {sl:3, name: "milligram", description: "CSS mini framework"},
    ]
    const table_key_names = Object.keys(technology_used[0]);    //Object.keys(your_object[0]) to get the obj key names.

    return (
        <table border='1'>
            <caption><strong>TECHNOLOGIES USED</strong></caption>
            <thead>
                <tr>
                    { table_key_names.map(
                        key_name => <th key={key_name}>{key_name}</th>
                    ) }
                </tr>
            </thead>
            <tbody>
            { technology_used.map(
                i =>
                    <tr key={i.sl}>
                        <td scope="col">{i["sl"]}</td>
                        <td scope="col">{i["name"]}</td>
                        <td scope="col">{i.description}</td>
                    </tr>
            ) }
            </tbody>
            <tfoot>
            <tr>
                <td scope="col" colSpan={3}><strong>Other Features used:</strong> useLocation(), useNavigate(), useEffect(), etc from react-router-dom</td>
            </tr>
            </tfoot>
        </table>
    )
}
function UserManualInformation() {
    return (
        <div>
            <h2>USER MANUAL</h2>
            <p>This Project Implements CRUD Operations, with the below Sequence:</p>
            <ol>
                <li>(R)EAD PRODUCT List <i>[GET method]</i></li>
                <li>(D)ELETE PRODUCT -with ID <i>[GET method]</i></li>
                <li>(C)REATE a PRODUCT -with INFO <i>[POST method]</i></li>
                <li>(U)PDATE a PRODUCT -with ID <i>[POST method]</i></li>
            </ol>
            <pre>
                <strong>Quick Starter:</strong> Go to the <strong>"{TAB1_NAME}"</strong>, to see all the products list and can delete/edit etc to start from there.
            </pre>
        </div>
    );
}

export default function HomePage(){
    return(
        <div className={"container"}>
            <h1 style={{display: 'flex', flexDirection: 'column',
                justifyContent: 'center', // Centers horizontally
                alignItems: 'center'    // Centers Vertically
            }}>Welcome To API Practice App</h1>

            <hr style={{ border: '1px solid black' }}/>
            <div>
                <BriefIntroduction/>
                <TabularTechnologyInformation/>
            </div>
            <hr style={{ border: '1px solid black' }}/>

            <UserManualInformation />
        </div>
    )

}