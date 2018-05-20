const data = require('../../data/posts-data');

Page({
    data: {
    },
    onLoad(opts) {
        let articles = data;
        this.setData({
            articles
        });
    },
    onPostTap(e) {
        const postId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: './post-detail/post-detail?id=' + postId
        });
    }
});
