import { fetch } from '@/axios-config/axios'

export const getUserListApi = ({ params }) => {
  return fetch({ url: '/user/list', method: 'get', params })
}
