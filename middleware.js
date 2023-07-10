const authMiddleware = (req, res, next) => {
    // Perform authentication logic here
    const isAuthenticated = true;
  
    if (isAuthenticated) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };
  
  module.exports = { authMiddleware };
  