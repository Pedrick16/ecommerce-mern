const User  = require('../model/user')
const Product = require('../model/product')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async(request, response) => {
    try {
        const { email, password, usertype} = request.body;
        //check if name was entered
        if(!usertype)
        {
            return response.json({error:'usertype is required'})
        }
        //check if password is good
        if(!password || password.length < 6)
        {
            return response.json({error:'Password is required and should be at least 6 characters long'})
        }
        //check email
        const exist = await User.findOne({email})
        if(exist)
        {
            return response.json({error:'email is taken already'})
        }

        //hashed password
        const hashedPassword = await hashPassword(password)


        const user = await User.create({
           email, password:hashedPassword,usertype
        })

        return response.json(user)



    
        
    } catch (error) {
        console.log(error)
        
    }

}

const loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });

        if (!user) {
            return response.json({ error: "No user found" });
        }
        
        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (match) {
            // Generate and send a JWT token for successful login
            jwt.sign({_id: user.id,  email: user.email, usertype: user.usertype, }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                response.cookie('token', token).json({ success: true, user });
            });
        } else {
            return response.json({ error: "Passwords don't match" });
        }
    } catch (error) {
        console.error(error);
        return response.json({ error: "Server error" });
    }

    
};

const getProfile = (request, response) => {
    const {token} =  request.cookies
    if(token)
    {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) =>  {
            if (err) throw err;
            response.json(user)
        })
    }
    else
    {
        response.json(null)
    }
}

const logoutUser = (request, response) => {
    response.clearCookie('token').json({ message: "Logout successful" });
}






module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
   
  
}