import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
      try {
            const todo = new Todo(req.body);
            const result = await todo.save();
            res.send({status: "success",message: "Todo created successfully", result});
      } catch (error) {
            res.send({status: "error",message: "Todo creation failed",error});
      }
};

export const getTodo = async (req, res) => {
      try {
            const todos = await Todo.find({});
            res.send({status: "success",message: "Todo Get successfully",data: todos});
      } catch (error) {
            res.send({status: "error",message: "Todo Get failed",error});
      }
};


export const updateTodo = async (req, res) => {
      try {
            const { id } = req.params;
            const { title, description, status } = req.body;
            const updatedTodo = await Todo.findByIdAndUpdate(id,{ title, description, status },{ new: true });

            if (!updatedTodo) {
                  return res.status(404).send("Todo not found");
            }
            res.send({status: "success",message: "Todo Update successfully",data: updatedTodo});
      } catch (error) {
            res.send({status: "error",message: "Todo Update failed",error});
      }
};


export const deleteTodo = async (req, res) => {
      try {
            const { id } = req.params;
            const deletedTodo = await Todo.findByIdAndDelete(id);

            if (!deletedTodo) {
                  return res.status(404).send({ status: "error", message: "Todo not found" });
            }
            res.send({status: "success",message: "Todo Delete successfully"});
      } catch (error) {
            res.send({status: "error",message: "Todo Delete failed",error});
      }
};

