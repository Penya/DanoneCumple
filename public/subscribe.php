<?php
if ( isset( $_POST['subscribe_submit'] ) ) {
	// Initialize error array
	$subscribe_errors = array();

	// Check email input field
	if ( trim( $_POST['subscribe_email'] ) === '' )
		$subscribe_errors[] = 'Email address is required';
	elseif ( !preg_match( "/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,4}$/i", trim( $_POST['subscribe_email'] ) ) )
		$subscribe_errors[] = 'Email address is not valid'; 
	else
		$subscribe_email = trim( $_POST['subscribe_email'] );
	
	// Send email if no input errors
	if ( empty( $subscribe_errors ) ) {
		$email_to = "example@example.com"; // Change to your own email address
		$subject = "Subscription";
		$body = "Subscriber details: " . $subscribe_email . "\r\n";
		$headers = "Subscription <" . $email_to . ">\r\nReply-To: " . $subscribe_email . "\r\n";
		mail( $email_to, $subject, $body, $headers );
		echo 'Thank you for subscribing!';
	} else {
		echo 'Please go back and correct the following errors:<br />';
		foreach ( $subscribe_errors as $error ) {
			echo $error . '<br />';
		}
	}
}
?>