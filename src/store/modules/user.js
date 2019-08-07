import { login, getUserInfo } from "@/api/user";
import { getToken, setToken, getUserName, setUserName } from "@/util/cookies";

const state = {
  token: getToken(),
  userName: getUserName()
};

const getters = {
  token: state => state.token,
  userName: state => state.userName
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName;
  }
};

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getUserInfo({ commit }) {
    return new Promise((reslove, reject) => {
      getUserInfo()
        .then(response => {
          const { data } = response;
          commit("SET_USER_NAME", data.userName);
          setUserName(data.userName);
          reslove();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
