import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "http://localhost:5000/api/"
axios.defaults.withCredentials = true; //อนุญาตให้เข้าถึงคุกกี้ที่ browser ได้

const sleep = () => new Promise(resolve => setTimeout(resolve, 500)); //delay

const responseBody = (response: AxiosResponse) => response.data;

//แนบ token ไปกับ Header
axios.interceptors.request.use((config: any) => {
    const token = store.getState().account.user?.token; //เรียกใช้ State โดยตรง
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

//You can intercept requests or responses before they are handled by then or catch.
//.use มี Promise คือ onFullfill กรณีสำเร็จ onReject กรณีมีข้อผิดพลาด
axios.interceptors.response.use(async response => {
    await sleep()
    
    const pagination = response.headers['pagination']; //ส่งมาจาก ProductController
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

    return response
}, (error: AxiosError) => {
    console.log('caught by interceptor')
    const { data, status } = error.response!
    var json = JSON.stringify(data)
    var result = JSON.parse(json) //แปลงเป็น object

    switch (status) {
        case 400:
            //ตรวจสอบค่าที่ส่งมาจาก GetValidationError()
            if (result.errors) {
                const modelStateErrors: string[] = [];
                for (const key in result.errors) {
                    if (result.errors[key]) {
                        modelStateErrors.push(result.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(result.title);
            break;
        case 401:
            toast.error(result.title || 'Unauthorized');
            break;
        case 403:
            toast.error('You are not allowed to do that!');
            break;
        case 500:
            history.push('/server-error', { state: data })
            toast.error(result.title);
            break;
        default:
            break;
    }

    return Promise.reject(error.response) //ส่งไปให้ catch(error) นำไปใช้ได้เลย
})

//params?: URLSearchParams ใช้รับค่าพารามิเตอ์แบบออบเจคที่มีหลายๆค่า เทีบบเท่า query string
const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),

}

const TestErrors = {
    get400Error: () => requests.get('buggy/GetBadRequest'),
    get401Error: () => requests.get('buggy/GetUnAuthorized'),
    get404Error: () => requests.get('buggy/GetNotFound'),
    get500Error: () => requests.get('buggy/GetServerError'),
    getValidationError: () => requests.get('buggy/GetValidationError'),
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters'),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress')
}

const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Payments = {
    createPaymentIntent: () => requests.post('payments', {})
}

const agent = {
    TestErrors,
    Catalog,
    Basket,
    Account,
    Orders,
    Payments
}

export default agent;