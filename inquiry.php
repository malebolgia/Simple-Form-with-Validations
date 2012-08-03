<?php
  //The Posts
  $fullname = make_safe($_POST['fullname']);
  $email = make_safe($_POST['email']);
  $gender = make_safe($_POST['gender']);
  $phone = make_safe($_POST['phone']);
  $inquiry = make_safe($_POST['inquiry']);
  
  //Simple escape string for mysql insertion
  function make_safe($variable) {
	$variable= strip_tags($variable); 
	$variable = mysql_real_escape_string(trim($variable));
        return $variable;				
  }
  
echo json_encode(array('fullname' => $fullname,
						'email'   => $email,
						'gender'  => $gender,
						'phone'   => $phone,
						'inquiry' => $inquiry)); 
