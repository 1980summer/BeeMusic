import beeRequest from './index'

export function getSearchHot() {
    return beeRequest.get("/search/hot")
}

export function getSearchSuggest(keywords) {
    return beeRequest.get("/search/suggest", {
        keywords,
        type: "mobile"
    })
}