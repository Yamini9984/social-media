const authReducer = (
    state = { authData: null, loading: false, error: null, updateLoading: false },
    action
) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: null };
        case "AUTH_SUCCESS":
            // Save the auth data (e.g., token) to localStorage
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, loading: false, error: null };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: action.payload || "Authentication failed" };

        case "UPDATING_START":
            return { ...state, updateLoading: true, error: null };
        case "UPDATING_SUCCESS":
            // Update profile data in localStorage
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data, updateLoading: false, error: null };
        case "UPDATING_FAIL":
            return { ...state, updateLoading: false, error: action.payload || "Profile update failed" };

        case "FOLLOW_USER":
            // Add the person to the following array
            return {
                ...state,
                authData: {
                    ...state.authData,
                    user: {
                        ...state.authData.user,
                        following: [...state.authData.user.following, action.data]
                    }
                }
            };

        case "UNFOLLOW_USER":
            // Remove the person from the following array
            return {
                ...state,
                authData: {
                    ...state.authData,
                    user: {
                        ...state.authData.user,
                        following: state.authData.user.following.filter(
                            (personId) => personId !== action.data
                        )
                    }
                }
            };

        case "LOG_OUT":
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: null };

        default:
            return state;
    }
};

export default authReducer;
