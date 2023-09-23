import videojs from 'video.js';

import { ZoomFunction } from './ZoomFunction';
import { ZoomModalContent } from './ZoomModalContent';

const Component = videojs.getComponent('Component');

export class ZoomModal extends Component {

	constructor(player, options) {
		super(player, options);
		this.player = player.el();
		this.plugin = options.plugin;
		this.function = new ZoomFunction(player, options);
		player.on('playing', () => {
			this.listeners();
		});
	}

	createEl() {
		const modal = videojs.dom.createEl('div', {
			className: 'vjs-zoom-duck__container'
		});
		const content = new ZoomModalContent(this.options_);
		modal.innerHTML = content.getContent();
		return modal;
	}

	listeners() {
		let buttons = this.player.getElementsByClassName('vjs-zoom-duck__button');
		buttons = Array.from(buttons);
		buttons.map(button => {
			const [, action] = button.id.split('__');
			button.onclick = () => this.function[action]();
		});
	}

	toggle() {
		const [ modal ] = this.player.getElementsByClassName('vjs-zoom-duck__container');
		modal.classList.toggle('open');
		this.plugin.listeners.click();
	}

	open() {
		const [ modal ] = this.player.getElementsByClassName('vjs-zoom-duck__container');
		modal.classList.add('open');
		this.plugin.listeners.click();
	}

	close() {
		const [ modal ] = this.player.getElementsByClassName('vjs-zoom-duck__container');
		modal.classList.remove('open');
		this.plugin.listeners.click();
	}

}
