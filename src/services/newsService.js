// 这里不需要 "use strict"; 因为Node.js默认就是严格模式

// 移除 exports 和 __esModule 的相关代码
const getNewsData = (source, regions, date) => {
    // 这里是模拟的数据，实际中你需要从数据库或其他数据源获取
    const newsList = [
        {
            region: 'US',
            language: 'en',
            source: source,
            pushTitle: 'Sample Title',
            pushSubTitle: 'Sample Subtitle',
            pushBannerUrl: 'https://example.com/sample - image.jpg',
            newsId: '12345',
            newsTag: 'tag1',
            newsTitle: 'Sample News Title',
            newsUrl: 'https://example.com/sample - news',
            newsPublishTime: Date.now(),
            newsContentType: 1,
            newsType: 0
        }
    ];
    return newsList;
};

export default getNewsData;