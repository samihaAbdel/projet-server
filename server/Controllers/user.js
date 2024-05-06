const UserSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.Register = async(req,res) => {
    try 
    {
      
        const userTest = await UserSchema.findOne({email : req.body.email});
        if(userTest !== null)
        {
            res.status(401).send({msg : "User already exist"});
        }
        else {
            const newUser = new UserSchema({ ...req.body });
            newUser.password = await bcrypt.hash(req.body.password, saltRounds);
            newUser.save().then((user) => {
                const token = jwt.sign({id: user._id},process.env.SECRET_KEY, {expiresIn : '3h'});
                res.status(200).send({status:"200", user, token});
            }).catch((error) => {
                console.log(error)
                res.status(400).send({msg:"error occured" , error : error})
            })
        }
    }catch(error) 
    {
        console.log(error)
        res.status(400).send({msg:"error occured" , error : error})
    }
    
}
exports.GetAll = async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).send(users);
    }catch(ex) {
        res.status(500).send(ex.toString())
    }
}
exports.GetOne =  async (req, res) => {
    try {
      const user = await UserSchema.findById({ _id: req.params.id });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
};
exports.DeleteUser = async (req,res) => {
    try {
      await UserSchema.deleteOne({_id: req.params.id });
      res.status(200).send({msg : 'User deleted'});
    } catch (error) {
      res.status(400).send(error);
    }
};
exports.UpdateUser = async (req,res) => {
    try {
        const newUser = new UserSchema({ ...req.body });
        newUser.password = await bcrypt.hash(req.body.password, saltRounds);
        const result = await UserSchema.updateOne({ _id: newUser._id }, { $set: newUser  }); 
        console.log(result);
        res.status(200).send({msg : 'User updated' });
    }catch(error)
    {
      res.status(400).send({ errors: [{ msg: error }] });
    }
}
exports.Login =  async (req,res) => {
  const {email , password} = req.body;
    UserSchema.findOne({email}).then((findUser) => {
      bcrypt.compare(password, findUser.password).then((comparepassword) => 
      {
        if(!comparepassword) 
        {
          res.status(401).send({status: "401", msg : 'Bad credentials'});
        }else 
        {
          const token = jwt.sign({id: findUser._id},process.env.SECRET_KEY, {expiresIn : '3h'});
          res.status(200).send({status:"200",user: findUser, token});
        }
      })
      }).catch(() => {
        res.status(401).send({msg : 'Bad credentials', status:"401"});
        
      })
}
exports.IsAuth = async (req,res) => {
  try {
      const token = req.headers.authorization; 
      if (!token) 
      {
          res.status(401).send({msg: 'you are not authorized' , isAuth: false})
      } else 
      {
          const decoded = jwt.verify(token, process.env.SECRET_KEY);
          const user = await UserSchema.findOne({ _id: decoded.id });
          if(!user)
          {
              res.status(402).send({ msg: 'User doesnt exist', isAuth: false });
          } 
          else 
          {
              req.user = user; 
              res.status(200).send({ msg: 'authorized', user: req.user , isAuth: true});
              
          }
      
      }
  }catch (error)
  {
      res.status(403).send({ errors: [{ msg: 'you are not authorized' , isAuth: false}] });
  }
};