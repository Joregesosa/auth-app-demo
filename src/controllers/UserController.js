import { User } from "../models/UserModel.js";

export async function index(req, res, next) {
  try {
    const { auth } = req;
    if (auth.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const users = await User.all();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const { auth } = req;
    if (auth.role !== "admin" && auth.id != req.params.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    const user = await User.find(parseInt(id));
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    const { auth } = req;
    if (auth.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const missingKeys = validate(req.body);

    if (missingKeys.length) {
      return res
        .status(400)
        .json({ message: `Fields ${missingKeys.join(", ")} are required` });
    }

    User.create(req.body);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const { auth } = req;
    if (auth.role !== "admin" && auth.id != req.params.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    const user = await User.find(parseInt(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const missingKeys = validate(req.body);

    if (missingKeys.length) {
      return res
        .status(400)
        .json({ message: `Fields ${missingKeys.join(", ")} are required` });
    }

    User.update(parseInt(id), req.body);
    res.json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const { auth } = req;
    if (auth.role !== "admin" && auth.id != req.params.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { id } = req.params;
    const user = await User.find(parseInt(id));
      
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    User.delete(parseInt(id));
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

function validate(body) {
  const keys = ["name", "lastname", "email", "password", "role"];

  const missingKeys = keys.filter((key) => !body[key]);
  return missingKeys;
}

export default { index, show, store, update, remove };
