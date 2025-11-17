import DataService from "../services/DataService.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userDataService = new DataService("users.json");

// POST /auth/register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Nome, email e palavra-passe são obrigatórios.",
      });
  }

  const users = await userDataService.readAll();

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res
      .status(409)
      .json({ success: false, message: "Este email já está a ser utilizado." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  });

  users.push(newUser);
  await userDataService.writeAll(users);

  const userResponse = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
  return res.status(201).json({ success: true, data: userResponse });
};

// POST /auth/login -
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email e palavra-passe são obrigatórios.",
      });
  }

  const users = await userDataService.readAll();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Credenciais inválidas." });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Credenciais inválidas." });
  }

  const userResponse = { id: user.id, name: user.name, email: user.email };
  return res.json({
    success: true,
    message: "Login bem-sucedido!",
    data: userResponse,
  });
};
