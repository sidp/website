import ReactGA from 'react-ga';
import { config } from 'config';

if (process.env.NODE_ENV === 'production') {
	ReactGA.initialize(config.googleAnalyticsId);

	exports.onRouteUpdate = (state, page, pages) => {
		ReactGA.pageview(state.pathname);
	};
}
