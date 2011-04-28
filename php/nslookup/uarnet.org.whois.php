<?php
	include_once('whois.main.php');
	include_once('whois.utils.php');
	include_once('uarnet.formater.php');
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
	echo  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<whois>\n<registered>".$result["regrinfo"]["registered"]."</registered>\n<short><![CDATA[".formatWhois($result)."]]></short>\n<full><![CDATA[".$winfo."]]></full>\n</whois>";
?>