import crypto from "node:crypto";

export const generateRandomPassword = () => {
    const password = crypto.randomBytes(16).toString("base64url");

    return password
}