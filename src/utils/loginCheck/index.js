class loginCheck {
  check(username, password) {
    // 如果没有输入username和密码
    if (!username && !password) {
      return false;
    } else {
      // 只要输入了账号或者密码其一
      return true;
    }
  }
}

export default new loginCheck();
