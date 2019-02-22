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
		thumbnail: "/wp-content/plugins/klarity-action-block/assets/petition.png",
		backgroundColor: '#D8DBE8',
		defaultTitle: "Sign a petition",
		defaultDescription: 'Your signature is important. It signals to the institution in charge that you will not tolerate their corrupt ways.\nWe need to collect 50000 signatures. Add yours now!'
	},
	Email: {
		thumbnail: "/wp-content/plugins/klarity-action-block/assets/email.png",
		backgroundColor: '#D8E5E8',
		defaultTitle: "Send an e-mail",
		defaultDescription: 'Use our template to send an email to the people in charge of this corrupt institution.\nEmail campaigns are great for putting pressure on.'
	},
	Call: {
		thumbnail: "/wp-content/plugins/klarity-action-block/assets/call.png",
		backgroundColor: '#D8F5F8',
		defaultTitle: "Make a call",
		defaultDescription: 'Make your voice heard and call the institutions involved and requesting to speak to the people in charge.\nFeel free to use our talking points.'
	}
};

registerBlockType('klarity/klarity-action-block', {
	title: __('Action block'),
	// Only allow in a registered parent-block
	parent: [ 'klarity/klarity-action-list-block' ],
	category: 'layout',
	icon: iconEl,

	attributes: {
		isCompleted: {
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
		let {attributes: {isCompleted, title, type, link, description}, setAttributes} = props;

		const setDefaultTitleAndDescription = (form, type) => {
			title = actionTypes[type].defaultTitle;
			form.title.value = title;
			description = actionTypes[type].defaultDescription;
			form.description.value = description;
			setAttributes({title, description});
		};

		const setType = event => {
			type = event.target.querySelector('option:checked').value;

			if (!isCompleted) {
				setDefaultTitleAndDescription(
					event.target.form,
					event.target.form.type.querySelector('option:checked').value
				)
			}
			setAttributes({type});
			event.preventDefault();
		};

		const setIsCompleted = event => {
			isCompleted = event.target.checked;
			if (!isCompleted) {
				setDefaultTitleAndDescription(
					event.target.form,
					type
				)
			}
			setAttributes({isCompleted});
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

		return !actionTypes[type]? <span>Invalid type : {type}</span> : <form id="action_edit">
			<div className="form-group">
				<label>
					<input id="isCompleted" type="checkbox" defaultChecked={isCompleted} value={isCompleted} onChange={setIsCompleted}/> Completed</label>
			</div>
			<div className="form-group">
				<label>Action type:
					<select id="type" value={type} onChange={setType}>
						{Object.keys(actionTypes).map((actionTypeId) => (
							<option value={actionTypeId} selected>{actionTypes[actionTypeId].defaultTitle}</option>
						))}
					</select>
				</label>
			</div>
			<div className="form-group">
				<label>Action link:
					<input id="link" type="text" value={link} onChange={setLink}/>
				</label>
			</div>
			<div className={"editor " + (isCompleted ? "completed " : "") + props.className}>
				<div className="content">
					<div className="thumbnail" style={{backgroundColor: actionTypes[type].backgroundColor, backgroundImage: 'url("' + actionTypes[type].thumbnail + '")'}}>
					</div>
					<div className="text">
						<div className="form-group">
							<input id="title" type="text" className="h2" value={title} onChange={setTitle} />
						</div>

						<div className="form-group">
							<textarea id="description" className="p" onChange={setDescription}>
								{description}
							</textarea>
						</div>
					</div>
				</div>
			</div>
		</form>;
	},

	save: props => {
		const {attributes: {isCompleted, type, title, link, description}} = props;

		return !actionTypes[type]
			? <span>Invalid type : {type}</span>
			: <a
				href={isCompleted ? "javascript:void(0)" : link}
				target={isCompleted ? "_self" : "_blank"}
				className={(isCompleted ? "completed " : "") + "col s12"}>
			<div className="content">
				<div className="thumbnail" style={{backgroundColor: actionTypes[type].backgroundColor, backgroundImage: 'url("' + actionTypes[type].thumbnail + '")'}}>
				</div>
				<div className="text">
					<h2>{title}</h2>
					{description.split('\n').map(descriptionLine => (
						<p>{descriptionLine}</p>
					))}
				</div>
			</div>
		</a>;
	},
});
