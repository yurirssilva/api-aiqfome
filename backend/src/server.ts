import { app } from "./app";

require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

app.listen(process.env.PORT);

console.log('Server running on port: ', process.env.PORT)