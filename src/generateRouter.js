const fs = require('fs');
const path = require('path');

const blogDir = path.resolve(__dirname, '../public/blog');
const outputFile = path.resolve(__dirname, 'generatedRoutes.js');

// 正则表达式匹配 Front Matter 部分并提取字段
const frontMatterRegex = /^---([\s\S]*?)---\n/;

fs.readdir(blogDir, (err, files) => {
    if (err) {
        console.error('Error reading blog directory:', err);
        return;
    }

    const routes = [];
    const blogItem = [];

    files
        .filter(file => file.endsWith('.md'))
        .forEach(file => {
            const filePath = path.resolve(blogDir, file);
            const baseName = path.basename(file, '.md');
            const encodedFileName = encodeURIComponent(baseName); // 对文件名进行编码
            const routePath = `/blog/${encodedFileName}`; // 使用编码后的文件名

            // 读取 Markdown 文件内容
            const content = fs.readFileSync(filePath, 'utf8');

            // 提取 Front Matter 部分
            const match = content.match(frontMatterRegex);
            if (!match) {
                console.warn(`No front matter found in file: ${file}`);
                return;
            }

            // 获取 Front Matter 内容并解析
            const frontMatterContent = match[1];
            const frontMatter = {};

            // 提取 Front Matter 中的各个字段
            frontMatterContent.split('\n').forEach(line => {
                const [key, value] = line.split(':').map(str => str.trim());
                if (key && value) {
                    frontMatter[key] = value;
                }
            });

            // 构建 routes 数据
            routes.push(`    {
        path: '${routePath}',
        component: () => import('@/components/blog/BlogItem.vue'),
        props: { fileName: '${file}',title: '${frontMatter.title}' }
    }`);

            // 构建 blogItem 数据
            blogItem.push({
                path: routePath,
                title: frontMatter.title,
                excerpt: frontMatter.excerpt || '',
                category: frontMatter.category || '',
                date: frontMatter.date || '',
                image: frontMatter.image || 'none'
            });
        });

    const routesContent = `export const blogRoutes = [
${routes.join(',\n')}
];`;

    const blogItemContent = `export const blogItem = [
${blogItem.map(item => `    {
        path: '${item.path}',
        title: '${item.title}',
        excerpt: '${item.excerpt}',
        category: '${item.category}',
        date: '${item.date}',
        image: '${item.image}'
    }`).join(',')}
];`;

    const fileContent = `${routesContent}\n\n${blogItemContent}`;

    fs.writeFileSync(outputFile, fileContent.trim(), 'utf8');
    console.log('Routes and blogItem generated successfully!');
});
