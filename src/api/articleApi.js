import instance from './http'

// 获取频道列表接口
export const getChannelsApi = () => instance.get('/channel')

// 发布文章
export const postArticleApi = (fd) => instance.post('/article', fd)

// 文章筛选
export const queryArticleApi = (params) => instance.get('/article', { params })

// 删除文章
export const delArticleApi = (id) => instance.delete(`/article/${id}`)