const data = require('../../../data/posts-data');

Page({
    data: {
        postId: undefined
    },
    onCollectionTap() {
        let postsCollected = wx.getStorageSync('postCollected');
        postsCollected[this.data.postId] = !postsCollected[this.data.postId];
        let collected = !postsCollected[this.data.postId];
        wx.setStorageSync('postCollected', postsCollected);
        this.setData({
            collected
        });
        wx.showToast({
            title: collected ? '收藏成功' : '取消成功',
            duration: 500,
            icon: 'success'
        });
    },
    onLoad(opts) {
        const postId = opts.id;
        const postData = data[postId];
        let collected;
        let postCollected = wx.getStorageSync('postCollected');
        if (postCollected) {
            collected = postCollected[postId] || false;
            postCollected[postId] = collected;
        } else {
            postCollected = {};
            collected = false;
            postCollected[postId] = collected;
        }
        wx.setStorageSync('postCollected', postCollected);

        this.setData({
            collected,
            postId,
            ...postData
        });
    }
});
