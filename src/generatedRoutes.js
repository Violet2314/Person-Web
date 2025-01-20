export const blogRoutes = [
    {
        path: '/blog/2024-10-24(%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2)',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: '2024-10-24(个人博客).md',title: '个人博客' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/2024-10-26(%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%E6%9E%B6%E6%9E%84)',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: '2024-10-26(个人博客架构).md',title: '个人博客架构' },
        meta: { showRightHome: false, showContentNav: true },
    },
    {
        path: '/blog/%E6%80%BB%E7%BB%93java%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: '总结java数据结构和算法.md',title: '总结java数据结构和算法' },
        meta: { showRightHome: false, showContentNav: true },
    }
];

export const blogItem = [
    {
        path: '/blog/2024-10-24(%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2)',
        title: '个人博客',
        excerpt: '测试',
        category: '我的赛博垃圾',
        date: '2024-08-04',
        image: '/blog/image/background.png'
    },    {
        path: '/blog/2024-10-26(%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%E6%9E%B6%E6%9E%84)',
        title: '个人博客架构',
        excerpt: '测试',
        category: '我的赛博垃圾',
        date: '2024-08-04',
        image: 'none'
    },    {
        path: '/blog/%E6%80%BB%E7%BB%93java%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E5%92%8C%E7%AE%97%E6%B3%95',
        title: '总结java数据结构和算法',
        excerpt: '测试',
        category: '我的赛博垃圾',
        date: '2024-08-04',
        image: 'none'
    }
];