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
    onShareTap(e) {
        const itemList = [
            '分享到微信好友',
            '分享到朋友圈',
            '分享到qq',
            '分享到微博'
        ];
        wx.showActionSheet({
            itemList,
            itemColor: '#405f80',
            success(opts) {
                wx.showModal({
                    title: `用户${itemList[opts.tapIndex]}`,
                    content: `无法分享`
                });
            }
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
