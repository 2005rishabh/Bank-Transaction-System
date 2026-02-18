const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function userRegisterController(req, res) {
    try {
        const { name, email, password } = req.body;

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(422).json({
                message: "User already exists",
                status: "failed",
            });
        }

        const user = await userModel.create({ email, name, password });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token);

        return res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}


async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email }).select("+password");

        if (!userExist) {
            return res.status(422).json({
                message: "User not found",
                status: "failed",
            });
        }

        const isValidPassword = await userExist.comparePassword(password);

        if (!isValidPassword) {
            return res.status(422).json({
                message: "Invalid password",
                status: "failed",
            });
        }

        const token = jwt.sign(
            { id: userExist._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token);

        return res.status(200).json({
            user: {
                _id: userExist._id,
                email: userExist.email,
                name: userExist.name,
            },
            token,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

module.exports = { userRegisterController, userLoginController };
