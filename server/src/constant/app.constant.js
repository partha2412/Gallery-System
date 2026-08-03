export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL
};

export const app_constant = {
  cookie: {
    accessToken: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },

    refreshToken: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }
};
