import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
	return ReactDOM.createPortal(
		// props.onDismiss:押したときにmodalが消えるようになる関数
		<div onClick={props.onDismiss} className="ui dimmer modals visible active">
			{/* stopPropagationとは。この親divの挙動(今回ならonClick history/push)がこれ以降のdivでは行われないように設定できる */}
			<div
				onClick={(e) => e.stopPropagation()}
				className="ui standard modal visible active"
			>
				<div className="header"> {props.title} </div>
				<div className="content">{props.content}</div>
				<div className="actions">{props.actions}</div>
			</div>
		</div>,
		document.querySelector("#modal")
	);
};

export default Modal;
