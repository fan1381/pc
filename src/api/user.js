import request from '../utils/request'
import { articles, open } from '../url/url'
export function getArticle (data) {
  return request({
    url: articles,
    data
  })
}
export function on (params, data) {
  return request({
    url: open,
    method: 'PUT',
    params,
    data
  })
}
