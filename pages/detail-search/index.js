// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest, getSearchResult } from '../../service/api-search'
// 导出时如果写的时 export default 就不用写花括号
import debounce from '../../utils/debounce'
import stringToNodes from '../../utils/string2nodes'
const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({

    data: {
        hotKeyWords: [],
        suggestSongs: [],
        searchValue: "",
        suggestSongsNodes: [],
        resultSongs: []

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
                const nodes = stringToNodes(keyword, searchValue)
                suggestSongsNodes.push(nodes)
            }
            this.setData({ suggestSongsNodes })
        })

    },
    // A 点击搜索框发送请求  
    handleSearchAction: function () {
        // 获取搜索框里的字, 根据这个关键字发送网络请求
        const searchValue = this.data.searchValue
        getSearchResult(searchValue).then(res => {
            this.setData({ resultSongs: res.result.songs })
        })
    },
    // B 点击搜索建议发送请求
    handleSuggestItemClick: function (event) { // event 包含传过来的 index
        const index = event.currentTarget.dataset.index
        // 1 通过 index 拿到关键字
        const keyword = this.data.suggestSongs[index].keyword
        // 2 将关键字放到搜索框中
        this.setData({ searchValue: keyword })
        // 3 发送网络请求
        this.handleSearchAction()
    },

    // C 点击热门搜索发送请求
    handleTagItemClick: function (event) {
        const keyword = event.currentTarget.dataset.keyword
        this.setData({ searchValue: keyword })
        this.handleSearchAction()
    }

})