import './style.scss';
import './editor.scss';

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType('klarity/klarity-action-list-block', {
	title: __('Action list'),
	icon: 'admin-site',
	category: 'layout',
	edit: props => {
		return <span>
			{<div>You can add one or multiple action blocks hereunder.</div>}
			<InnerBlocks allowedBlocks={'klarity/klarity-action-block'} />
		</span>;
	},

	save: props => {
		return <div className="row">
			<InnerBlocks.Content />
		</div>
	},
});
