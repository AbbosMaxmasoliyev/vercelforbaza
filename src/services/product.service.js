import BaseService from "./BaseService"

export const productCreate = async (data) => {
    try {
        let productCreateResponse = await BaseService.post("/product/v1/", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        console.log(productCreateResponse);
        return productCreateResponse
    } catch (error) {
        console.log(error);

    }
}




export const getProductAll = async (query) => {
    try {
        let response = await BaseService.get(`/product/v1${query ? "?" + query : ""}`,)
        console.log(response);

        return response

    } catch (error) {
        console.log(error);
        return error


    }
}






export const productGetById = async (id) => {
    try {
        let response = await BaseService.get(`/product/v1//${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const deleteProduct = async (id) => {
    try {
        let response = await BaseService.delete(`/product/v1//${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const updateProduct = async (id, data) => {
    try {
        let response = await BaseService.put(`/product/v1//${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}

