// 用户登录信息验证

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      if (["admin", "guest"].includes(body.username)) {
        return {
          code: 0,
          message: "验证成功",
          data: true,
        };
      } else {
        return {
          code: -1,
          message: "验证失败",
          data: false,
        };
      }
    },
  },
];
