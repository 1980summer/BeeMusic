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

export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
    return beeRequest.get("/top/playlist", {
        cat,
        limit,
        offset
    })
}

export function getSongMenuDetail(id) {
    return beeRequest.get("/playlist/detail/dynamic", {
        id
    })
}