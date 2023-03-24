import { io } from "socket.io-client";

let URL = process.env.VUE_APP_BACKEND;
const socket = io(URL);
export default socket;
