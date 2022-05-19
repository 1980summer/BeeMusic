import beeRequest from './index'
export function getBanners() {
    return beeRequest.get("/banner", {
        type: 2
    })
}

export function getRanking(idx) {
    return beeRequest.get("/top/list", {
        idx
    })
}