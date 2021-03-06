
import { HYEventStore } from 'hy-event-store'
import { getRanking } from '../service/api_music'

const rankingMap = { 0: "newRanking", 1: "hotRanking", 2: "originRanking", 3: "upRanking" }

const rankingStore = new HYEventStore({
    state: {
        newRanking: {}, // 0 新歌
        hotRanking: {}, // 1：热歌
        originRanking: {}, // 2：原创
        upRanking: {}, // 3：飙升
    },
    actions: {
        getRankingDataAction(ctx) {
            for (let i = 0; i < 4; i++) {
                getRanking(i).then(res => {
                    const rankingName = rankingMap[i]
                    ctx[rankingName] = res.playlist
                })
            }
        }
    }
})

export {
    rankingStore,
    rankingMap
}