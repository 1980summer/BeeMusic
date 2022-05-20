// pages/detail-songs/index.js
import { rankingStore } from '../../store/index'
import { getSongMenuDetail } from '../../service/api_music'
Page({

    data: {
        ranking: "",
        songInfo: {},
        type: ""

    },
    onLoad(options) {
        // 获取type
        const type = options.type
        this.setData({ type })
        if (type === "menu") {
            const id = options.id
            getSongMenuDetail(id).then(res => {
                this.setData({ songInfo: res.playlist })
            })


        } else if (type === "rank") {
            // 获取传过来的 rankingName
            const ranking = options.ranking
            this.setData({ ranking: ranking })

            // 1 获取共享数据
            // 可以直接从 store 里根据 onstate 拿到对应的数据, 更新到 data 的 ranking 上
            rankingStore.onState(ranking, this.getRankingDataHandler
            )
        }

    },

    onUnload() {
        if (this.data.ranking) {
            // 取消掉
            rankingStore.offState(this.data.ranking, this.getRankingDataHandler)
        }

    },

    getRankingDataHandler: function (res) {
        this.setData({ songInfo: res })
    }

})