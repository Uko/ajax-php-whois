function short_whois(domain)
{
	$.ajax(
 	{
		beforeSend: function()
		{
			$("#dialog").dialog("option", "title", "Whois "+domain);
			$("#dialog").html("<img src="+progressBar.src+" alt\"…\" class=\"progress_bar\" />").dialog("open");
		},
		url: "php/nslookup/short.whois.php",
		data: "domain="+domain,
 		success: function(data)
 		{
 			$("#dialog").html(data+"<a class=\"full_whois\" href=\""+domain+"\" onClick=\"full_whois('"+domain+"');return false\">Повний whois</a>");
  		}
  	});
}

function full_whois(domain)
{
	
	$.ajax(
 	{
		beforeSend: function()
		{
			$("#dialog").html("<img src="+progressBar.src+" alt\"…\" class=\"progress_bar\" />");
		},
		url: "php/nslookup/full.whois.php",
		data: "domain="+domain,
 		success: function(data)
 		{
 			$("#dialog").html(data);
  		}
  	});
}