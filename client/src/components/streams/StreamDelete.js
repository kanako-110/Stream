import React from "react";
import { connect, content } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
	componentDidMount() {
		console.log(this.props);
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions() {
		const id = this.props.match.params.id;
		return (
			<>
				<button
					className="ui button negative"
					onClick={() => this.props.deleteStream(id)}
				>
					Delete
				</button>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</>
		);
	}

	renderContent() {
		if (!this.props.stream) {
			return "Are you sure you want to delete this stream?";
		}

		return `Are you sure you want to delete this stream with title : ${this.props.stream.title}`;
	}

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push("/")}
			/>
		);
	}
}

// ownPropsを引き渡すことで、当コンポーネントの中身(今回ならStreamDeleteの内容、this.props.match.params.idなど)が使えるようになる
const mapStateToProps = (state, ownProps) => {
	// []にidを設定することで、そのidの内容だけをfetchするよう指定できる??
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
	StreamDelete
);
