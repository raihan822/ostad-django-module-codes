// This Custom Component makes a Table out of a given Object Array [{},{},{}]
export default function TableElement({caption, dataObjArray, styleObj={} }){
    const NUMBER_OF_COLUMNS = dataObjArray.length;
    const KEY_NAMES = Object.keys(dataObjArray);


    return (
        <table style={styleObj}>
            <caption>{caption}</caption>
            <thead>
                <tr>
                    {KEY_NAMES.map(
                        (key_names, index) => (
                            <th key={index} scope="col">{key_names}</th>
                        )
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>aa</td>
                    <td>bb</td>
                    <td>cc</td>
                </tr>
                <tr>
                    <td>cc</td>
                    <td>bb</td>
                    <td>aa</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={NUMBER_OF_COLUMNS}>cc1</td>
                </tr>
                {/*<tr>*/}
                {/*    <td>cc2</td>*/}
                {/*    <td>cc3</td>*/}
                {/*</tr>*/}
            </tfoot>
        </table>
    )
}