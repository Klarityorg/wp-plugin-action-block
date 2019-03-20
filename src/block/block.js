import './style.scss';
import './editor.scss';

const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;

const el = wp.element.createElement;
const iconEl = el('svg', { width: 128, height: 128, viewBox: "0 0 128 128" },
	el('rect', { x: 0, y: 0, width: 128, height: 128, stroke: "white" }),
	el('path', { d: "M41.7607 39.0615H52.8432V60.866L73.2637 39.0615H86.6547L66.1434 60.2237L87.5885 88.9388H74.2753L58.66 67.706L52.8432 73.6982V88.9388H41.7607V39.0615Z", fill: "white" })
);

const actionTypes = {
	Petition: {
		thumbnail: "/wp-content/plugins/klarity-action-block/images/petition.png",
		defaultTitle: "Sign a petition",
		defaultDescription: 'We need 5000 signatures.'
	},
	Email: {
		thumbnail: "/wp-content/plugins/klarity-action-block/images/email.png",
		defaultTitle: "Send an e-mail",
		defaultDescription: 'Use our template to quickly send an email.'
	}
};

registerBlockType('klarity/klarity-action-block', {
	title: __('Action block'),
	// Only allow in a registered parent-block
	parent: [ 'klarity/klarity-action-list-block' ],
	category: 'layout',
	icon: iconEl,

	attributes: {
		markAsMostValuable: {
			type: 'boolean',
			default: false
		},
		title: {
			type: 'string',
			default: ''
		},
		type: {
			type: 'string',
			default: 'Petition'
		},
		link: {
			type: 'string',
			default: 'https://actionnetwork.org'
		},
		description: {
			type: 'string',
			default: ''
		}
	},
	edit: props => {
		let {attributes: {markAsMostValuable, title, type, link, description}, setAttributes} = props;

		const setDefaultTitleAndDescription = (form, type) => {
			title = actionTypes[type].defaultTitle;
			form.title.value = title;
			description = actionTypes[type].defaultDescription;
			form.description.value = description;
			setAttributes({title, description});
		};

		const setType = event => {
			type = event.target.querySelector('option:checked').value;

			setDefaultTitleAndDescription(
				event.target.form,
				event.target.form.type.querySelector('option:checked').value
			);

			setAttributes({type});
			event.preventDefault();
		};

		const setMarkAsMostValuable = event => {
			markAsMostValuable = event.target.checked;
			setAttributes({markAsMostValuable});
		};

		const setTitle = event => {
			setAttributes({title: event.target.value});
			event.preventDefault();
		};

		const setLink = event => {
			setAttributes({link: event.target.value});
			event.preventDefault();
		};

		const setDescription = event => {
			setAttributes({description: event.target.value});
			event.preventDefault();
		};

		if (!title) {
			title = actionTypes[type].defaultTitle;
			setAttributes({title});
		}

		if (!description) {
			description = actionTypes[type].defaultDescription;
			setAttributes({description});
		}

		return !actionTypes[type]? <span>Invalid type : {type}</span> : <form className={"wp-block-klarity-klarity-action-block-form"}>
			<label>
				<input type="checkbox" defaultChecked={markAsMostValuable} value={markAsMostValuable} onChange={setMarkAsMostValuable}/> Mark as most valuable
			</label>
			<label>Action type:
				<select id="type" value={type} onChange={setType}>
					{Object.keys(actionTypes).map((actionTypeId) => (
						<option value={actionTypeId} selected>{actionTypes[actionTypeId].defaultTitle}</option>
					))}
				</select>
			</label>
			<label>Action link:
				<input id="link" type="text" value={link} onChange={setLink}/>
			</label>
			<div className={"editor " + props.className}>
				<div className="content">
					<div className="thumbnail" style={{backgroundImage: 'url("' + actionTypes[type].thumbnail + '")'}}>
					</div>
					<div className="text">
						<input id="title" type="text" className="h2" value={title} onChange={setTitle} />

						<textarea id="description" className="p" onChange={setDescription}>
							{description}
						</textarea>
					</div>
					{markAsMostValuable && <div className="most-valuable-banner">Most valuable action</div>}
				</div>
			</div>
		</form>;
	},

	save: props => {
		return null;
	},
});
