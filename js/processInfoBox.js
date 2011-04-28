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
	if(domain)
	{
		var time=new Date().getTime();
		$.ajax(
		{
			beforeSend: function()
			{
				$("#"+nameserver+" .data").children().hide();
				$("#"+nameserver+" .progress_bar").show();
				$("#"+nameserver).removeClass("yes no").addClass("unknown");
				jaxRequest[nameserver]=time;
			},
			url: "php/nslookup/uarnet.check.php",
			data: "domain="+domain+toDomain(nameserver),
			success: function(data)
			{
				if(jaxRequest[nameserver]==time)
				{
					$("#"+nameserver+" .data").children().hide();
					if(data=="yes")
					{
						$("#"+nameserver+" .main_info").html("Домен зайнятий.").show();
						$("#"+nameserver+" .site_link").attr("value","http://"+domain+toDomain(nameserver)).show();
						$("#"+nameserver+" .short_whois").attr("value",domain+toDomain(nameserver)).show();
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
							$("#"+nameserver+" .description").html("Зараз важко точно визначити стан домену.").show();
							$("#"+nameserver+" .short_whois").attr("value",domain+toDomain(nameserver)).show();
							$("#"+nameserver).removeClass("yes no").addClass("unknown");
						}	
					}
				}
			}
		});
	}
	else
	{
		$("#"+nameserver+" .data").children().hide();
		$("#"+nameserver+" .description").html("Введіть домен для пошуку.").show();
		$("#"+nameserver).removeClass("yes no").addClass("unknown");
	}
}

function pre_processInfoBox_org(domain)
{
	$("#_org .title").html(domain);
	$("#_org .title").truncate(
	{
		width: 226,
		after: '&amp;hellip;',
		center: true,
		addclass: false,
		addtitle: false
	});
	$("#_org .data").children().hide();
	if(domain!=".org")
	{
		if(domain==orgData["domain"])
			coreprocessing_InfoBox_org(domain);
		else
		{
			$("#_org .refresh").val(domain);
			$("#_org .description").html("Для обробки запиту натисніть: <span class=\"refresh\"></span><br />Ознайомтесь детальніше натиснувши: <span class=\"info\"></span>").show();
			$("#_org").removeClass("yes no").addClass("unknown");
			if(orgData["counter"]==0)
			{
				$(".info_box_org>.refresh").css("background-position", "0px 0px");
				$(".info_box_org>.refresh").css("cursor","pointer");
			}
		}
	}
	else
	{
		$("#_org .refresh").val(".org");
		$("#_org .description").html("Введіть домен для пошуку.<br />Ознайомтесь детальніше натиснувши: <span class=\"info\"></span>").show();
		$("#_org").removeClass("yes no").addClass("unknown");
		if(orgData["counter"]==0)
		{
			$(".info_box_org>.refresh").css("background-position", "17px 0px");
			$(".info_box_org>.refresh").css("cursor","default");
		}
	}	
}

function processInfoBox_org(domain)
{
	$.ajax(
	{
		beforeSend: function()
		{
			$("#_org .data").children().hide();
			$("#_org .progress_bar").show();
			$("#_org").removeClass("yes no").addClass("unknown");
			orgData["domain"]=domain;
		},
		url: "php/nslookup/uarnet.org.whois.php",
		data: "domain="+domain,
		dataType: "xml",
		success: function(data)
		{
			orgData["registered"] = $.trim($(data).find("registered").text());
			orgData["short"]= $(data).find("short").text();
			orgData["full"]= $(data).find("full").text();
			$("#_org .data").children().hide();
			coreprocessing_InfoBox_org(domain);
		}
	});
}

function coreprocessing_InfoBox_org(domain)
{
	if(orgData["registered"]=="yes")
	{
		$("#_org .main_info").html("Домен зайнятий.").show();
		$("#_org .site_link").attr("value","http://"+domain).show();
		$("#_org .short_whois").attr("value",domain).show();
		$("#_org").removeClass("unknown no").addClass("yes");
		if(orgData["counter"]==0)
		{
			$(".info_box_org>.refresh").css("background-position", "17px 0px");
			$(".info_box_org>.refresh").css("cursor","default");
		}
	}
	else
	{ 
		if(orgData["registered"]=="no")
		{
			$("#_org .main_info").html("Домен вільний!").show();
			$("#_org .description").html("Завітайте до нас в офіс, щоб його зареєструвати.").show();
			$("#_org").removeClass("unknown yes").addClass("no");
			if(orgData["counter"]==0)
			{
				$(".info_box_org>.refresh").css("background-position", "17px 0px");
				$(".info_box_org>.refresh").css("cursor","default");
			}
		}
		else
		{
			$("#_org .description").html("Зараз важко точно визначити стан домену.").show();
			$("#_org .short_whois").attr("value",domain).show();
			$("#_org").removeClass("yes no").addClass("unknown");
			if(orgData["counter"]==0)
			{
				$(".info_box_org>.refresh").css("background-position", "0px 0px");
				$(".info_box_org>.refresh").css("cursor","pointer");
			}
		}	
	}
}