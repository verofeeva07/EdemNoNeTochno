import axios from 'axios'

export class HTTP {
    static baseURL = process.env.REACT_APP_BACKEND_URL
    static headers = {
        'Content-Type': 'application/json',
        "Accept": '*/*',
        'Access-Control-Allow-Origin': '*'
    }
    static get = async (endpoint, params) => {
        try {
            const {data} = await axios.get(this.baseURL + endpoint, {params, headers: this.headers})
            return data
        } catch (e) {
            if (axios.isAxiosError(e)){
                console.log("[Request error]: ", e.message)
            } else {
                console.log("[JS]: ", e.message)
            }
        }
    }
    static post = async (endpoint, data) => {
        try {
            const {data: response_data} = await axios.post(this.baseURL + endpoint, data, { headers: this.headers})
            return response_data
        } catch (e) {
            if (axios.isAxiosError(e)){
                console.log("[Request error]: ", e.message)
            } else {
                console.log("[JS]: ", e.message)
            }
        }
    }
}