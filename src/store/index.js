import { createStore } from 'vuex'
import axios from "axios"
import socket from "../socket"

let backend = process.env.VUE_APP_BACKEND; 

const store = createStore({
  state() {
    return {
      name: null,
      chatlog: []
    }
  },
  mutations: {
    login(state, name) {
      state.name = name;
    }, 
    setchat(state, chat) {
      state.chatlog = chat
    }
  },
  actions: {
    async send_msg(state, msg) {
      axios.post(backend, {text: msg, name: state.state.name}).catch((error)=> {
        console.log(error);
      });
    },
    async fetch_msg(state) {
      axios.get(backend).then((res)=> {
        state.commit("setchat", res.data.chathis);
      }).catch((error)=> {
        console.log(error);
      });
    }
  },
})

socket.on('message', () => {
  store.dispatch("fetch_msg");
})

export default store;