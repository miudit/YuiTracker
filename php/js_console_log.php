function js_console_log( $array, $label = "", $trace = false, $trace_options = array() ) {
	if ( !is_array( $array ) ) {
		$array = array( $array );
	}

	if ( !empty( $label ) ) {
		$array = array(
			$label => $array,
		);
	}
	$array['__info']['message'] = 'output by js_console_log function';

	if ( $trace ) {

		if ( !isset( $trace_options[0] ) ) {
			$trace_options[0] = DEBUG_BACKTRACE_PROVIDE_OBJECT;
		}
		if ( !isset( $trace_options[1] ) ) {
			$trace_options[1] = 0;
		}
		$array['__info']['trace'] = PHP_VERSION_ID < 50400 ? debug_backtrace($trace_options[0]) : debug_backtrace($trace_options[0], $trace_options[1]);
	}

	$json = json_encode( $array );
	echo '<script type="text/javascript">';
	// IE対策
	echo "if (!('console' in window)) {";
	echo "    window.console = {};";
	echo "    window.console.log = function(str){   return str; };";
	echo "}";
	echo "console.log({$json})";
	echo '</script>';
}
