import _ from "lodash";
import {
	CREATE_STREAM,
	FETCH_STREAM,
	FETCH_STREAMS,
	DELETE_STREAM,
	EDIT_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			// mapKeys：第１引数のarrayをobjectにして返します。keyは第二引数で指定できます
			return { ...state, ..._.mapKeys(action.payload, "id") };
		case FETCH_STREAM:
			// ...state= stateの中に右辺を付け足します, [key名の設定]：value設定
			// →stateに、action.payload.idというkey名で、action.payloadが追加される
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case DELETE_STREAM:
			// 第二引数にしていしたものを抜いた、stateを表示します
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
