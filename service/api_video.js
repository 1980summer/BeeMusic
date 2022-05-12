import beeRequest from './index'

export function getTopMVs(offset, limit = 10) {
  return beeRequest.get("/top/mv", {
    offset,
    limit
  })
}
