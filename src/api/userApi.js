import instance from "./http"

// 验证码请求
export const getCodeApi = (phone) => instance.get(`/getCode/${phone}`)

// 登陆请求
export const loginApi = (data) => instance.post('/login/phone', data)

// 获取用户信息
export const getProfileApi = () => instance.get('/profile')

// 更新用户信息
export const putProfileApi = (fd) => instance.put('/profile', fd)