export const sideMenu = [
  {
    key: 1,
    title: "工作台",
    path: "/workbench",
    type: "icon-zhuye",
  },
  {
    key: 2,
    title: "外部链接",
    path: "/externalLink",
    type: "icon-lianjie",
    children: [
      {
        path: "https://github.com/SpringZz1/vue3-admin-antd",
        name: "github",
        title: "源码",
        type: "icon-github",
      },
      {
        path: "https://github.com/SpringZz1",
        name: "blog",
        title: "github主页",
        type: "icon-gerenzhongxin-wode-02",
      },
    ],
  },
  {
    key: 3,
    title: "多级菜单",
    path: "/multimenu",
    type: "icon-caidan",
    children: [
      {
        title: "基础组件",
        path: "/multimenu",
        type: "icon-caidan",
      },
    ],
  },
  {
    key: 4,
    title: "404",
    path: "/404",
    type: "icon-icon-test",
  },
];
