// 用户登录信息验证

const token = { admin: "admin", guest: "guest" };

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      // 账号和密码验证
      if (
        ["admin", "guest"].includes(body.username) &&
        body.password === "123456"
      ) {
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
