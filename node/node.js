import React, { Component } from 'react';

class Node extends Component {
	render () {
		let icon = '';
		if (this.props.childrenVisiblity === 'none') {
			icon = '+';
		} else {
			icon = '-';
		}

		return (
			<div className={ 'node_' + this.props.level }
				style={{textIndent: this.props.level + 'em', display: this.props.display }}>
				<span id={ this.props.id } onClick={ this.props.clickHandler } className='tree-node-icon'>{ icon + '  ' }</span>
				<span >{ this.props.value }</span>
			</div>
		)
	}
}

export default Node;