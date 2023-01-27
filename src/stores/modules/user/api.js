import request from "@/utils/request";

// 获取后端身份信息以供验证
// export default {
//   getUsers: () =>
//     request.get("/api/user").then((res) => {
//       console.log(res.data.data);
//       return res.data.data;
//     }),
// };

export default {
  getUsers: () => {
    return request.get("/api/user");
  },
};
