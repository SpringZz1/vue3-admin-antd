// 用户登录信息验证

const token = { admin: "admin", guest: "guest" };

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      if (["admin", "guest"].includes(body.username)) {
        return {
          code: 0,
          message: "验证成功",
          data: token[body.username],
        };
      } else {
        return {
          code: -1,
          message: "验证失败",
          data: null,
        };
      }
    },
  },
];
