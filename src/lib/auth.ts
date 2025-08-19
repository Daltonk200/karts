import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export interface AuthUser {
  userId: string;
  username: string;
  email: string;
  role: string;
}

// Authentication middleware
export const authenticateToken = async (
  request: Request
): Promise<AuthUser | null> => {
  const authHeader = request.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
};

// Generate JWT token
export const generateToken = (user: AuthUser): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "24h" });
};

// Verify token from client side
export const verifyToken = (token: string): AuthUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    return decoded;
  } catch (error) {
    return null;
  }
};
