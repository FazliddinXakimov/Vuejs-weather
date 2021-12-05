import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      uzregions: [],
      currentRegion: {},
      api_key: "8c879c4a8a78e68ea36148fc0a6f684a",
      url_base: "https://api.openweathermap.org/data/2.5/",
      icon: "",
    };
  },
  getters: {
    uzregions(state) {
      return state.uzregions;
    },
    currentRegion(state) {
      return state.currentRegion;
    },
    icon(state) {
      return state.icon;
    },
    hasCurrentRegion(state) {
      return !!state.currentRegion.cod;
    },
  },
  mutations: {
    getUzRegions(state, payload) {
      state.uzregions = payload;
    },
    getCurrentRegion(state, payload) {
      state.currentRegion = payload;
    },
    setIcon(state, payload) {
      state.icon = payload;
    },
  },

  actions: {
    async getUzRegions(context) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?lat=41.7075&lon=63.8491&&cnt=4&appid=${context.state.api_key}`
      );
      const responseData = await response.json();
      console.log(responseData);
      context.commit("getUzRegions", responseData);
    },
    async getCurrentRegion(context, payload) {
      const response = await fetch(
        `${context.rootState.url_base}weather?q=${payload}&units=metric&APPID=${context.rootState.api_key}`
      );
      const responseData = await response.json();
      const iconName = responseData.weather[0].icon;
      console.log(iconName);
      const iconApi = await fetch(
        `http://openweathermap.org/img/wn/${iconName}.png`
      );
      console.log("iconApi", iconApi);
      console.log(responseData);
      context.commit("getCurrentRegion", responseData);
      context.commit("setIcon", iconApi);
    },
  },
});

export default store;
