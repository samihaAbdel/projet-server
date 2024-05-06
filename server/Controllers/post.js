const postSchema =require("../models/post");
const user = require("../models/user");


exports.CreatePost = async (req , res) => {
    
    try {
        if(req.body.Title === null || req.body.Title === "" 
            || req.body.Description === null || req.body.Description === ""
                || req.body.User === null || req.body.User === ""
                    || req.body.LinkImage === null || req.body.LinkImage === "")
        {
           res.status(200).send({
            result: 1,
            user : null
           })
        }
        var post = new postSchema({
            Title : req.body.Title, 
            Description : req.body.Description,
            DatePost : Date.now(),
            IsValid : false,
            User : req.body.User,
            LinkImage : req.body.LinkImage
        });
        var result = await post.save();
        res.status(200).send({
            result: 0,
            user : result
           })
    }catch (ex)
    {
        res.status(500).send(ex.toString())
    }
    
}
exports.GetAll = async (req, res) => {
    try {
        const posts = await postSchema.find();
        res.status(200).send(posts);
    }catch(ex) {
        res.status(500).send(ex.toString())
    }
}
exports.GetOne =  async (req, res) => {
    try {
      const post = await postSchema.findById({ _id: req.params.id });
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send(error);
    }
};
exports.DeletePost = async (req,res) => {
    try {
      await postSchema.deleteOne({_id: req.params.id });
      res.status(200).send({msg : 'Post deleted'});
    } catch (error) {
      res.status(400).send(error);
    }
};