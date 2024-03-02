// userService.js

import userData from '../UserData.json'

const userService = {
  register: (user) => {
    userData.users.push(user);
  },
  login: (username, password) => {
    const user = userData.users.find(user => user.username === username && user.password === password);
    return user ? user : null;
  }
};

export default userService;
