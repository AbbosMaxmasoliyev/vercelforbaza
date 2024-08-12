import BaseService from "./BaseService"

export const createManager = async (data) => {
    try {
        let createManager = await BaseService.post("/menejer/v1/", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(createManager);

    } catch (error) {
        console.log(error);

    }
}




export const getManagers = async (query) => {
    try {
        let response = await BaseService.get(`/menejer/v1/${query ? "?" + query : ""}`,)
        console.log(response);

        return response

    } catch (error) {
        console.log(error);
        return error


    }
}






export const managerGetById = async (id) => {
    try {
        let response = await BaseService.get(`/menejer/v1//${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const deleteManager = async (id) => {
    try {
        let response = await BaseService.delete(`/menejer/v1//${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const updateManager = async (id, data) => {
    try {
        let response = await BaseService.put(`/menejer/v1//${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}

