import { h, Component } from 'preact';
import style from './style';

import GoogleMap from './../../components/google-map';

export default class Home extends Component {
	state = {
		apiKey: process.env.GOOGLE_MAP_KEY
	}

	render() {
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<p>This is the Home component.</p>

				<GoogleMap apiKey={this.state.apiKey} zoom={12} />
			</div>
		);
	}
}
