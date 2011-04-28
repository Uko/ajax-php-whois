<?php
	include_once('whois.main.php');
	include_once('whois.utils.php');
	$whois = new Whois();
	$whois->deep_whois = true;
	$result=$whois->Lookup($_REQUEST["domain"]);
	if (!empty($result['rawdata']))
	{
		$utils = new utils;
		$winfo = $utils->showHTML($result);
	}
	else
	{
		if (isset($whois->Query['errstr']))
			$winfo = implode($whois->Query['errstr'],"\n<br></br>");
		else
			$winfo = 'Unexpected error';
	}
	echo  $winfo;	
?>