import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import once from 'lodash/once';

import loadImages from '../../utils/load-images';

import styles from './parallax-image.module.css';

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
		effectActive: false,
		x: 0,
		y: 0,
		hover: false,
		scrolling: false,
	};

	constructor(props) {
		super(props);

		this.initializeOnce = once(this.initialize);
		this.handleMouseMoveThrottled = throttle(this.handleMouseMove, 16, {
			trailing: false,
		});
		this.handleScrollThrottled = throttle(this.handleScroll, 100, {
			trailing: false,
		});
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScrollThrottled);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScrollThrottled);
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
		const x = 50 - this.state.x / 180 * depth;
		const y = 50 - this.state.y / 150 * depth;
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
		let frameClassName = styles['frame'];

		if (this.props.images.length === 0) {
			frameClassName += ` ${styles.empty}`;
		}

		if (this.state.initialized) {
			images = this.props.images.map(image =>
				<img
					key={image.src}
					src={image.src}
					role="presentation"
					className={styles['image']}
					style={this.getPositionFromDepth(image.depth)}
				/>
			);
			frameClassName += ` ${styles.initialized}`;
		}

		if (this.props.flattened) {
			flattened = (
				<img
					src={this.props.flattened}
					role="presentation"
					className={`${styles['image']} ${styles['flattened']}`}
					style={{
						willChange: !this.state.initialized ? 'opacity' : '',
					}}
					onTransitionEnd={this.activateEffect}
				/>
			);
		}

		return (
			<div
				className={frameClassName}
				onMouseMove={this.handleMouseMoveThrottled}
				onMouseLeave={this.handleMouseLeave}
				ref={el => {
					this.el = el;
				}}
			>
				{images}
				{flattened}
			</div>
		);
	}
}