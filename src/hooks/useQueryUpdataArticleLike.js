import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux';
import axios from 'axios'
export default function useQueryUpdataArticleLike(url, updata) {

    // 获取登录状态
    const { loginState, id } = useSelector(state => state.loginReducer)


    //更新点赞
    const mutation = useMutation((updata) => {
        return axios.post(`http://127.0.0.1:4000/updataarticlelike/${url}`, updata)
    })
    // 点赞按钮
    const linke_mutation = () => {
        if (loginState) {
            mutation.mutate({ data: { userid: id } })
        } else {
            alert('尚未登录')
        }
    }
    return {
        linke_mutation
    }
}