const http = require("http");
const app = require("./app/app");
const { CONNECT_WITH_DB } = require("./db/connectionDB");
app.use(require("cors")());

const port = process.env.PORT || 3000;
const server = http.createServer(app);

async function startServer() {
  try {
    // Wait for the database connection to establish
    await CONNECT_WITH_DB();

    // Start the server after DB connection is successful
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process with a failure code
  }
}

startServer();
