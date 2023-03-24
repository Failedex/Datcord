<template>
    <h2>control panel</h2>
    <h5>
        toggle bot:
        <p>{{bot}}</p>
        <input type="button" value="toggle" @click="bottoggle">
    </h5>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            bot: null,
        }
    },
    methods: {
        bottoggle() {
            this.bot = !this.bot;
            axios.post(process.env.VUE_APP_BACKEND+"/bot", {bot: this.bot});
        }
    },
    async mounted() {
        await axios.get(process.env.VUE_APP_BACKEND+"/bot").then((res) => {
            this.bot = res.data.bot;
        })
    }
}
</script>

