function whois(domain)
{
	$.ajax(
 	{
		beforeSend: function()
		{
			$("#dialog").dialog("option", "title", "Whois "+domain);
			$("#dialog").html("<img src="+progressBar.src+" alt\"…\" class=\"progress_bar\" />").dialog("open");
		},
		url: "php/nslookup/whois.php",
		data: "domain="+domain,
 		success: function(data)
 		{
 			$("#dialog").html(data);
  		}
  	});
}