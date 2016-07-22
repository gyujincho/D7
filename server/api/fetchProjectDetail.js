import model from "../db/models";
import collection from "../db/collections";

/* Fetch project details from 'project' table */
/* Query: page */

const fetchProjectDetail = (user, q, res)=>{
  const userId = user.id;
  var { projectId } = q;

  // Test code below
  // let userId;
  // if (user && user.id) {
  //   userId = user.id;
  // }
  // if (q && q.id) {
  //   userId = q.id;
  // } else {
  //   userId = 1;
  // }

  /* Data container to be sent */
  const result = {};

  /* Start point */
  model.Project.where("id", projectId).fetch({withRelated: [
    "user"
  ]})
  .then((project) => {
    project = project.toJSON();

    /* project id, title, description, image, wishCount */
    result.projectId = project.id;
    result.projectTitle = project.title;
    result.projectDescription = project.description;
    result.projectImage = project.image;
    result.wishCount = project.wishCount;

    /* username, userId, photo */
    result.userId = project.user.id;
    result.username = project.user.username;
    result.userPhoto = project.user.photo;

    /* wishcount */
    result.wishCount = project.wishCount;
  })
  .then(() => {
    /* Fetch posts by projectId */
    /* posts + doneLike */
    return model.Post.where({projectId: projectId}).orderBy("-created_at").fetchAll({withRelated: [
      "user",
      "postImages",
      "likes",
      "reports"
    ]});
  })
  .then((posts) => {
    posts = posts.toJSON();
    result.posts = posts;
    if (!posts) {
      posts = [];
    }

    /* Array of Promises to be 'Promise.all'ed */
    const postsPromiseArray = [];

    posts.forEach((post) => {
      /* make thenable promise object */
      let postPromise = new Promise((resolve, reject) => {
        /* userId, username */
        post.username = post.user.username;
        post.userPhoto = post.user.photo;
        delete post.user;

        /* postId */
        // post.postId = post.id;

        /* userProjectId*/
        /* doneLike */
        post.doneLike = false;
        post.likes.forEach((like) => {
          if (like.userId === userId) {
            post.doneLike = true;
          }
        });
        delete post.likes;

        /* report */
        post.doneReport = false;
        post.reports.forEach((report) => {
          if (report.userId === userId) {
            post.doneReport = true;
          }
        });
        delete post.reports;

        /* text, picture */
        let postImages = post.postImages;
        let newPostImages = [];
        postImages.forEach((postImage) => {
          newPostImages[postImage.index] = postImage.url;
        });
        post.publicIds = newPostImages;
        delete post.postImages;

        /* created_at */
        post.createdAt = post.created_at;
        delete post.created_at;

        /* project title, description */
        model.UserProject.where("id", post.userProjectId).fetch({withRelated: ["project"]})
        .then((userProject) => {
          userProject = userProject.toJSON();
          post.projectTitle = userProject.project.title;
          post.projectDescription = userProject.project.description;
        })
        .then(() => {
          delete post.userProject;
          resolve();
        })
        .catch((err) => {
          console.error("Error: Failed to read userProject data in fetchAllPosts: ", err);
          return err;
        });
      });
      postsPromiseArray.push(postPromise);
    });

    return Promise.all(postsPromiseArray)
    .then(() => {
      return posts;
    });
  })
  .then(() => {
    /* doneWish */
    result.doneWish = false;
    return model.Wish.where({userId: userId, projectId: result.projectId}).fetch()
    .then((wish) => {
      if (wish) {
        result.doneWish = true;
      }
    })
    .catch((err) => "Failed to print doneWish: " + err);
  })
  .then(() => {
    return result;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) =>{
    console.error("Error: Failed to read projects in 'fetchAllPosts.js': ", err);
    res.status(500).end();
  });

};

export default fetchProjectDetail;
