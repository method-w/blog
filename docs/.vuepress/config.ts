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
    sidebar: {
      // '/data_structure-algorithm/': [
      //   { text: '数组', link: 'array' },
      //   { text: '栈', link: 'stack' },
      //   { text: '队列', link: 'queue' },
      //   { text: '链表', link: 'linked_list' },
      //   { text: '集合', link: 'aggregate' },
      //   { text: '字典和散列表', link: 'dictionary-hash_table' },
      //   { text: '递归', link: 'recursion' },
      //   { text: '树', link: 'tree' },
      //   { text: '二叉堆和堆排序', link: 'binary_heap-heap_sorting' },
      //   { text: '图', link: 'chart' },
      //   { text: '排序和搜索算法', link: 'sort-search_algorithm' },
      //   { text: '算法设计与技巧', link: 'algorithm_design-skills' },
      //   { text: '算法复杂度', link: 'algorithm_complexity' },
      // ],
      '/data_structure-algorithm/': ['array', 'stack'],
    },
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
