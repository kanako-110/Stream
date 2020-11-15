import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

/* BAD: <a href="/pagetwo>　←htmlを全て最初から読み込むことになり、今まで得たデータすべてを失うことになる */

/* そこでreactでは代わりにLinkを使う。これによって同じhtml内でurlのみ変えることが可能になる(他のコンポーネントを一時的に隠してる感じ) */

// <Link to="/pagetwo">Navigate to Page Two</Link>

const App = () => {
	return (
		<div className=" ui container">
			<Router history={history}>
				<div>
					<Header />
					{/* Switchによって、１つのコンポーネントのみ返されるようになる。→StreamCreatのURLでStreamShowが出てこない */}
					<Switch>
						<Route path="/" exact component={StreamList} />
						<Route path="/streams/new" exact component={StreamCreate} />
						{/* :id →何かしら。を意味する。edit/以降にどんな数字や文字が入ってもeditページが表示されるようになる。「：」がそれを可能とし、：anythingでも：の後は任意の名前 */}
						<Route path="/streams/edit/:id" exact component={StreamEdit} />
						<Route path="/streams/delete/:id" exact component={StreamDelete} />
						<Route path="/streams/:id" exact component={StreamShow} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
