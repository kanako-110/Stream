import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		console.log(formValues);
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		console.log(this.props.stream);
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h3>Edit a Stream</h3>
				{/* initialValuesはreduxFormに設定してあるプロパティ。 */}
				<StreamForm
					// initialValues={{ title: "Edit me", description: "Change me too" }}とかく→ titleという名前のField(StreamFormの)にEdit meを入れてくれる。右も同じ。
					// this.props.streamはkey名にそれぞれtitleとdescriptionが設定されているため、自動にそれぞれのFieldに入ってくれる
					// しかし、this.props.streamだけだとidとかuserId(editする必要のないもの)も余計に取ってきちゃう。そこでlodashのpickを使って第二引数の2つを第一引数からとりだす文を書く
					initialValues={_.pick(this.props.stream, "title", "description")}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

// ownPropsは当コンポーネント(今回ならStreamEdit)のpropsの中身。
const mapStateToProps = (state, ownProps) => {
	// このページのidとあっているものだけをターゲットにするために[]の内容を書く。
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
	StreamEdit
);
