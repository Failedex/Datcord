<template>
  <header>
    <h6 style="margin: 0px;">why are you here</h6>
  </header>
  <div ref ="msgcontain" class="container">
    <div class="msg" :key="text.id" v-for="text in this.$store.state.chatlog">
      <h5 style="color: Red;" >{{text.name}}</h5>
      <p>{{text.text}}</p>
    </div>
  </div>
  <form class="chatbar" @submit.prevent="sendms">
    <input type="text" placeholder="Type your racial slur here..." v-model="chatbox" style="width:95%">
    <input type="submit" value="send">
  </form>
</template>

<script>
import {useStore} from 'vuex';
import {watch} from "vue";

// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      chatbox:'',
      msgcontain: null
    }
  },
  methods: {
    async sendms(e) {
      e.preventDefault();
      if (this.chatbox == '') return;
      this.$store.dispatch("send_msg", this.chatbox);
      this.chatbox = '';
    }
  },
  mounted() {
    const store = useStore();
    if (!store.state.name) {
      this.$router.push("/login");
    }
    store.dispatch("fetch_msg");

    this.msgcontain = this.$refs.msgcontain;

    watch(() => this.msgcontain, (container) => {
      container.scrollTop = container.scrollHeight;
    });
  },
}
</script>

<style scoped>
  .chatbar{
      position: fixed;
      bottom: 5px;
      padding: 10px;
      left: 20px;
      right: 20px;
      height: 10px;
    }
  .msg{
    text-align: left;
  }
  .container{
    position: fixed;
    top: 110px;
    bottom: 30px;
    left: 0;
    right: 0;
    overflow-y: auto;
    border: 2px solid #1f1e33;
    border-radius: 5px;
    display: flex;
    flex-direction: column-reverse;
    word-wrap: break-word;
  }
</style>
