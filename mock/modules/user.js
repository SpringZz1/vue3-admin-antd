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
  },
};

export default [
  {
    url: "api/user",
    method: "GET",
    response: {
      code: 0,
      data: { ...users },
    },
  },
]
