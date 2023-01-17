const users = {
  admin: {
    id: 1,
    name: "SpringZz (admin)",
    avatar: "./src/assets/images/avatar.png",
    role: ["admin"],
  },
  guest: {
    id: 2,
    name: "访客 (guest)",
    avatar: "./src/assets/images/avatar.png",
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
