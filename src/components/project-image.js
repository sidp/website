import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import isNearViewport from '../utils/is-near-viewport';
import { imageProps } from './prop-types';

const LoadStates = {
	NONE: 'NONE',
	LOADING: 'LOADING',
	LOADED: 'LOADED',
	ERROR: 'ERROR',
};

// The relevant window events for checking if the image should load
const windowEvents = ['load', 'scroll', 'resize'];

export default class ProjectImage extends PureComponent {
	static propTypes = {
		image: imageProps.isRequired,
		width: PropTypes.number,
		height: PropTypes.number,
		className: PropTypes.string,
	};

	static defaultProps = {
		// Width and height proptypes for future implementation
		width: 2560,
		height: 1400,
		className: '',
	};

	state = {
		loadState: LoadStates.NONE,
		inTransition: false,
	};

	loadIfNearViewport = () => {
		if (isNearViewport(this.element, 50)) {
			this.loadImage();
		}
	};

	throttledLoadIfNearViewport = throttle(this.loadIfNearViewport, 60);

	addWindowEventListeners() {
		windowEvents.forEach(event =>
			window.addEventListener(event, this.throttledLoadIfNearViewport)
		);
	}

	removeWindowEventListeners() {
		windowEvents.forEach(event =>
			window.removeEventListener(event, this.throttledLoadIfNearViewport)
		);
	}

	componentDidMount() {
		this.addWindowEventListeners();
		this.loadIfNearViewport();
	}

	componentWillUnmount() {
		this.removeWindowEventListeners();
		window.clearTimeout(this.loadTimeoutId);
	}

	loadImage() {
		if (this.state.loadState !== LoadStates.NONE) {
			return;
		}

		this.removeWindowEventListeners();

		this.setState({
			loadState: LoadStates.LOADING,
		});

		// If the image hasn't loaded in a bit, show it anyway
		this.loadTimeoutId = window.setTimeout(() => {
			if (this.loadState === LoadStates.LOADING) {
				this.handleImageLoad();
			}
		}, 2500);
	}

	handleImageLoad = () => {
		this.setState({
			loadState: LoadStates.LOADED,
			inTransition: true,
		});
	};

	handleImageError = () => {
		this.setState({
			loadState: LoadStates.ERROR,
		});
	};

	handleImageTransitionEnd = () => {
		this.setState({
			inTransition: false,
		});
	};

	render() {
		const { image, width, height, className } = this.props;
		const { loadState, inTransition } = this.state;

		if (!image) return <span />;

		let imageElement;
		if (loadState !== LoadStates.NONE) {
			const showImageElement =
				[LoadStates.LOADED, LoadStates.ERROR].indexOf(loadState) !== -1;
			const willChangeOpacity =
				loadState === LoadStates.LOADING || inTransition;

			imageElement = (
				<img
					src={image.src}
					sizes="100vw"
					srcSet={image.srcSet}
					alt={image.title}
					style={{
						opacity: showImageElement ? 1 : 0,
						willChange: willChangeOpacity ? 'opacity' : 'auto',
					}}
					onLoad={this.handleImageLoad}
					onError={this.handleImageError}
					onTransitionEnd={this.handleImageTransitionEnd}
				/>
			);
		}

		const wrapperStyle = {
			paddingTop: `${(height / width) * 100}%`,
			backgroundImage: `url(${image.base64})`,
		};

		return (
			<Wrapper
				error={loadState === LoadStates.ERROR}
				style={wrapperStyle}
				className={className}
				ref={el => (this.element = el)}
			>
				{imageElement}
			</Wrapper>
		);
	}
}

/**
 * Styled components
 */

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	height: 0;
	background-size: 100%;

	& > img {
		position: absolute;
		top: 0;
		z-index: 3;
		width: 100%;
		height: 100%;
		transition: opacity 350ms linear;
	}

	/* overlay on error */
	&::before {
		content: '';
		display: none;
		background-color: #eee;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		opacity: 0;
		transition: opacity 400ms linear;

		${props =>
			props.error
				? `
					display: block;
					opacity: 0.66;
				`
				: ''};
	}
`;

/*

.wrapper.error {

	&::before {
	}
}



*/
