const jwt = require ('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
    const authHeader =req.headers.authorization;
    if(!authHeader){
        return res.status (401).json ({success: false, message: 'Token de autenticacion no proporcionado'});
    }
    //el valor del encabezado de autorizacion debe tener e formarto Bearer tu_token
    const [bearer, token] = authHeader.split (' ');
    if (bearer !== 'Bearer' || !token) {
        return res.status (401).json ({success: false, message: 'Formato de token no válido'});
    }
    try{
         console.log("TOKEN RECIBIDO:", token);
         console.log("SECRET ACCESS:", process.env.JWT_ACCESS_TOKEN_SECRET);
        const decodedToken = jwt.verify (token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user = decodedToken;
        next ();
    }catch (error){
        return res.status (401).json ({success: false, message: 'Token de autenticacion inválido'});
    }
}
