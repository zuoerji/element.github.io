import axios from 'axios'

export function getSeller(){
    return axios.get('/api/seller').then(res=>res.data)
}
export function getGoods(){
    return axios.get('/api/goods').then(res=>res.data)
}