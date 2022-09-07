const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) =>{
    const authHeader = req.get('Authorization');

  if (!(authHeader && authHeader.toLocaleLowerCase().startsWith('bearer '))) {
    res.status(401).json({message: "Missing or invalid token"});
    return false;
  }

  const token = authHeader.substring(7);
  
  if (!token && !jwt.verify(token, process.env.JWT_SECRET)) {
    res.status(401).json({message: "Unauthorized"});
    return false;
  }
  
  return jwt.decode(token)&&true;
}
module.exports ={
    checkAuth
}