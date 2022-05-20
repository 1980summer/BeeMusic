// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest } from '../../service/api-search'
// 导出时如果写的时 export default 就不用写花括号
import debounce from '../../utils/debounce'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({

    data: {
        hotKeyWords: [],
        suggestSongs: [],
        searchValue: "",
        suggestSongsNodes: []
    },
    onLoad(options) {
        // 1 获取页面的数据
        this.getPageData()
    },

    // 网络请求
    getPageData: function () {
        getSearchHot().then(res => {
            this.setData({ hotKeyWords: res.result.hots })
        })

    },
    // 事件处理
    handleSearchChange: function (event) {
        // 1 获取输入的关键字
        const searchValue = event.detail

        // 2 保存关键字
        this.setData({ searchValue })

        // 3 判断关键字为空字符的处理逻辑
        if (!searchValue.length) {
            this.setData({ suggestSongs: [] })
            return
        }

        // 4 根据关键字进行搜索
        debounceGetSearchSuggest(searchValue).then(res => {
            // 1-获取建议的关键字歌曲
            const suggestSongs = res.result.allMatch
            this.setData({ suggestSongs })

            // 2-转成nodes节点
            const suggestKeyWords = suggestSongs.map(item => item.keyword)
            const suggestSongsNodes = []
            for (const keyword of suggestKeyWords) {
                const nodes = []
                // startsWith 判断某个数据是否以XXX开头(es6)
                // 大小写都匹配
                if (keyword.toUpperCase().startsWith(searchValue.toUpperCase())) {

                    const key1 = keyword.slice(0, searchValue.length)
                    const node1 = {
                        name: "span",
                        attrs: { style: "color: #26ce8a;" },
                        children: [{ type: "text", text: key1 }]
                    }
                    nodes.push(node1)
                    const key2 = keyword.slice(searchValue.length)
                    const node2 = {
                        name: "span",
                        attrs: { style: "color: #000;" },
                        children: [{ type: "text", text: key2 }]
                    }
                    nodes.push(node2)
                } else {
                    const node = {
                        name: "span",

                        attrs: { style: "color: #000;" },
                        children: [{ type: "text", text: keyword }]
                    }
                    nodes.push(node)
                }
                suggestSongsNodes.push(nodes)
            }
            this.setData({ suggestSongsNodes })
        })

    }
})