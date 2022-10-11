const Post = require("../models/Post");

const postController = {
  likeDislikePost: async (req, res) => {
    let { postId } = req.params;

    let { userId } = req.user; // viene de passport?

    try {
      let posts = await Posts.findOne({ _id: postId });

      if (posts && posts.likes.includes(userId)) {
        posts.likes.pull(id);
        await posts.save();
        res.status(200).json({
          message: "Post disliked",
          success: true,
        });
      } else if (!posts.likes.includes(userId)) {
        posts.likes.push(id);
        await posts.save();
        res.status(200).json({
          message: "Post liked",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Itinerary not found",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "error cant be like/dislike",
        success: false,
      });
    }
  },
};

module.exports = postController;