<?php echo"<?xml version=\"1.0\" encoding=\"UTF-8\"?>" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Ns lookup</title>
	</head>
	<body>
		<form action="" method="post">
			<input type="text" name="domain" />
			<input type="checkbox" checked="checked" name="ns[]" value=".net" />.net
			<input type="checkbox" checked="checked" name="ns[]" value=".com" />.com
			<input type="checkbox" checked="checked" name="ns[]" value=".org" />.org
			<input type="submit" value="Давай!" />
		</form>
		<?php 
			include_once('whois.main.php');
			include_once('whois.utils.php');
			$whois = new Whois();
			if($_REQUEST["domain"])
			{
				$whois->deep_whois = false;
				foreach ($_REQUEST["ns"] as $i)
  				{
  					$result[$i]=$whois->Lookup(trim($_REQUEST["domain"]).$i);
  					if($result[$i]["regrinfo"]["registered"]=="no")
  					{
  						echo $_REQUEST["domain"].$i." is free!<br />";
  					}
  					elseif($result[$i]["regrinfo"]["registered"]=="yes")
  					{
  						echo $_REQUEST["domain"].$i." in use. <a href=\"?more=".$_REQUEST["domain"].$i."\">More info</a>. Go to <a href=\"http://".$_REQUEST["domain"].$i."\">".$_REQUEST["domain"].$i."</a><br />";
  					}
  				}
			}
			elseif($_REQUEST["more"])
			{
				$whois->deep_whois = true;
				$result=$whois->Lookup($_REQUEST["more"]);
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
			}
		?>
	</body>
</html>
