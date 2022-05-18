import beeRequest from './index'
// 请求MV的列表
export function getTopMVs(offset, limit = 10) {
    return beeRequest.get("/top/mv", {
        offset,
        limit
    })
}

/**
 * 请求MV的播放地址
 * @param {number} id 此MV对应的id
 */
export function getMVURL(id) {
    return beeRequest.get('/mv/url', {
        id
    })
}

/**
 * 请求MV的详情
 * @param {number} mvid 此MV对应的id
 */
export function getMVDetail(mvid) {
    return beeRequest.get("/mv/detail", {
        mvid
    })
}

/**
 * 请求此MV相关的MV
 * @param {number}} id 此MV对应的id
 */
export function getRelatedVideo(id) {
    return beeRequest.get("/related/allvideo", {
        id
    })
}   