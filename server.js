const app = require("./api_v1/app");
const config = require("./api_v1/config/config");

app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`)
});