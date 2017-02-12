import React, { Component, PropTypes } from 'react';
import { throttle, once } from 'lodash';
import loadImages from '../../utils/load-images';

import styles from './parallax-image.module.css';

export default class ParallaxImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			initialized: false,
			x: 0,
			y: 0,
			hover: false,
		};

		this.boundInitialize = once(this.initialize.bind(this));
		this.boundHandleMouseMove = throttle(
			this.handleMouseMove.bind(this), 16, { trailing: false }
		);
		this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
	}

	componentDidMount() {
		this.el.addEventListener('mousemove', this.boundInitialize);
	}

	componentWillUnmount() {
		if (this.state.initialized) {
			this.el.removeEventListener('mousemove', this.boundHandleMouseMove);
			this.el.removeEventListener('mouseleave', this.boundHandleMouseLeave);
		} else {
			this.el.removeEventListener('mousemove', this.boundInitialize);
		}
	}

	initialize() {
		this.el.removeEventListener('mousemove', this.boundInitialize);

		const images = this.props.images.map(image => image.src);
		loadImages(images, (err) => {
			if (err) {
				return;
			}

			this.setState({
				initialized: true,
			});

			window.setInterval(() => {
				this.el.addEventListener('mousemove', this.boundHandleMouseMove);
				this.el.addEventListener('mouseleave', this.boundHandleMouseLeave);
			}, 300); // fade out of flattened image takes 300ms
		});
	}

	handleMouseMove(ev) {
		if (this.props.images.length === 0) {
			return;
		}

		const rect = this.el.getBoundingClientRect();

		this.setState({
			x: ev.clientX - rect.left - (rect.width / 2),
			y: ev.clientY - rect.top - (rect.height / 2),
			hover: true,
		});
	}

	handleMouseLeave() {
		this.setState({
			x: 0,
			y: 0,
			hover: false,
		});
	}

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
		}
	}

	render() {
		let images;
		let frameClassName = styles['frame'];

		if (this.state.initialized) {
			images = this.props.images.map(image => (
				<img
					key={image.src}
					src={image.src}
					role="presentation"
					className={styles['image']}
					style={this.getPositionFromDepth(image.depth)}
				/>
			));
			frameClassName += ` ${styles.initialized}`
		}

		return (
			<div
				className={frameClassName}
				ref={el => { this.el = el; }}
			>
				{images}
				<img
					src={this.props.flattened}
					role="presentation"
					className={`${styles['image']} ${styles['flattened']}`}
					style={{
						willChange: !this.state.initialized ? 'opacity' : '',
					}}
				/>
			</div>
		);
	}
}

ParallaxImage.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({
		depth: PropTypes.number.isRequired,
		src: PropTypes.string,
	})),
	flattened: PropTypes.string,
};

ParallaxImage.defaultProps = {
	images: [],
	flattened: PropTypes.string,
};
