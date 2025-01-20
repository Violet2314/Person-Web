export const blogRoutes = [
    {
        path: '/blog/git%E5%9F%BA%E6%9C%AC%E5%91%BD%E4%BB%A4',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: 'git基本命令.md',title: 'git使用教程' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/Python%E8%84%9A%E6%9C%AC%E5%8F%91%E9%80%81%E9%82%AE%E4%BB%B6',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: 'Python脚本发送邮件.md',title: 'Python脚本发送邮件' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/QT%E7%BD%91%E9%9A%BE%E4%BA%91',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: 'QT网难云.md',title: 'QT网难云' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/Vue%E5%AE%9E%E7%8E%B0%E7%9A%84%E9%80%9A%E8%BF%87api%E6%8E%A5%E5%8F%A3%E5%AE%9E%E7%8E%B0%E7%9A%84%E5%8F%AA%E6%9C%89%E5%89%8D%E7%AB%AF%E7%9A%84%E4%BB%BF%E5%BE%AE%E4%BF%A1ai%E8%81%8A%E5%A4%A9',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: 'Vue实现的通过api接口实现的只有前端的仿微信ai聊天.md',title: 'Vue实现的通过api接口实现的只有前端的仿微信ai聊天' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/%E5%A4%A7%E4%B8%80%E6%80%BB%E7%BB%93',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: '大一总结.md',title: '大一总结' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/%E6%80%BB%E7%BB%93java%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: '总结java数据结构和算法.md',title: '总结java数据结构和算法' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/%E8%B4%A5%E7%8A%AC%E7%BB%99%E6%88%91%E5%B8%A6%E6%9D%A5%E2%80%9C%E9%9D%92%E6%98%A5%E6%84%9F%E2%80%9D%E7%9A%84%E5%8E%9F%E5%9B%A0%E7%9A%84%E5%89%96%E6%9E%90',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: '败犬给我带来“青春感”的原因的剖析.md',title: '败犬给我带来“青春感”的原因的剖析' },
        meta: { showRightHome: false, showContentNav: true },
    }
];

export const blogItem = [
    {
        path: '/blog/git%E5%9F%BA%E6%9C%AC%E5%91%BD%E4%BB%A4',
        title: 'git使用教程',
        excerpt: '自己总会忘记git命令吧',
        category: '基本常识',
        date: '2024-09-9T09',
        image: 'none'
    },    {
        path: '/blog/Python%E8%84%9A%E6%9C%AC%E5%8F%91%E9%80%81%E9%82%AE%E4%BB%B6',
        title: 'Python脚本发送邮件',
        excerpt: '败犬女主真好看吧',
        category: '我的赛博垃圾',
        date: '2024-08-03T23',
        image: 'none'
    },    {
        path: '/blog/QT%E7%BD%91%E9%9A%BE%E4%BA%91',
        title: 'QT网难云',
        excerpt: '玩一下QT',
        category: '我的赛博垃圾',
        date: '2024-07-31',
        image: 'none'
    },    {
        path: '/blog/Vue%E5%AE%9E%E7%8E%B0%E7%9A%84%E9%80%9A%E8%BF%87api%E6%8E%A5%E5%8F%A3%E5%AE%9E%E7%8E%B0%E7%9A%84%E5%8F%AA%E6%9C%89%E5%89%8D%E7%AB%AF%E7%9A%84%E4%BB%BF%E5%BE%AE%E4%BF%A1ai%E8%81%8A%E5%A4%A9',
        title: 'Vue实现的通过api接口实现的只有前端的仿微信ai聊天',
        excerpt: '真是赛博垃圾',
        category: '我的赛博垃圾',
        date: '2024-08-04',
        image: 'none'
    },    {
        path: '/blog/%E5%A4%A7%E4%B8%80%E6%80%BB%E7%BB%93',
        title: '大一总结',
        excerpt: '总结一下自己的大一的人生',
        category: '莫名其妙的总结',
        date: '2024-08-04',
        image: 'none'
    },    {
        path: '/blog/%E6%80%BB%E7%BB%93java%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95',
        title: '总结java数据结构和算法',
        excerpt: '主要是应付期末考试的',
        category: '大二上期末复习',
        date: '2024-08-04',
        image: 'none'
    },    {
        path: '/blog/%E8%B4%A5%E7%8A%AC%E7%BB%99%E6%88%91%E5%B8%A6%E6%9D%A5%E2%80%9C%E9%9D%92%E6%98%A5%E6%84%9F%E2%80%9D%E7%9A%84%E5%8E%9F%E5%9B%A0%E7%9A%84%E5%89%96%E6%9E%90',
        title: '败犬给我带来“青春感”的原因的剖析',
        excerpt: '我的八奈见啊',
        category: '败犬女主角太多了',
        date: '2024-08-28',
        image: '../../blog/image/background.png'
    }
];