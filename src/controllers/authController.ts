const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registeredUsers: any[] = [];

const createUserAccount = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all details" });
    }

    const alreadyExists = registeredUsers.find(
      (user) => user.email === email
    );

    if (alreadyExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUserRecord = {
      id: registeredUsers.length + 1,
      name,
      email,
      password: hashedPwd,
      role: "ADMIN"
    };

    registeredUsers.push(newUserRecord);

    return res.status(201).json({
      message: "Account created successfully"
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error occurred" });
  }
};

const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    const user = registeredUsers.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      "YOUR_SECRET_KEY", 
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error occurred" });
  }
};

module.exports = {
  createUserAccount,
  loginUser
};

export {};
