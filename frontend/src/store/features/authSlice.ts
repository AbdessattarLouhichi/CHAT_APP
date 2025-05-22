import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, forgotPassword, resetPassword } from '../api/authApi'


// Typing
type UserInfo = {
    id?: string;
    name?: string;
    email?: string;
};

type OnlineUser = {
    id: string;
    name: string;
    profilePic?: string;
    // add other properties as needed
};
type AuthState = {
    loading: boolean;
    userInfo: UserInfo;
    userToken: string | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    onlineUsers: OnlineUser[];
    socket: any; // Replace `any` with the correct type if using Socket.io
    error: string | null;
    success: boolean;
};

const initialState: AuthState =  {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,
    error:  null as string | null, // for error message
    success: false, // for monitoring the registration process.
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set the socket instance
        setSocket(state, action) {
            state.socket = action.payload;
        },
        // Action to update the list of online users
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload;
        },
        // Action to add a user to the online users list
        addOnlineUser(state, action) {
            state.onlineUsers.push(action.payload);
        },
        // Action to remove a user from the online users list
        removeOnlineUser(state, action) {
            state.onlineUsers = state.onlineUsers.filter(user => user.id !== action.payload.id);
        },
    },
    extraReducers:(builder) => {
        // Register
        builder.addCase(register.pending, (state : AuthState) => {
            state.loading = true
        })

        builder.addCase(register.fulfilled, (state : AuthState, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
            state.error = ''
        })

        builder.addCase(register.rejected, (state : AuthState, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message as string
            state.success = false
        })
        
        //Login
        builder.addCase(login.pending, (state : AuthState) => {
            state.loading = true
        })

        builder.addCase(login.fulfilled, (state : AuthState, action) => {
            state.loading = false
            state.userInfo = action.payload.id
            state.userToken = action.payload.token
            state.success = true
            state.error = ''
        })

        builder.addCase(login.rejected, (state : AuthState, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message as string
            state.success = false
        })
         // logout
         builder.addCase(logout.pending, (state : AuthState) => {
            state.loading = true
        })

        builder.addCase(logout.fulfilled, (state: AuthState) => {
            state.loading = false
            state.success = true
            state.error = ''
        })

        builder.addCase(logout.rejected, (state: AuthState, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message  as string
            state.success = false
        })
         // Forgot Password
         builder.addCase(forgotPassword.pending, (state: AuthState) => {
            state.loading = true
        })

        builder.addCase(forgotPassword.fulfilled, (state: AuthState, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
            state.error = ''
        })

        builder.addCase(forgotPassword.rejected, (state: AuthState, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message as string
            state.success = false
        })
        // Reset Password
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true
        })

        builder.addCase(resetPassword.fulfilled, (state: AuthState, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
            state.error = ''
        })

        builder.addCase(resetPassword.rejected, (state: AuthState, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message as string
            state.success = false
        })
    }
})

export const { setSocket, setOnlineUsers, addOnlineUser, removeOnlineUser } = authSlice.actions;
export default authSlice.reducer