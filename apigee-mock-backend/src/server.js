const app = require("./app");
const { DEFAULT_PORT } = require("./config/constants");

const port = Number.parseInt(process.env.PORT, 10) || DEFAULT_PORT;

app.listen(port, () => {
  console.log(`Apigee mock backend running on port  ${port}`);
});
