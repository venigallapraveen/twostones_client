import streams from '../apis/streams';
import api from '../apis/auth';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';

export const signIn = formValues => async (dispatch, getState) => {

  const response = await api.post('/auth/login', { ...formValues });

  localStorage.setItem('userId', response.data.userId );
  localStorage.setItem('userState', 'true' );
  dispatch({ type: SIGN_IN, payload: response.data });


  history.push('/');
};


export const signUp = formValues => async (dispatch, getState) => {

  const response = await api.put('/auth/signup', { ...formValues });

  localStorage.setItem('message', response.data.message );
  localStorage.setItem('userSignUp', 'true' );
  dispatch({ type: SIGN_UP, payload: response.data });


  history.push('/login');
};




// export const signOut = () => {
//   return {
//     type: SIGN_OUT
//   };
// };


export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem('userId')
    localStorage.removeItem('userState')
    localStorage.removeItem('message')
    localStorage.removeItem('userSignUp')
    dispatch({ type: SIGN_OUT })
    history.push('/login')
  } catch (err) {
    if (err.response.status === 401) {
      history.push('/login')
    }
    console.log(err)
  }
}




export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  console.log('user id', userId);
  const response = await api.post(`/feed/post/${userId}`, formValues);

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await api.get('/feed/posts');

  dispatch({ type: FETCH_STREAMS, payload: response.data.posts });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
