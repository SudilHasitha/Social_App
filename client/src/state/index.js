/* Here is the explanation for the code above:
1. We import the createSlice function from the redux toolkit and use it to create a slice of the global state.
2. We create an initial state for the slice.
3. We define the reducers. These are functions that are called when an action is dispatched. 
   The action type is the name of the reducer function.
4. We export the actions defined in the slice.
5. We export the reducer function defined in the slice. 
*/


import {createSlice} from '@reduxjs/toolkit';

const initialState = {          
    mode: 'light',
    user: null,
    token: null,
    post: [],
};

/* Here is the explanation for the code above:
1. Create a slice with the name 'auth' and the initial state is the initialState variable.
2. Create reducers and actions inside the reducers. 
3. The setMode reducer is used to change the mode from light mode to dark mode and vice versa.
4. The setLogin reducer is used to set the user and the token in the state. 
5. The setLogout reducer is used to remove the user and the token from the state.
6. The setFriends reducer is used to set the friends of the user in the state.
7. The setPosts reducer is used to set the posts of the user in the state.
8. The setPost reducer is used to set a post of the user in the state. */

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {  
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friend;
            }else{
                console.log("User not found");
            }
        },
        setPosts: (state, action) => {
            state.post = action.payload.post;
        },
        setPost: (state, action) => {
            const updatedPost = state.post.map((post) => {
                if(post._id === action.payload.post._id){
                    return action.payload.post;
                }
                return post;
            });
            state.post = updatedPost;
        }
    }
});

export const {setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;