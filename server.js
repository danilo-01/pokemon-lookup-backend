const app = require("./api_v1/app");
const { PORT } = require("./api_v1/config/config");

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});