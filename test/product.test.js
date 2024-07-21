process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../index");
const dbConnect = require("../db/db.config.js");
require("dotenv").config({ path: ".env.test" });

const User = require("../models/user.model.js");
const Todo = require("../models/todo.model.js");

chai.use(chaiHttp);

let token = "";
let adminToken = "";
let createdTodoId;

console.log("Environment variables loaded");
console.log("Connecting to database...");
dbConnect();

before(async () => {
  console.log("Clearing database...");
  try {
    await User.deleteMany({});
    await Todo.deleteMany({});
    console.log("Database cleared");
  } catch (error) {
    console.error("Error clearing database:", error);
  }
});


describe("/Todo API Tests", () => {
  it("GET / - should get the welcome route", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("GET /todos - should deny access with invalid token", (done) => {
    chai
      .request(server)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(401); // Unauthorized, invalid token
        done();
      });
  });


  it("POST /user/signup - should create a new user", (done) => {
    chai
      .request(server)
      .post("/user/signup")
      .send({
        username: "test",
        email: "test@gmail.com",
        role: "user",
        password: "test@12345",
      })
      .end((err, res) => {
        if (err) {
          console.error("Signup Error:", err);
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "User successfully registered!"
        );
        expect(res.body.user).to.be.a("object");
        expect(res.body.user.username).to.equal("test");
        done();
      });
  });


  // Test case for POST /signup with duplicate email
  it("POST /user/signup - should not allow duplicate email", (done) => {
    chai
      .request(server)
      .post("/user/signup")
      .send({
        username: "test",
        email: "test@gmail.com",
        role: "user",
        password: "test@12345",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Email already exists!");
        done();
      });
  });


  // Test case for /signin with invalid credentials
  it("POST /user/signin - should not allow invalid login", (done) => {
    chai
      .request(server)
      .post("/user/signin")
      .send({
        email: "test@gmail.com",
        password: "wrongpassword",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal("Invalid password");
        done();
      });
  });


  it("POST /user/signin - should log in and return a token", (done) => {
    chai
      .request(server)
      .post("/user/signin")
      .send({
        email: "test@gmail.com",
        password: "test@12345",
      })
      .end((err, res) => {
        if (err) {
          console.error("Signin Error:", err);
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Successfully logged in!");
        expect(res.body).to.have.property("token");
        token = res.body.token;
        done();
      });
  });


  it("GET /todos - should fetch all todos", (done) => {
    chai
      .request(server)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });

  it("POST /todos - should create a new todo", (done) => {
    const newTodo = {
      title: "Test Todo",
      description: "This is a test todo",
      status: "pending",
    };

    chai
      .request(server)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send(newTodo)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.data).to.be.a("object");
        expect(res.body.data.title).to.equal("Test Todo");
        createdTodoId = res.body.data._id;
        done();
      });
  });

  it("GET /todos - should fetch all todos", (done) => {
    chai
      .request(server)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });

  it("PUT /todos/:id - should update a todo", (done) => {
    const updatedTodo = {
      title: "Updated Test Todo",
      description: "This is an updated test todo",
      status: "completed",
    };

    chai
      .request(server)
      .put(`/todos/${createdTodoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTodo)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("status", "completed");
        done();
      });
  });

  it("DELETE /todos/:id - should not allow a user to delete a todo", (done) => {
    chai
      .request(server)
      .delete(`/todos/${createdTodoId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(403); // Forbidden, as only admins can delete
        done();
      });
  });

  it("GET /todos - should fetch all todos", (done) => {
    chai
      .request(server)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.data).to.be.an("array");
        done();
      });
  });

  it("POST /user/signup - should create a new user with role admin", (done) => {
    chai
      .request(server)
      .post("/user/signup")
      .send({
        username: "admin",
        email: "admin@gmail.com",
        role: "admin",
        password: "admin@12345",
      })
      .end((err, res) => {
        if (err) {
          console.error("Signup Error:", err);
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "User successfully registered!"
        );
        expect(res.body.user).to.be.a("object");
        expect(res.body.user.username).to.equal("admin");
        done();
      });
  });

  it("POST /user/signin - should log in and return a token", (done) => {
    chai
      .request(server)
      .post("/user/signin")
      .send({
        email: "admin@gmail.com",
        password: "admin@12345",
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Successfully logged in!");
        expect(res.body).to.have.property("token");
        adminToken = res.body.token;
        done();
      });
  });

  it("DELETE /todos/:id - should allow admin to delete todo", (done) => {
    chai
      .request(server)
      .delete(`/todos/${createdTodoId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .end((err, res) => {
        if (err) {
          console.error("DELETE /todos Error:", err);
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.message).to.equal("Todo deleted successfully");
        done();
      });
  });
});

