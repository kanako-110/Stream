import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
	// metaの中のerrorとtouched
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	// meta: validationで定義した内容を含ませたform全体の内容
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label> {label} </label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<form
				className="ui form error"
				onSubmit={this.props.handleSubmit(this.onSubmit)}
			>
				{/* nameによって、このFieldのnameを指定してる */}
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter description"
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

// fromValueを引数に指定：exportで関連づけた、StreamCreateにある内容すべてが参照できるようになる
const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		// 上記のerrors={}にtitleを追加して、その中身は右です
		// !formValue.titleのとき、これを<Field />に付け足します
		// Fieldの中身はrenderInputコンポーネントなので、その中身に引き渡される
		// titleと指定することでField内のtitleと紐づけ
		errors.title = "You must enter a title";
	}

	if (!formValues.description) {
		// descriptionと指定することでFieldないのdescriptionと紐づけ
		errors.description = "You must enter a description";
	}
	// 上記で追加したerror内容を返します
	// この内容はは、metaで参照する
	return errors;
};

export default reduxForm({
	form: "streamForm",
	validate,
})(StreamForm);
