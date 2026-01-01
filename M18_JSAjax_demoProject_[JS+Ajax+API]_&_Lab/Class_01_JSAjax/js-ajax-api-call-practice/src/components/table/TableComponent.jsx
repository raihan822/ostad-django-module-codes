// This Custom Component makes a Table out of a given Object Array [{},{},{}]
import "./TableComponent.css"
export default function TableComponent({
                                         caption="",
                                         dataObjArray,
                                         footNote="" }){
    const NUMBER_OF_COLUMNS = dataObjArray.length;
    const KEY_NAMES = Object.keys(dataObjArray[0]); //list of obj, so took the fist obj only to see its key names.
    const SL = KEY_NAMES[0];    //first key should be sent as serial number of the data

    /*  Note:-
    usee this for CAPITILISED WORD:=>   text.toUpperCase()
    use fort first Char Capped in JS:=>    text.charAt(0).toUpperCase() + text.slice(1)
    * */
    return (
        <table>
            {caption !== "" && <caption><strong>{caption.toUpperCase()}</strong></caption>}
            <thead>
                <tr>
                    {KEY_NAMES.map(
                        (key_name, index) =>
                            <th key={index} scope="col">{key_name.charAt(0).toUpperCase() + key_name.slice(1)}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {dataObjArray.map(
                    data =>
                        <tr key={data[SL]}>
                            {KEY_NAMES.map( (key_name, idx) =>
                                    <td key={idx} scope="col">{data[key_name]}</td>
                            )}
                        </tr>
                )}
            </tbody>
            <tfoot>
                {footNote!=="" &&
                    <tr>
                        <td colSpan={NUMBER_OF_COLUMNS}>{footNote}</td>
                    </tr>}
            </tfoot>
        </table>
    )
}