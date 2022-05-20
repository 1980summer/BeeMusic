import beeRequest from './index'

export function getSongDetail(ids) {
    return beeRequest.get("/song/detail", {
        ids
    })
}