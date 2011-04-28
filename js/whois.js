function short_whois(domain)
{
	$.ajax(
 	{
		beforeSend: function()
		{
			$("#dialog").dialog("option", "title", "Whois "+domain);
			$("#dialog").html("<img src="+progressBar.src+" alt\"…\" class=\"progress_bar\" />").dialog("open");
		},
		url: "php/nslookup/uarnet.short.whois.php",
		data: "domain="+domain,
 		success: function(data)
 		{
 			$("#dialog").html(data+"<button class=\"nobutton\" onClick=\"full_whois('"+domain+"')\">Повний whois</button>");
  		}
  	});
}

function short_whois_org(domain)
{
	$("#dialog").dialog("option", "title", "Whois "+domain);
	$("#dialog").html("").dialog("open");
	$("#dialog").html(orgData["short"]+"<button class=\"nobutton\" onClick=\"document.getElementById('dialog').innerHTML=orgData['full']\">Повний whois</button>");
}

function full_whois(domain)
{
	
	$.ajax(
 	{
		beforeSend: function()
		{
			$("#dialog").html("<img src="+progressBar.src+" alt\"…\" class=\"progress_bar\" />");
		},
		url: "php/nslookup/uarnet.full.whois.php",
		data: "domain="+domain,
 		success: function(data)
 		{
 			$("#dialog").html(data);
  		}
  	});
}

