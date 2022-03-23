const express = require("express"); 
const app = express();
const cors = require("cors");
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json()); //access the req.body

//ROUTES//

//get all blogs
app.get("/blogs", async (req,res) =>{
    try {
       const allBlogs = await pool.query(
           "SELECT * FROM blog")
        res.json(allBlogs.rows);
    } catch (err) {
       console.error(err.message);
    }
})

//get blog
app.get("/blogs/:id", async (req,res) =>{
    try {
        const { id } = req.params
        const blog = await pool.query(
            "SELECT * FROM blog WHERE blog_id = $1", [id]
            );
        res.json(blog.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//create blog, , ($1) represents the first value of the array which is description
//  RETURNING * is to get back the data
app.post("/blogs", async (req, res) =>{
    try {
        const { description } = req.body;
        const newBlog = await pool.query(
            "INSERT INTO blog (description) VALUES($1) RETURNING *",
            [description]
            );
            res.json(newBlog.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update blog
app.put("/blogs/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateBlog = await pool.query(
            "UPDATE blog SET description = $1 WHERE blog_id = $2", 
            [description, id]
            );
            res.json("Blog has been updated.")
    } catch (err) {
        console.error(err.message)
    }
})

//delete blog
app.delete("/blogs/:id", async (req, res) => {
    try {
       const { id } = req.params; 
       const deleteBlog = await pool.query(
           "DELETE FROM blog WHERE blog_id = $1", 
           [id]
           );
        res.json("Blog was deleted!")
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3000, () =>{
    console.log("Server has started on port 3000")
})