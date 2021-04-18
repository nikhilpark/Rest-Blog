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
    title: "Eating Healthy",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    author: "Nikhil",
    content: `A healthy diet helps pave the way to a healthy heart and blood vessels, strong bones and muscles, a sharp mind, and so much more.

      Confused about what constitutes a healthy diet? You aren't alone. Over the years, what seemed to be flip flops from medical research combined with the flood of diet books and diet plans based on little or no science have muddied the water. But a consensus has emerged about the basics, which are really pretty simple.
      
      An important take-home message is to focus on the types of foods you eat and your overall dietary pattern, instead of on individual nutrients such as fat, dietary cholesterol, or specific vitamins. There are no single nutrients or vitamins that can make you healthy. Instead, there is a short list of key food types that together can dramatically reduce your risk for heart disease.
      
      Eat more of these foods: fruits and vegetables, whole grains, fish and seafood, vegetable oils, beans, nuts, and seeds.
      
      Eat less of these foods: whole milk and other full-fat dairy foods, red meat, processed meats, highly refined and processed grains and sugars, and sugary drinks.`,
  },
  {
    id: uuid(),
    title: "Benefits of Oranges",
    image:
      "https://images.unsplash.com/photo-1618502913824-e45c41e932d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    author: "Nikhil",
    content: `Oranges are a round, segmented citrus fruit with a pitted peel. The taste can vary from juicy and sweet to bitter, depending on the variety – more common ones include Valencia, Seville and Hamlin. Most oranges are available year-round, except for varieties such as blood oranges, which have a shorter season.

    Nutritional benefits of oranges
    Oranges are known for their vitamin C content, a powerful antioxidant that helps protect cells from damage. One medium orange will provide the NRV (nutrient reference value) of vitamin C for adults.
    
    They also contain health-promoting compounds known as flavanones. Research suggests that these citrus phytochemicals help support the body and protect us from conditions such as heart disease and cancer – they’re also thought to have some anti-inflammatory, antiviral and antimicrobial benefits.
    
    Oranges are also a good source of fibre, B vitamins, vitamin A, calcium and potassium.
    
    One orange counts towards one of your five-a-day. A 150ml glass of unsweetened orange juice also counts as one portion, although the NHS advises that orange juice, as with other juices, can only count once per day no matter how much you drink. Orange juice doesn’t contain the fibre that is present in the whole fruit and is high in sugars, so the NHS advises that fruit juice is best consumed with food to limit the damage to teeth.`,
  },
];

app.get("/", (req, res) => {
  res.send("<a href='/blog'>Here </a>");
});

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
  res.render("blog/edit", { blogs: foundBlog });
});

app.patch("/blog/:id/", (req, res) => {
  const { id } = req.params;
  const foundBlog = blogs.find((c) => c.id === id);
  const upDatedBlog = req.body;

  foundBlog.title = upDatedBlog.title;
  foundBlog.image = upDatedBlog.image;
  foundBlog.author = upDatedBlog.author;
  foundBlog.content = upDatedBlog.content;

  res.redirect("/blog");
});

app.listen(3000, () => {
  console.log("server is running at port 3000");
  console.log("go to localhost:3000/blog");
});
