import { defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'

export default {
  lang: 'zh-CN',
  title: 'VuePress Blog',
  description: '博客 - 前端学习笔记',
  head: [['link', { rel: ' icon', href: '/favicon.ico' }]],
  theme: defaultTheme({
    logo: 'favicon.ico',
    logoDark: 'favicon-dark.ico',
    navbar: [
      {
        text: '前端',
        children: [
          {
            text: '基础',
            children: [
              { text: 'HTML', link: '/front_end/html.md' },
              { text: 'CSS', link: '/front_end/css.md' },
              { text: 'JavaScript', link: '/front_end/javascript.md' },
            ],
          },
          {
            text: '框架',
            children: [
              { text: 'Vue', link: '/front_end/vue.md' },
              { text: 'React', link: '/front_end/react.md' },
            ],
          },
        ],
      },
      { text: '计算机基础', link: '/computer_basic/' },
      { text: '数据结构和算法', link: '/data_structure-algorithm/' },
      {
        text: '练习题',
        children: [
          { text: '前端', link: '/practice/front_end.md' },
          { text: '计算机基础', link: '/practice/computer_basic.md' },
          { text: '数据结构和算法', link: '/practice/data_structure-algorithm.md' },
        ],
      },
    ],
    sidebar: 'auto',
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
      hotKeys: [],
    }),
  ],
}
