import BaseService from "./BaseService"

export const createCleint = async (data) => {
    try {
        let createClientResponse = await BaseService.post("/client/v1", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(createClientResponse);

    } catch (error) {
        console.log(error);

    }
}




export const getUsers = async (query) => {
    try {
        let clientResponse = await BaseService.get(`/client/v1${query ? query : ""}`,)
        return clientResponse

    } catch (error) {
        console.log(error);
        return error


    }
}






export const clientGetById = async (id) => {
    try {
        let response = await BaseService.get(`/client/v1/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const deleteUser = async (id) => {
    try {
        let response = await BaseService.delete(`/client/v1/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const updateClient = async (id, data) => {
    try {
        let response = await BaseService.put(`/client/v1/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}

