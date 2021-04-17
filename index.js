const express = require("express");
const app = express();
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

let blogs = [
  {
    id: uuid(),
    title: "Hazards of the Internet",
    image:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    author: "Nikhil",
    content:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem  ",
  },
  {
    id: uuid(),
    title: "Hazards of the Internet",
    image:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    author: "Nikhil",
    content:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem  ",
  },
];

app.get("/blog", (req, res) => {
  res.render("blog/index", { blogs });
});

app.get("/blog/new", (req, res) => {
  res.render("blog/new");
});

app.get("/blog/:id", (req, res) => {
  const { id } = req.params;
  const foundBlog = blogs.find((c) => c.id === id);
  res.render("blog/show", { blogs: foundBlog });
});

app.post("/blog/new", (req, res) => {
  const { title, author, content, image } = req.body;

  blogs.push({ title, author, content, image, id: uuid() });
  res.redirect("/blog");
});

app.delete("/blog/:id", (req, res) => {
  const { id } = req.params;

  const temp = blogs.filter((c) => c.id !== id);

  blogs = temp;

  res.redirect("/blog");
});

app.get("/blog/:id/edit", (req, res) => {
  const { id } = req.params;
  const foundBlog = blogs.find((c) => c.id === id);
  res.render("blog/edit", { comment: foundBlog });
});

app.listen(3000, () => {
  console.log("server runnig at port 3000");
});
