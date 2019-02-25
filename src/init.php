<?php
if (!defined('ABSPATH')) {
  exit;
}
function klarity_action_block_assets() {
  wp_enqueue_style(
    'klarity_action_block-cgb-style-css',
    plugins_url('dist/blocks.style.build.css', __DIR__),
    ['wp-editor'],
    filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css')
  );
}

add_action('enqueue_block_assets', 'klarity_action_block_assets');
function klarity_action_block_editor_assets() {
  wp_enqueue_script(
    'klarity_action_block-js',
    plugins_url('/dist/blocks.build.js', __DIR__),
    ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
    filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.build.js')
  );
  wp_enqueue_style(
    'klarity_action_block-editor-css', // Handle.
    plugins_url('dist/blocks.editor.build.css', __DIR__),
    ['wp-edit-blocks'],
    filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.editor.build.css')
  );
}

add_action('enqueue_block_editor_assets', 'klarity_action_block_editor_assets');

function render_action_block($attributes) {
  ['type' => $type, 'isCompleted' => $isCompleted, 'link' => $link, 'title' => $title, 'description' => $description] = $attributes;

  $actionTypes = [
    'Petition' => [
      'thumbnail' => plugin_dir_url(__DIR__) . '/assets/petition.png',
      'backgroundColor' => '#D8DBE8'
    ],
    'Email' => [
      'thumbnail' => plugin_dir_url(__DIR__) . '/assets/email.png',
      'backgroundColor' => '#D8E5E8'
    ],
    'Call' => [
      'thumbnail' => plugin_dir_url(__DIR__) . '/assets/call.png',
      'backgroundColor' => '#D8F5F8'
    ]
  ];
  return !isset($actionTypes[$type])
    ? "<span>Invalid type : {$type}</span>"
    : "<a
				href='" . ($isCompleted ? 'javascript:void(0)' : $link) . "'
				target='" . ($isCompleted ? '_self' : '_blank') . "'
				class='wp-block-klarity-klarity-action-block " . ($isCompleted ? 'completed ' : '') . " col s12'>
			<div class='content'>
				<div class='thumbnail' style='background-color: " . $actionTypes[$type]['backgroundColor'] . "; background-image: url(" . $actionTypes[$type]['thumbnail'] . ")'></div>
				<div class='text'>
					<h2>$title</h2>
					" . implode('', array_map(function ($descriptionLine) {
					  return "<p>$descriptionLine</p>";
					}, explode("\n", $description)))
    . "</div>
			</div>
		</a>";
}

function register_action_block_callback() {
  if (function_exists('register_block_type')) {
    register_block_type('klarity/klarity-action-block', [
      'render_callback' => 'render_action_block',
      'attributes' => [
        'isCompleted' => [
          'type' => 'boolean',
          'default' => false
        ],
        'title' => [
          'type' => 'string',
          'default' => ''
        ],
        'type' => [
          'type' => 'string',
          'default' => 'Petition'
        ],
        'link' => [
          'type' => 'string',
          'default' => 'https://actionnetwork.org'
        ],
        'description' => [
          'type' => 'string',
          'default' => ''
        ],
      ]
    ]);
  }
}

add_action('plugins_loaded', 'register_action_block_callback');
