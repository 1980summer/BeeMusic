import beeRequest from './index'
export function getBanners() {
    return beeRequest.get("/banner", {
        type: 2
    })
}