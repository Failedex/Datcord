<template>
    <form @submit="onSubmit">
        <h1>Datcord</h1>
        <p>
            name: 
            <input type="text" placeholder="name" v-model="username">
        </p>
        <input type="submit" value = "Enter chat">
    </form>
    <p>{{failed}}</p>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            username: '',
            failed: ''
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();
            if (this.username.length > 100) {
                return
              }
            this.$store.commit("login", this.username);
            this.$router.push("/");
        }
    }
}

</script>
