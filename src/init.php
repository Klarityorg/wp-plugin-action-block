<?php

if (!defined('ABSPATH')) {
    exit;
}

function klarity_action_block_assets() {
    wp_enqueue_style(
        'klarity_action_block-cgb-style-css',
        plugins_url('dist/blocks.style.build.css', __DIR__),
        ['wp-editor'],
        filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
    );
}

add_action('enqueue_block_assets', 'klarity_action_block_assets');

function klarity_action_block_editor_assets() {
    wp_enqueue_script(
        'klarity_action_block-js',
        plugins_url('/dist/blocks.build.js', __DIR__),
        ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'],
        filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' )
    );

    wp_enqueue_style(
        'klarity_action_block-editor-css', // Handle.
        plugins_url('dist/blocks.editor.build.css', __DIR__),
        ['wp-edit-blocks'],
        filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
    );
}

add_action('enqueue_block_editor_assets', 'klarity_action_block_editor_assets');
