import jwt from 'jsonwebtoken';

// Middleware para verificar JWT
export const protect = async (req, res, next) => {
  try {
    let token;

    // Obtener token del header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No autorizado - Token requerido'
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido o expirado'
    });
  }
};

// Middleware para verificar si es admin
export const adminOnly = async (req, res, next) => {
  try {
    // Primero verificar token
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        error: 'No autorizado'
      });
    }

    // Aquí puedes añadir lógica para verificar si el usuario es admin
    // Por ahora, continuamos al siguiente middleware
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
