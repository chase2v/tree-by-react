import React, { Component } from 'react';

import Node from './node';

class Root extends Component {
	constructor () {
		super();
		console.log(2)
		this.data = [
			'美食',
			['素菜', [ '带汤的', ['上汤娃娃菜', '青菜钵']], ['不带汤的', ['香菇青菜', '干锅白菜']]],
			['喝的', ['可乐', '啤酒']],
			['烤的', ['烤全羊', '烤乳猪']],
		];

		this.initNode = [];
		this.state = {
			node: []
		}
		this.num = 0;
		this.parentNode = [];
	}

	componentWillMount () {
		this.initNode = this.extract(this.data, 0);
		this.node = this.initNode;
		this.setState({
			node: this.transform(this.node)
		});
	}

	extract (data, level) {
		let node = [];
		
		data.forEach(v => {
			let  l = level;
			if (typeof v === 'string') {
				this.parentNode[l] = this.num;
				console.log(this.parentNode[l-1])
				node.push({
					id: this.num,
					key: this.num++,
					value: v,
					level: l,
					parentNode: this.parentNode[l-1],
					display: 'block',
					childrenVisiblity: 'block'
				});
			} else {
				l++;
				node.push(...this.extract(v, l));
			}
		});

		return node;
	}

	transform(data) {
		let rt = [];
		data.forEach(v => {
			rt.push(
				<Node 
					id={ v.id } 
					key={ v.key } 
					value={ v.value } 
					level={ v.level } 
					parentNode={ v.parentNode } 
					clickHandler={ (event)=>this.clickHandler(event) } 
					display={ v.display }
					childrenVisiblity= { v.childrenVisiblity }
				/>
			);
		});
		return rt;
	}

	clickHandler (event) {
		this.toggle(event.target.id);
		this.setState({
			node: this.transform(this.node)
		});
	}

	toggle (parentNode) {
		let loop = (parentNode, state) => {
			this.node.forEach( (v, i) => {
				if (v.parentNode == parentNode) {
					v.display = state;
					
					if (state === 'none') {
						// 若 state 是 'none'，则循环遍历节点设置显示属性
						loop(v.id, state);
					} else if (v.childrenVisiblity === 'block') {
						// 若此节点的 childrenVisiblity 是 'block', 那么 循环遍历子节点，设置 display 属性
						// 若此节点 。。。'none'，那么什么都不做
						loop(v.id, state);
					}
				}
			})
		}

		let cv = this.node[parentNode].childrenVisiblity;
		let action = cv === 'block' ? 'hide' : 'show';
		this.node[parentNode].childrenVisiblity =  cv === 'block' ? 'none' : 'block';
		if (action === 'hide') {
			loop(parentNode, 'none');
		} else {
			loop(parentNode, 'block');
		}
	}

	render () {
		return (
			<div >
				{ this.state.node }
			</div>
		)
	}
}

export default Root;