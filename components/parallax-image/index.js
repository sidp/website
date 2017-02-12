import React, { Component, PropTypes } from 'react';
import { throttle } from 'lodash';

import styles from './parallax-image.module.css';

export default class ParallaxImage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			x: 0,
			y: 0,
			hover: false,
		};

		this.boundHandleMouseMove = throttle(
			this.handleMouseMove.bind(this), 16, { trailing: false }
		);
		this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
	}

	componentDidMount() {
		this.el.addEventListener('mousemove', this.boundHandleMouseMove);
		this.el.addEventListener('mouseleave', this.boundHandleMouseLeave);
	}

	componentWillUnmount() {
		this.el.removeEventListener('mousemove', this.boundHandleMouseMove);
		this.el.removeEventListener('mouseleave', this.boundHandleMouseLeave);
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
		const x = 50 - this.state.x / 140 * depth;
		const y = 50 - this.state.y / 120 * depth;
		const duration = this.state.hover ? 64 : 350;
		const timingFunction = this.state.hover ? 'linear' : 'ease-out';
		let scale = 1.01;

		if (this.state.hover) {
			scale += 0.03 * Math.abs(depth);
		}

		return {
			willChange: 'transform',
			transform: `translate(-${x}%, -${y}%) scale(${scale})`,
			transition: `transform ${duration}ms ${timingFunction}`,
			zIndex: Math.floor((depth + 1) * 10),
		}
	}

	render() {
		return (
			<div
				className={styles['frame']}
				ref={el => { this.el = el; }}
			>
				{this.props.images.map(image => (
					<img
						key={image.src}
						src={image.src}
						role="presentation"
						className={styles['image']}
						style={this.getPositionFromDepth(image.depth)}
					/>
				))}
			</div>
		);
	}
}

ParallaxImage.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({
		depth: PropTypes.number.isRequired,
		src: PropTypes.string,
	})),
};

ParallaxImage.defaultProps = {
	images: [],
};
