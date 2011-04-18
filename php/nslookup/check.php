<?php 
	include_once('whois.main.php');
	$whois = new Whois();
	$allowproxy = false;
	$whois->deep_whois = false;
	$result=$whois->Lookup($_REQUEST["domain"]);
	echo $result["regrinfo"]["registered"];
?>