import express from "express";

const app = express();
const port = 3000;

let posts = [
  {
    id: "xyz",
    title: "The Future of Artificial Intelligence",
    description:
      "Artificial intelligence is evolving rapidly, transforming industries and everyday life. From self-driving cars to advanced healthcare solutions, AI promises to revolutionize the way we live and work.Artificial intelligence is evolving rapidly, transforming industries and everyday life. From self-driving cars to advanced healthcare solutions, AI promises to revolutionize the way we live and work.Artificial intelligence is evolving rapidly, transforming industries and everyday life. From self-driving cars to advanced healthcare solutions, AI promises to revolutionize the way we live and worArtificial intelligence is evolving rapidly, transforming industries and everyday life. From self-driving cars to advanced healthcare solutions, AI promises to revolutionize the way we live anArtificial intelligence is evolving rapidly, transforming industries and everyday life. From self-driving cars to advanced healthcare solutions, AI promises to revolutionize the way we live and work.d work.k.",
    author: "John Smith",
    date: "2024-08-01",
  }
];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/post/create", (req, res) => {
  res.render("post/create.ejs");
});

app.post("/post/edit/:id", (req, res) => {
  const postId = req.params.id;

  const postIndex = posts.findIndex((post) => post.id === postId)
  if (postIndex > -1) {
    posts[postIndex]["title"] = req.body["title"]
  }

  res.render("post/edit.ejs", req.body );
});

app.post("/post/update/:id", (req, res) => {
  const postId = req.params.id;

  const postIndex = posts.findIndex((post) => post.id === postId)
  if (postIndex > -1) {
    posts[postIndex]["title"] = req.body["title"]
    posts[postIndex]["description"] = req.body["description"]
    posts[postIndex]["author"] = req.body["author"]
  }

  res.redirect("/")
});

app.post("/post/delete/:id", (req, res) => {
  const postId = req.params.id;

  const postIndex = posts.findIndex((post) => post.id === postId)
  if (postIndex > -1) {
    posts.splice(postIndex, 1)
  }

  res.redirect("/")
});


app.post("/submit", (req, res) => {
    const submitedPost = {
        id: req.body["id"],
        title: req.body["title"],
        description: req.body["description"],
        author: req.body["author"],
        date: req.body["date"],
      }

    if (submitedPost.id !== "" && submitedPost.title !== "" && submitedPost.description !== "" && submitedPost.author !== "") {
        posts = [...posts, submitedPost]
        console.log(submitedPost)
    }

     res.redirect("/")
});
