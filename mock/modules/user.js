import { resolveToken } from "../utils";
const users = {
  admin: {
    id: 1,
    username: "admin",
    avatar: "./src/assets/images/avatar.png",
    password: "123456",
    role: ["admin"],
  },
  guest: {
    id: 2,
    username: "guest",
    avatar: "./src/assets/images/avatar.png",
    password: "123456",
    role: ["guest"],
  },
};

export default [
  {
    url: "/api/user",
    method: "get",
    response: ({ headers }) => {
      const token = resolveToken(headers.authorization);
      return {
        code: 0,
        message: "ok",
        data: { ...(users[token] || users.guest) },
      };
    },
  },
];
