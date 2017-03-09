import React, { Component, PropTypes } from 'react';
import throttle from 'lodash/throttle';
import isNearViewport from '../../utils/is-near-viewport';
import { imageProps } from '../prop-types';
import styles from './project-image.module.css';

const LoadStates = {
	NONE: 'NONE',
	LOADING: 'LOADING',
	LOADED: 'LOADED',
	ERROR: 'ERROR',
}

// The relevant window events for checking if the image should load
const windowEvents = ['load', 'scroll', 'resize'];

export default class ProjectImage extends Component {

	static propTypes = {
		image: imageProps.isRequired,
		width: PropTypes.number,
		height: PropTypes.number,
		className: PropTypes.string,
	}

	static defaultProps = {
		// Width and height proptypes for future implementation
		width: 2560,
		height: 1400,
		className: '',
	}

	state = {
		loadState: LoadStates.NONE,
		inTransition: false,
	}

	loadIfNearViewport = () => {
		if (isNearViewport(this.element, 50)) {
			this.loadImage();
		}
	}

	throttledLoadIfNearViewport = throttle(
		this.loadIfNearViewport,
		60
	)

	addWindowEventListeners() {
		windowEvents.forEach(
			event => window.addEventListener(
				event,
				this.throttledLoadIfNearViewport
			)
		);
	}

	removeWindowEventListeners() {
		windowEvents.forEach(
			event => window.removeEventListener(
				event,
				this.throttledLoadIfNearViewport
			)
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
	}

	handleImageError = () => {
		this.setState({
			loadState: LoadStates.ERROR,
		});
	}

	handleImageTransitionEnd = () => {
		this.setState({
			inTransition: false,
		});
	}

	render() {
		const { image, width, height, className } = this.props;
		const { loadState, inTransition } = this.state;
		const src0x = require(`../../images/${image.src0x}`);
		const src1x = require(`../../images/${image.src1x}`);
		const src2x = require(`../../images/${image.src2x}`);

		let imageElement;
		if ([LoadStates.LOADED, LoadStates.LOADING].includes(loadState)) {
			imageElement = (
				<img
					src={src1x}
					sizes="100vw"
					srcSet={`${src1x} 1280w, ${src2x} 2560w`}
					alt={image.title}
					style={{
						opacity: (loadState === LoadStates.LOADED) ? 1 : 0,
						willChange: (loadState === LoadStates.LOADING || inTransition) ? 'opacity': 'auto',
					}}
					onLoad={this.handleImageLoad}
					onError={this.handleImageError}
					onTransitionEnd={this.handleImageTransitionEnd}
				/>
			);
		}

		const wrapperStyle = {
			paddingTop: `${(height / width) * 100}%`,
			backgroundImage: `url(${src0x})`,
		};

		return (
			<div
				className={`${styles['wrapper']} ${className}`}
				style={wrapperStyle}
				ref={ el => this.element = el }
			>
				{imageElement}
			</div>
		);
	}
};
