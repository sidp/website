import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import once from 'lodash/once';
import styled from 'styled-components';
import loadImages from '../utils/load-images';
import { imageBoxShadow } from '../styles/variables';
import Preload from './preload';

export default class ParallaxImage extends Component {
	static propTypes = {
		images: PropTypes.arrayOf(
			PropTypes.shape({
				depth: PropTypes.number.isRequired,
				src: PropTypes.string,
			})
		),
		flattened: PropTypes.string,
	};

	static defaultProps = {
		images: [],
		flattened: '',
	};

	state = {
		initialized: false,
		shouldPreload: false,
		effectActive: false,
		x: 0,
		y: 0,
		hover: false,
		scrolling: false,
	};

	constructor(props) {
		super(props);

		this.initializeOnce = once(this.initialize);

		this.handleWindowMouseMoveThrottled = throttle(
			this.handleWindowMouseMove,
			50,
			{ trailing: false }
		);
		this.handleMouseMoveThrottled = throttle(this.handleMouseMove, 16, {
			trailing: false,
		});
		this.handleScrollThrottled = throttle(this.handleScroll, 100, {
			trailing: false,
		});
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScrollThrottled);
		window.addEventListener('mousemove', this.handleWindowMouseMoveThrottled);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScrollThrottled);
		window.removeEventListener(
			'mousemove',
			this.handleWindowMouseMoveThrottled
		);
	}

	initialize = () => {
		const images = this.props.images.map(image => image.src);
		loadImages(images, err => {
			if (err) {
				return;
			}

			this.setState({
				initialized: true,
			});
		});
	};

	activateEffect = () => {
		this.setState({
			effectActive: true,
		});
	};

	handleWindowMouseMove = ev => {
		if (this.state.initialized) {
			return;
		}
		const rect = this.el.getBoundingClientRect();
		const margin = 100;
		const near =
			ev.clientX > rect.left - margin &&
			ev.clientX < rect.left + rect.width + margin &&
			ev.clientY > rect.top - margin &&
			ev.clientY < rect.top + rect.height + margin;

		if (near) {
			this.setState({ shouldPreload: true });
			window.removeEventListener('mousemove', this.handleWindowMouseMove);
		}
	};

	handleMouseMove = ev => {
		if (this.state.scrolling || this.props.images.length === 0) {
			return;
		}

		if (!this.state.initialized) {
			this.initializeOnce();
		} else if (this.state.effectActive) {
			const rect = this.el.getBoundingClientRect();

			this.setState({
				x: ev.clientX - rect.left - rect.width / 2,
				y: ev.clientY - rect.top - rect.height / 2,
				hover: true,
			});
		}
	};

	handleMouseLeave = () => {
		if (this.props.images.length === 0) {
			return;
		}

		this.setState({
			x: 0,
			y: 0,
			hover: false,
		});
	};

	handleScroll = () => {
		this.setState({
			scrolling: true,
		});

		if (this.scrollTimeout) {
			window.clearTimeout(this.scrollTimeout);
		}

		this.scrollTimeout = window.setTimeout(() => {
			this.setState({
				scrolling: false,
			});
		}, 200);
	};

	getPositionFromDepth(depth) {
		const x = 50 - (this.state.x / 180) * depth;
		const y = 50 - (this.state.y / 150) * depth;
		const duration = this.state.hover ? 64 : 350;
		const timingFunction = this.state.hover ? 'linear' : 'ease-out';
		let scale = 1.01;

		if (this.state.hover) {
			scale += 0.02 * Math.abs(depth);
		}

		return {
			willChange: 'transform',
			transform: `translate(-${x}%, -${y}%) scale(${scale})`,
			transition: `transform ${duration}ms ${timingFunction}`,
			zIndex: Math.floor((depth + 1) * 10) + 1,
		};
	}

	render() {
		let images;
		let flattened;

		if (this.state.initialized) {
			images = this.props.images.map(image => (
				<Image
					key={image.src}
					src={image.src}
					role="presentation"
					style={this.getPositionFromDepth(image.depth)}
				/>
			));
		}

		if (this.props.flattened) {
			flattened = (
				<FlattenedImage
					src={this.props.flattened}
					role="presentation"
					initialized={this.state.initialized}
					onTransitionEnd={this.activateEffect}
				/>
			);
		}

		return (
			<Frame
				empty={this.props.images.length === 0}
				onMouseMove={this.handleMouseMoveThrottled}
				onMouseLeave={this.handleMouseLeave}
				ref={el => {
					this.el = el;
				}}
			>
				{this.state.shouldPreload && (
					<Preload images={this.props.images.map(image => image.src)} />
				)}
				{images}
				{flattened}
			</Frame>
		);
	}
}

/**
 * Styled components
 */

const Frame = styled.div`
	width: 100%;
	height: 0;
	padding-top: 75%;
	position: relative;
	overflow: hidden;
	box-shadow: ${imageBoxShadow};

	${props => (props.empty ? 'background-color: #4A4D52' : '')};
`;

const Image = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	transform: translate(-50%, -50%) scale(1.01);
`;

const FlattenedImage = styled(Image)`
	z-index: 100;

	opacity: ${props => (props.initialized ? '0' : '1')};
	transition: opacity 50ms linear;

	will-change: ${props => (!props.initialized ? 'opacity' : '')};
`;
