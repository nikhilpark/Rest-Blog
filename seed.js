const mongoose = require('mongoose');
const Blog = require('./models/blogData');

const arr = [
    {
        title: "Iphone 12",
        image: "https://images.unsplash.com/photo-1619117579937-6aae52d85aa7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        author:"IDK",
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        title: "Macbook Air",
        image: "https://images.unsplash.com/photo-1619117579937-6aae52d85aa7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        author:"IDK",
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        title: "Drone",
        image: "https://images.unsplash.com/photo-1619117579937-6aae52d85aa7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1",
        author:"Anonymous",
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from  by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        title: "Titan Watch",
        image: "https://images.unsplash.com/photo-1619117579937-6aae52d85aa7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1",
        author:"Anonymous",
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from  by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        title: "Shoes",
        image: "https://images.unsplash.com/photo-1619117579937-6aae52d85aa7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" ,
        author:"Anonymous",
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 fro IDK:ero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    },
    {
        title: "T-Shirt",
        image: "https://images.unsplash.com/photo-1619117579937-6aae52d85aa7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" ,
        author:"Anonymous",
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from ero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    }
];



function seed() {
    Blog.insertMany(arr)
    .then(() => {
        console.log("DB Seeded");
    })
    .catch(err => {
        console.log(err);
    })
}


module.exports = seed;
