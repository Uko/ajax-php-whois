<?php
	$domains=array(".com",".net",".org",".biz",".info",".ua",".com.ua",".lviv.ua");
	include_once("php/idDomain.php");
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="uk">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<!--<link rel="stylesheet" type="text/css" href="css/thickBox.css" />-->
		<link rel="stylesheet" type="text/css" href="css/whois.css" />
		<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.11.custom.css" />
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.8.11.custom.min.js"></script>
		<script type="text/javascript" src="js/truncate.js"></script>
		<!--<script type="text/javascript" src="js/thickDox.js"></script>-->
		<script type="text/javascript" src="js/main.js"></script> 
		<script type="text/javascript" src="js/idDomain.js"></script>
		<script type="text/javascript" src="js/processInfoBox.js"></script>
		<script type="text/javascript" src="js/whois.js"></script>                 
		<title>Ns lookup</title>
	</head>
	<body>
		<div id="dialog" title="Whois"></div>
		<form action="#">
			<div>
			<input type="text" id="mainfield" />
			<?php
				foreach ($domains as $i)
  				{
  					echo "<input type=\"checkbox\" value=\"".toId($i)."\" />".$i;
  				}
			?>
			<a id="check_all" href="#">[Відмітити всі]</a><a id="uncheck_all" href="#">[Зняти виділення всі]</a>
			</div>
		</form>
		<div id="results">
		<?php
				foreach ($domains as $i)
  				{
  					echo "<div id=\"".toId($i)."\" class=\"info_box\">
  						<h3 class=\"title\">".$i."</h3>
  						<div class=\"data\">
  							<p class=\"main_info\"></p>
  							<a class=\"site_link\"></a>
  							<a class=\"whois\"></a>
  							<p class=\"description\"></p>
  							<img src=\"#\" alt=\"…\" class=\"progress_bar\" />
  						</div>
  					</div>";
  				}
		?>
		</div>
	</body>
</html>