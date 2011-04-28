<?php
	function formatWhois(
		$result,
		$contacts = array
		(
			"owner" => "Власник",
			"admin" => "Адміністратор",
			"tech" => "Технічна підтримка"
		),
		$months = array
		(
			"01" => "січня",
			"02" => "лютого",
			"03" => "березня",
			"04" => "квітня",
			"05" => "трявня",
			"06" => "червня",
			"07" => "липня",
			"08" => "серпня",
			"09" => "вересня",
			"10" => "жовтня",
			"11" => "листопада",
			"12" => "грудня",

		))
	{
		$out="\n<ul>\n";
		if($result["regrinfo"]["domain"]["desc"])
			if(!is_array($result["regrinfo"]["domain"]["desc"]))
				$out.="<li><span class=\"header\">Опис: </span>".$result["regrinfo"]["domain"]["desc"]."</li>\n";
			else
			{
				$out.="<li><span class=\"header\">Опис:</span>\n<ul>\n";
				foreach ($result["regrinfo"]["domain"]["desc"] as $value)
				{
					$out.="<li>".$value."</li>\n";
				}
				$out.="</ul>\n</li>\n";
			}
		if($result["regrinfo"]["domain"]["status"])
		{
			if(!is_array($result["regrinfo"]["domain"]["status"]))
				{
					$out.="<li><span class=\"header\">Статус: </span>".$result["regrinfo"]["domain"]["status"]."</li>\n";
				}
			else
			{
				$out.="<li><span class=\"header\">Статус:</span>\n<ul>\n";
				foreach ($result["regrinfo"]["domain"]["status"] as $value)
				{
					$out.="<li>".$value."</li>\n";
				}
				$out.="</ul>\n</li>\n";
			}
		}	
		if($result["regrinfo"]["domain"]["expires"])
			$out.="<li><span class=\"header\">Дійсний до: </span>".substr($result["regrinfo"]["domain"]["expires"], 8, 2)." ".$months[substr($result["regrinfo"]["domain"]["expires"], 5, 2)]." ".substr($result["regrinfo"]["domain"]["expires"], 0, 4)."</li>\n";

		//--------------------------------------------------------------------------
		//Assemling conracts
		foreach ($contacts as $key => $value)
		if($result["regrinfo"][$key])
		{
			$out.="<li><span class=\"header\">".$value.":</span>\n<ul>\n";
			if($result["regrinfo"][$key]["organization"])
			{
				if(!is_array($result["regrinfo"][$key]["organization"]))
				{
					$out.="<li><span class=\"header\">Організація: </span>".$result["regrinfo"][$key]["organization"]."</li>\n";
				}
				else
				{
					$out.="<li><span class=\"header\">Організація:</span>\n<ul>\n";
					foreach ($result["regrinfo"][$key]["organization"] as $organization)
					{
						$out.="<li>".$organization."</li>\n";
					}
					$out.="</ul>\n</li>\n";
				}
			}
			if($result["regrinfo"][$key]["address"])
			{	
				$out.="<li><span class=\"header\">Адреса:</span>\n<ul>\n";
				foreach ($result["regrinfo"][$key]["address"] as $address)
				{
					$out.="<li>".$address."</li>\n";
				}
				$out.="</ul>\n</li>\n";
			}
			if($result["regrinfo"][$key]["phone"])
			{
				if(!is_array($result["regrinfo"][$key]["phone"]))
				{
					$out.="<li><span class=\"header\">Телефон: </span>".$result["regrinfo"][$key]["phone"]."</li>\n";
				}
				else
				{
					$out.="<li><span class=\"header\">Телефони:</span>\n<ul>\n";
					foreach ($result["regrinfo"][$key]["phone"] as $phone)
					{
						$out.="<li>".$phone."</li>\n";
					}
					$out.="</ul>\n</li>\n";
				}
			}
			if($result["regrinfo"][$key]["fax"])
			{
				if(!is_array($result["regrinfo"][$key]["fax"]))
					{
						$out.="<li><span class=\"header\">Факс: </span>".$result["regrinfo"][$key]["fax"]."</li>\n";
					}
				else
				{
					$out.="<li><span class=\"header\">Факс:</span>\n<ul>\n";
					foreach ($result["regrinfo"][$key]["fax"] as $fax)
					{
						$out.="<li>".$fax."</li>\n";
					}
					$out.="</ul>\n</li>\n";
				}
			}
			if($result["regrinfo"][$key]["email"])
			{
				if(!is_array($result["regrinfo"][$key]["email"]))
				{
					$out.="<li><span class=\"header\">Електронна пошта: </span>".$result["regrinfo"][$key]["email"]."</li>\n";
				}
				else
				{
					$out.="<li><span class=\"header\">Електронна пошта:</span>\n<ul>\n";
					foreach ($result["regrinfo"][$key]["email"] as $email)
					{
						$out.="<li>".$email."</li>\n";
					}
					$out.="</ul>\n</li>\n";
				}
			}
			$out.="</ul>\n</li>\n";
		}
		//--------------------------------------------------------------------------
		
		if($result["regrinfo"]["domain"]["nserver"])
		{
			$out.="<li><span class=\"header\">Сервери імен:</span>\n<ul>\n";
				foreach ($result["regrinfo"]["domain"]["nserver"] as $key => $value)
				{
					$out.="<li>".$key."</li>\n";
				}
			$out.="</ul>\n</li>\n";
		}
		$out.="</ul>\n";
		return $out;
	}
?>
