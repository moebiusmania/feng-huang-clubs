import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Feng Huang</h1>
				<nav>
					<Link activeClassName={style.active} href="/">Locator</Link>
					<Link activeClassName={style.active} href="/profile">Calendar</Link>
					{/* <Link activeClassName={style.active} href="/profile/john">John</Link> */}
				</nav>
			</header>
		);
	}
}
