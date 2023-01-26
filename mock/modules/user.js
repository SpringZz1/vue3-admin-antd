const users = {
  admin: {
    id: 1,
    username: "SpringZz (admin)",
    avatar: "./src/assets/images/avatar.png",
    password: "123456",
    role: ["admin"],
  },
  guest: {
    id: 2,
    username: "访客 (guest)",
    avatar: "./src/assets/images/avatar.png",
    password: "123456",
    role: ["guest"],
  },
};

export default [
  {
    url: "/api/user",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: { ...users },
      };
    },
  },
];
