const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User already exists.");
        }

        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }
        if (!name) {
            throw new Error("Please provide a name.");
        }

        const payload = {
            ...req.body,
            role: "GENERAL"
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
