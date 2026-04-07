const express = require("express");
const sequelize = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

// Models
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Like = require("./models/Like");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const Follow = require("./models/Follow");
const Notification = require("./models/Notification");
const Tag = require("./models/Tag");
const PostTag = require("./models/PostTag");
const Category = require("./models/Category");
// Middlewares
const auth = require("./middlewares/auth");

// App initialization
const app = express();

// Middleware
app.use(express.json());
app.use("/auth", require("./routes/authRoutes"));
app.use("/posts", require("./routes/postRoutes"));

// Associations

//comment
app.use("/comments", require("./routes/commentRoutes"));
// User - Post
User.hasMany(Comment, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});

Comment.belongsTo(User, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});
Post.hasMany(Comment, {
  foreignKey: "PostId",
  onDelete: "CASCADE"
});

Comment.belongsTo(Post, {
  foreignKey: "PostId",
  onDelete: "CASCADE"
});
//like 
// User - Like
User.hasMany(Like, { foreignKey: "UserId", onDelete: "CASCADE" });
Like.belongsTo(User, { foreignKey: "UserId", onDelete: "CASCADE" });

// Post - Like
Post.hasMany(Like, { foreignKey: "PostId", onDelete: "CASCADE" });
Like.belongsTo(Post, { foreignKey: "PostId", onDelete: "CASCADE" });
app.use("/likes", require("./routes/likeRoutes"));

//---conversation---
// User - Conversation
User.hasMany(Conversation, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});

Conversation.belongsTo(User, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});

//--message--
// Conversation - Message
Conversation.hasMany(Message, {
  foreignKey: "ConversationId",
  onDelete: "CASCADE"
});

Message.belongsTo(Conversation, {
  foreignKey: "ConversationId",
  onDelete: "CASCADE"
});

// User - Message
User.hasMany(Message, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});

Message.belongsTo(User, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});
app.use("/messages", require("./routes/messageRoutes"));
// Test route
app.get("/test", auth, (req, res) => {
  res.json({
    message: "OK",
    user: req.user,
  });
});
app.use("/conversations", require("./routes/conversationRoutes"));

//--Follow--
// User - Follow (self relation)
User.hasMany(Follow, {
  foreignKey: "FollowerId",
  onDelete: "CASCADE"
});

User.hasMany(Follow, {
  foreignKey: "FollowingId",
  onDelete: "CASCADE"
});
app.use("/follows", require("./routes/followRoutes"));

//---Notification--
// User - Notification
User.hasMany(Notification, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});

Notification.belongsTo(User, {
  foreignKey: "UserId",
  onDelete: "CASCADE"
});
app.use("/notifications", require("./routes/notificationRoutes"));

//tag---posttag
app.use("/tags", require("./routes/tagRoutes"));
// many-to-many
Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "PostId"
});

Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: "TagId"
});

// category
// Category - Post
Category.hasMany(Post, {
  foreignKey: "CategoryId",
  onDelete: "SET NULL"
});

Post.belongsTo(Category, {
  foreignKey: "CategoryId",
  onDelete: "SET NULL"
});
app.use("/categories", require("./routes/categoryRoutes"));
// HTTP server + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // cho phép mọi frontend kết nối
  },
});

// Gắn Socket.IO từ file riêng
require("./sockets/socket")(io);

// Connect DB + Start server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("DB connected");

    server.listen(5000, () => {
  console.log("Server chạy http://localhost:5000");
  });
  })
  .catch((err) => {
    console.error("DB error:", err);
  });