import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux';
import axios from 'axios'
export default function useQueryUpdataArticleFavorite(url,updata) {
    // useQuery
    const queryClient = useQueryClient()
    // 获取登录状态
    const { loginState, id } = useSelector(state => state.loginReducer)


    //post收藏更新
    const mutation = useMutation((updata) => {
        return axios.post(`http://127.0.0.1:4000/upfavorite/${url}`, updata)
    })
    // 收藏按钮
    const favorite_mutation = () => {
        if (loginState) {
            mutation.mutate({ data: { userid: id } }, {
                onSuccess: () => {
                    queryClient.invalidateQueries("articles")
                }
            })
        } else {
            alert('尚未登录')
        }
    }
    return {
        favorite_mutation
    }
}