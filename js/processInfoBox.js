function processInfoBox(domain,nameserver)
{
	$("#"+nameserver+" .title").html(domain+toDomain(nameserver));
	$("#"+nameserver+" .title").truncate(
	{
		width: 255,
		after: '&amp;hellip;',
		center: true,
		addclass: false,
		addtitle: false
	});
 	$.ajax(
 	{
		beforeSend: function()
		{
			$("#"+nameserver+" .data").children().hide();
			$("#"+nameserver+" .progress_bar").show();
			$("#"+nameserver).removeClass("yes no").addClass("unknown");
		},
		url: "php/nslookup/check.php",
		data: "domain="+domain+toDomain(nameserver),
 		success: function(data)
 		{
 			$("#"+nameserver+" .data").children().hide();
 			if(data=="yes")
 			{
 				$("#"+nameserver+" .main_info").html("Домен зайнятий.").show();
 				$("#"+nameserver+" .site_link").html("Перейти на сайт по цій адресі").attr("href","http://"+domain+toDomain(nameserver)).show();
 				$("#"+nameserver+" .whois").html("Whois інформація").attr("href",domain+toDomain(nameserver)).show();
  				$("#"+nameserver).removeClass("unknown no").addClass("yes");
 			}
 			else
 			{ 
 				if(data=="no")
 				{
 					$("#"+nameserver+" .main_info").html("Домен вільний!").show();
 					$("#"+nameserver+" .description").html("Завітайте до нас в офіс, щоб його зареєструвати.").show();
   					$("#"+nameserver).removeClass("unknown yes").addClass("no");
 				}
 				else
 				{
 					$("#"+nameserver+" .main_info").html("Хто зна....").show();
 					$("#"+nameserver+" .whois").html("Whois інформація").attr("href",domain+toDomain(nameserver)).show();
 					$("#"+nameserver).removeClass("yes no").addClass("unknown");
 				}	
  			}
  		}
  	});			
}