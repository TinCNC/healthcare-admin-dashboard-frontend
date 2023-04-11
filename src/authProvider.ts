// import { LegacyAuthProvider as AuthProvider } from "@refinedev/core";

// import { supabaseClient } from "utility";

// const authProvider: AuthProvider = {
//   login: async ({ email, password }) => {
//     const { data, error } = await supabaseClient.auth.signInWithPassword({
//       email,
//       password,
//       // provider: providerName,
//     });

//     if (error) {
//       return Promise.reject(error);
//     }

//     if (user) {
//       return Promise.resolve();
//     }

//     // for third-party login
//     return Promise.resolve(false);
//   },
//   register: async ({ email, password }) => {
//     const { user, error } = await supabaseClient.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       return Promise.reject(error);
//     }

//     if (user) {
//       return Promise.resolve();
//     }
//   },
//   forgotPassword: async ({ email }) => {
//     const { data, error } = await supabaseClient.auth.api.resetPasswordForEmail(
//       email,
//       {
//         redirectTo: `${window.location.origin}/update-password`,
//       }
//     );

//     if (error) {
//       return Promise.reject(error);
//     }

//     if (data) {
//       return Promise.resolve();
//     }
//   },
//   updatePassword: async ({ password }) => {
//     const { data, error } = await supabaseClient.auth.update({ password });

//     if (error) {
//       return Promise.reject(error);
//     }

//     if (data) {
//       return Promise.resolve("/");
//     }
//   },
//   logout: async () => {
//     const { error } = await supabaseClient.auth.signOut();

//     if (error) {
//       return Promise.reject(error);
//     }

//     return Promise.resolve("/");
//   },
//   checkError: () => Promise.resolve(),
//   checkAuth: async () => {
//     const session = supabaseClient.auth.session();
//     const sessionFromURL = await supabaseClient.auth.getSessionFromUrl();

//     if (session || sessionFromURL?.data?.user) {
//       return Promise.resolve();
//     }

//     return Promise.reject();
//   },
//   getPermissions: async () => {
//     const user = supabaseClient.auth.user();

//     if (user) {
//       return Promise.resolve(user.role);
//     }
//   },
//   getUserIdentity: async () => {
//     const user = supabaseClient.auth.user();

//     if (user) {
//       return Promise.resolve({
//         ...user,
//         name: user.email,
//       });
//     }
//   },
// };

// export default authProvider;

import { AuthBindings } from "@refinedev/core";

import { supabaseClient } from "utility";

const authProvider: AuthBindings = {
  login: async ({ email, password, providerName }) => {
    // sign in with oauth
    try {
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        if (data?.url) {
          return {
            success: true,
            redirectTo: "/",
          };
        }
      }

      // sign in with email and password
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data?.user) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ email, password }) => {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async ({ password }) => {
    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data) {
        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    const user = await supabaseClient.auth.getUser();

    if (user) {
      return user.data.user?.role;
    }

    return null;
  },
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      };
    }

    return null;
  },
};

export default authProvider;
