import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const getPosts = async (req, res) => {
  const query = req.query;
  console.log(query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
      },
    });
    //  setTimeout(() => {
    res.status(200).json(posts);
    //}, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    // If post is not found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Initialize `isSaved` as false
    let isSaved = false;

    // Check token and saved status
    const token = req.cookies?.token;
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const saved = await prisma.savedPost.findFirst({
          where: {
            postId: id,
            userId: payload.id,
          },
        });
        isSaved = saved ? true : false;
      } catch (err) {
        console.error("JWT Verification Error:", err);
      }
    }

    // Send the response
    return res.status(200).json({ ...post, isSaved });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

/* export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
          res.status(200).json({ ...post, isSaved: saved ? true : false });
        }
      });
    }
    res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get post" });
  }
}; */
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    // Step 1: Create the post with its details
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail, // Create PostDetail if present
        },
      },
    });

    console.log("New Post Created: ", newPost);

    // Step 2: Create a SavedPost if `saved` flag is true
    if (body.saved) {
      console.log(
        "Creating SavedPost for user: ",
        tokenUserId,
        " and post: ",
        newPost.id
      );

      const savedPost = await prisma.savedPost.create({
        data: {
          userId: tokenUserId, // Link to user
          postId: newPost.id, // Link to post
        },
      });

      console.log("SavedPost Created: ", savedPost);
    }

    // Return the newly created post
    res.status(200).json(newPost);
  } catch (err) {
    console.log("Error creating post: ", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get updatePost  " });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({
        message: "not authorised",
      });
    }
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get delete posts" });
  }
};
