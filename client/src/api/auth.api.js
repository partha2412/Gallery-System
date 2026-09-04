import api from "./axios";

// ================================
// REGISTER
// ================================
export const registerUser = async (data) => {
    const response = await api.post(
        "/api/user/register",
        data
    );

    return response.data;
};

// ================================
// LOGIN
// ================================
export const loginUser = async (data) => {
    const response = await api.post(
        "/api/user/login",
        data
    );

    return response.data;
};

// ================================
// GET CURRENT USER
// ================================
export const getMe = async () => {
    const response = await api.get(
        "/api/user/me"
    );

    return response.data;
};

// ================================
// EMAIL CHECK
// ================================
export const checkEmail = async (email) => {
    const response = await api.post(
        "/api/user/check-email",
        {
            email,
        }
    );

    return response.data;
};

// ================================
// LOGOUT
// ================================
export const logoutUser = async () => {
    const response = await api.post(
        "/api/user/logout"
    );

    return response.data;
};

// ================================
// REFRESH ACCESS TOKEN
// ================================
export const refreshAccessToken = async () => {
    const response = await api.post(
        "/api/user/refresh"
    );

    return response.data;
};

// ================================
// FORGOT PASSWORD
// ================================
export const forgotPassword = async (email) => {
    const response = await api.post(
        "/api/user/forgot_password",
        {
            email,
        }
    );

    return response.data;
};

// ================================
// RESET / UPDATE PASSWORD
// ================================
export const updatePassword = async (token, password) => {
    const response = await api.post(
        `/api/user/reset-password/${token}`,
        {
            password,
        }
    );

    return response.data;
};