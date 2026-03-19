import useFetch from "./useFetch.jsx";
import {BASE_URL} from "../api/baseUrl.js";

//product api call:
export default function useProductsList(){
    const {
        data: myProductList,
        loading: isProductListLoading,
        fetchData: fetchProducts
    } = useFetch(
        `${BASE_URL}/products`,
        'get',
        {},
        true
    );
    const productList = myProductList??[];

    return {    //returned as dictionary
        productList,
        isProductListLoading,
        fetchProducts
    };
}