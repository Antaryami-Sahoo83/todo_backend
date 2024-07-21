const express = require("express");
const todoRouter = require("./routers/todo.router.js");
const userRouter = require("./routers/user.router.js");
const bodyParser = require("body-parser");
const dbConnect = require("./db/db.config.js");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todoRouter);
app.use("/user", userRouter);

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dbConnect();

app.get("/", (req, res) => {
      const htmlContent = `
      <html>
            <head>
            <style>
                  body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        height: 100vh;
                        margin: 0;
                        font-family: Arial, sans-serif;
                        background-color: #87ceeb; /* Sky blue background */
                        color: #333;
                  }
                  .container {
                        text-align: center;
                        padding: 20px;
                        background-color: #e0f7fa;
                        border-radius: 10px;
                  }
                  h1 {
                        font-size: 2.5em;
                        margin: 0;
                  }
                  p {
                        font-size: 1.2em;
                        margin: 10px 0;
                  }
                  .btn {
                        display: inline-block;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #fff;
                        background-color: #007bff;
                        border: none;
                        border-radius: 5px;
                        text-decoration: none;
                        margin-top: 20px;
                        cursor: pointer;
                  }
                  .btn:hover {
                        background-color: #0056b3;
                  }
                  footer {
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                        font-size: 0.9em;
                        color: #555;
                  }
                  footer a {
                        color: #555;
                        text-decoration: none;
                  }
                  footer a:hover {
                        text-decoration: underline;
                  }
            </style>
            </head>
            <body>
                  <div class="container">
                        <h1>Backend part of Todo application</h1>
                        <p>Manage your tasks efficiently and effectively.</p>
                        <a href="http://localhost:${PORT}/api-docs" class="btn">Go to API Docs</a>
                  </div>
                  <footer>
                        Antaryami Sahoo<br>
                        <a href="mailto:er.antaryami@gmail.com">er.antaryami@gmail.com</a>
                  </footer>
            </body>
      </html>
      `;
      res.send(htmlContent);
});


const PORT = process.env.PORT || 3000;

app.listen(3000, (err) => {
      if (err) {
            console.log(err);
      }
      console.log(`Server is running http://localhost:${PORT}`);
});

module.exports = app;
