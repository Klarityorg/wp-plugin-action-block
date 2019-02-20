<?php
/**
 * Plugin Name: Klarity action block
 * Plugin URI: https://github.com/Klarityorg/wp-plugin-action-block
 * Description: Klarity action block
 * Author: Klarity
 * Author URI: https://github.com/Klarityorg
 * Version: 1.0.0
 * License: Closed source
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
