import { Controller } from "../../utils/constant.js";
import { changePassword, forgotPassword, register, resetPassword, login, logout } from "./service.js";



export const CreateUser: Controller = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        res.status(201).json(await register(name, email, password));
    } catch (error) {
        next(error);
    }
}



export const LoginUser: Controller = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        res.status(200).json(await login(email, password));
    } catch (error) {
        next(error);
    }
}

export const LogoutUser: Controller = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(200).json(await logout(userId));
    } catch (error) {
        next(error);
    }
}


export const ForgotPassword: Controller = async (req, res, next) => {
    try {
        const { email } = req.body;
        res.status(200).json(await forgotPassword(email));
    } catch (error) {
        next(error);
    }
};

export const ResetPassword: Controller = async (req, res, next) => {
    try {
        const { email, code, newPassword } = req.body;
        res.status(200).json(await resetPassword(email, code, newPassword));
    } catch (error) {
        next(error);
    }
};

export const ChangePassword: Controller = async (req, res, next) => {
    try {
        const { userId } = req.user || req.body;
        const { oldPassword, newPassword } = req.body;
        res.status(200).json(await changePassword(userId, oldPassword, newPassword));
    } catch (error) {
        next(error);
    }
};
