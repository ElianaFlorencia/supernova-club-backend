
exports.requireAdmin = (req, res, next) => {
  console.log("USUARIO EN ADMIN:", req.user);
    if (!req.user || req.user.is_admin !== true) {
        return res.status(403).json({
            success: false,
            message: "Acceso denegado. No tiene permiso de Administrador"
        });
    }

    next();
};