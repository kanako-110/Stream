import history from "../history";
import streams from "../apis/streams";
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	DELETE_STREAM,
	EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId,
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT,
	};
};

export const createStream = (formValues) => async (dispatch, getState) => {
	// getStateはreduxの機能。gatStateはreduxのStoreの内容を取ることを可能とする。
	const { userId } = getState().auth;
	// 　/streamsにformValueを入れる
	//  /streamsとは、apiフォルダよりimportしたもの。postはインストールしたjson-serverの機能。第二引数の内容を追加することを可能とする
	const response = await streams.post("/streams", { ...formValues, userId });
	dispatch({ type: CREATE_STREAM, payload: response.data });
	history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
	const response = await streams.get("/streams");
	dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
	const response = await streams.get(`/streams/${id}`);
	dispatch({ type: FETCH_STREAM, payload: response.data });
};

// formValue:このactionが呼ばれたときの内容
export const editStream = (id, formValues) => async (dispatch) => {
	const response = await streams.patch(`/streams/${id}`, formValues);
	dispatch({ type: EDIT_STREAM, payload: response.data });
	history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
	await streams.delete(`/streams/${id}`);
	dispatch({ type: DELETE_STREAM, payload: id });
	history.push("/");
};
