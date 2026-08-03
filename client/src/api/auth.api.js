import api from "./axios";

// ================================
// REGISTER
// ================================
export const registerUser = async (data) => {    
    const response = await api.post("/api/user/register", data);
    return response.data;
};

// ================================
// LOGIN
// ================================
export const loginUser = async (data) => {
    const response = await api.post("/api/user/login", data);    
    return response.data;
};

// ================================
// Email check
// ================================
export const checkEmail = async (email) => {
    const response = await api.post("/api/user/check-email", {
        email,
    });
    return response.data;
};

// ================================
// LOGOUT
// ================================
export const logoutUser = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

// ================================
// REFRESH ACCESS TOKEN
// ================================
export const refreshAccessToken = async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
};

// ================================
// FORGOT PASSWORD
// ================================
export const forgotPassword = async (email) => {
    const response = await api.post("/auth/forgot-password", {
        email,
    });

    return response.data;
};

// ================================
// UPDATE PASSWORD
// ================================
export const updatePassword = async (token, password) => {
    const response = await api.patch(
        `/auth/reset-password/${token}`,
        {
            password,
        }
    );

    return response.data;
};