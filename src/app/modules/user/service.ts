import { generateOTP, getOtpExpiryTime } from '../../utils/util.js';
import { BadRequestError, NotFoundError } from '../../utils/error.js';
import User from './model.js';
import { createSession, deleteSession } from '../../utils/session.js';
import { hash } from '../../utils/bcryptiUtils.js';

export const register = async (fullName: string, email: string, password: string) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new BadRequestError(`Email already in use`);

    const code = generateOTP();
    const expiry = getOtpExpiryTime();

    const user = await User.create({
        fullName,
        email,
        password,
        otp: code,
        expired_at: expiry,
    });

    //TODO  : send email to user with login details

    return {
        status: true,
        message: "Success! user created",
        data: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            roleId: user.roleId,
            permissionIds: user.permissionIds,
        },
    };
}


export const login = async (email: string, password: string) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new BadRequestError(`Incorrect login details`);

    if (!(await user.comparePassword(password))) {
        throw new BadRequestError("Incorrect login details");
    }

    const token = user.generateJWT();

    const sessionData = {
        id: user._id,
        email: user.email,
        roleId: user.roleId,
        permissionIds: user.permissionIds,
    };

    await createSession(user.id, sessionData);

    return {
        success: true,
        message: `Welcome ${user.fullName}`,
        data: {
            id: user._id,
            email: user.email,
            roleId: user.roleId,
            permissionIds: user.permissionIds,
        },
        token,
    };
}

export const logout = async (userId: string) => {
    await deleteSession(userId);

    return {
        success: true,
        message: "Logout successful",
        data: {}
    };
}



export const forgotPassword = async (email: string) => {

    const user = await User.findOne({ email });

    if (!user) throw new NotFoundError("User not found");


    const code = generateOTP();
    const expiry = getOtpExpiryTime();

    await User.findByIdAndUpdate(user._id, { resetPasswordToken: code, resetPasswordExpires: expiry });


    /// todo send Email
    return { success: true, message: "Reset email sent" };
};



export const resetPassword = async (email: string, code: string, newPassword: string) => {
    const user = await User.findOne({ email });

    if (!user) throw new NotFoundError(`User not found`);

    if (user.otp !== code) {
        throw new BadRequestError(`Invalid OTP`);
    }

    const otpExpiryDuration = getOtpExpiryTime();

    if (Date.now() > otpExpiryDuration.getTime())
        throw new BadRequestError(`Expired OTP`);

    const hashedPassword = await hash(newPassword);

    // Update user with new password and unset OTP fields
    const updatedUser = await User.findOneAndUpdate(
        { email },
        {
            $set: {
                password: hashedPassword,
            },
            $unset: {
                // Use $unset to remove fields
                otp: "",
                expired_at: "",
            },
        },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        throw new BadRequestError("Failed to update user");
    }

    const data = user.toJSON();
    return {
        success: true,
        message: " Password reset  successfully!",
        data,
    };

};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string) => {
    const user = await User.findById(userId).select("+password");


    if (!user) throw new NotFoundError("User not found");


    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) throw new BadRequestError("Old password is incorrect");

    const hashedPassword = await hash(newPassword);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });




    return { success: true, message: "Password changed successfully" };
};
