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

function render_klarity_action_block($attributes) {
  $markAsMostValuable = $attributes['markAsMostValuable'] ?? '';
  $type = $attributes['type'] ?? '';
  $link = $attributes['link'] ?? '';
  $title = $attributes['title'] ?? '';
  $description = $attributes['description'] ?? '';

  $mostValuableBlock = $markAsMostValuable
    ? '<div class="most-valuable-banner">Most valuable action</div>'
    : '';

  $actionTypes = [
    'Petition' => [
      'thumbnail' => plugin_dir_url(__DIR__) . '/images/petition.png'
    ],
    'Email' => [
      'thumbnail' => plugin_dir_url(__DIR__) . '/images/email.png'
    ]
  ];
  return !isset($actionTypes[$type])
    ? "<span>Invalid type : {$type}</span>"
    : "<a
				href='$link'
				target='_blank'
				class='wp-block-klarity-klarity-action-block col s12'>
			<div class='content'>
				<div class='thumbnail' style='background-image: url(" . $actionTypes[$type]['thumbnail'] . ")'></div>
				<div class='text'>
					<h2>$title</h2>".
          implode('', array_map(function ($descriptionLine) {
					  return "<p>$descriptionLine</p>";
					}, explode("\n", $description))). "
        </div>
        $mostValuableBlock
			</div>
		</a>";
}

function render_klarity_action_block_callback() {
  if (function_exists('register_block_type')) {
    register_block_type('klarity/klarity-action-block', [
      'render_callback' => 'render_klarity_action_block',
      'attributes' => [
        'markAsMostValuable' => [
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

add_action('plugins_loaded', 'render_klarity_action_block_callback');

function render_klarity_social_action_block() {
  return "<div class='wp-block-klarity-klarity-social-action-block'>
    <a href='http://www.facebook.com/sharer.php?u=".get_permalink()."&t=".get_the_title()."' class='col s12' target='_blank'>
      <div class='facebook'>
        <img src='".plugin_dir_url( __DIR__ )."images/facebook.svg' />
        <p>SHARE THIS ON FACEBOOK</p>
      </div>
    </a>
    <a href='https://twitter.com/intent/tweet?text=".get_the_title()."&url=".get_permalink()."' class='col s12' target='_blank'>
      <div class='twitter'>
        <img src='".plugin_dir_url( __DIR__ )."images/twitter.svg' />
        <p>SHARE THIS ON TWITTER</p>
      </div>
    </a>
    <a href='https://wa.me/whatsappphonenumber/?text=".get_the_title()." - ".get_permalink()."' class='col s12' target='_blank'>
      <div class='whatsapp'>
        <img src='".plugin_dir_url( __DIR__ )."images/whatsapp.svg' />
        <p>SHARE THIS VIA WHATSAPP</p>
      </div>
    </a>
  </div>";
}

function render_klarity_social_action_block_callback() {
  if (function_exists('register_block_type')) {
    register_block_type('klarity/klarity-social-action-block', [
      'render_callback' => 'render_klarity_social_action_block',
    ]);
  }
}

add_action('plugins_loaded', 'render_klarity_social_action_block_callback');
