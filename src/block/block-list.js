import './style.scss';
import './editor.scss';

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType('klarity/action-list-block', {
	title: __('Action Network action list'),
	icon: 'admin-site',
	category: 'layout',
	edit: props => {
		return <span>
			{<div>You can add one or multiple Action Network blocks hereunder.</div>}
			<InnerBlocks allowedBlocks={'klarity/action-block'} />
		</span>;
	},

	save: props => {
		return <div className="row">
			<InnerBlocks.Content />
		</div>
	},
});
