import beeRequest from './index'

export function getSearchHot() {
    return beeRequest.get("/search/hot")
}