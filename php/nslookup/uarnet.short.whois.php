<?php
	include_once('whois.main.php');
	include_once('uarnet.formater.php');
	$whois = new Whois();
	$result=$whois->Lookup($_REQUEST["domain"]);
	echo formatWhois($result);
?>