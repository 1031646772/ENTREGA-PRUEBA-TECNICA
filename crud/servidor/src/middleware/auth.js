import jwt from "jsonwebtoken";

const SECRET_KEY = "1031646772JUKI56!";

 export function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(403).json({ msg: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // payload (id, username, etc.)
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
}

