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
	}

	debouncedLoadIfNearViewport = throttle(
		this.loadIfNearViewport.bind(this),
		40
	)

	addWindowEventListeners() {
		windowEvents.forEach(
			event => window.addEventListener(
				event,
				this.debouncedLoadIfNearViewport
			)
		);
	}

	removeWindowEventListeners() {
		windowEvents.forEach(
			event => window.removeEventListener(
				event,
				this.debouncedLoadIfNearViewport
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

	loadIfNearViewport() {
		if (isNearViewport(this.element, 50)) {
			this.loadImage();
		}
	}

	loadImage() {
		if (this.state.loaded) {
			return;
		}

		this.removeWindowEventListeners();

		this.setState({
			loadState: LoadStates.LOADING,
		});

		// If the image hasn't loaded in a bit, show it anyway
		this.loadTimeoutId = window.setTimeout(
			this.imageDidLoad, 2500
		);
	}

	imageDidLoad = () => {
		this.setState({
			loadState: LoadStates.LOADED,
		});
	}

	imageDidError = () => {
		this.setState({
			loadState: LoadStates.ERROR,
		});
	}

	render() {
		const { image, width, height, className } = this.props;
		const { loadState } = this.state;
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
						opacity: (loadState === LoadStates.LOADED) ? 1 : 0
					}}
					onLoad={this.imageDidLoad}
					onError={this.imageDidError}
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
