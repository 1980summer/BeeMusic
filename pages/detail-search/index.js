// pages/detail-search/index.js
import { getSearchHot, getSearchSuggest } from '../../service/api-search'
// 导出时如果写的时 export default 就不用写花括号
import debounce from '../../utils/debounce'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({

    data: {
        hotKeyWords: [],
        suggestSongs: [],
        searchValue: ""
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
            this.setData({ suggestSongs: res.result.allMatch })
        })

    }
})