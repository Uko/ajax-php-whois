var orgData= new Array; //object used to store data needed for .org processing
orgData["counter"]=0; //a counter used to alow user to submit whois query only once per 15sec
orgData["domain"]="";
orgData["registered"]="";
orgData["short"]="";
orgData["full"]="";
var jaxRequest = new Array();
var countdown;
$(document).ready(function()
{
  	var previousText=""; //var that contains a pre-keyup value of #mainfield(domain name) to process data only when the value changes
  	progressBar = new Image();
  	progressBar.src = "techImages/loadingAnimation.gif"; // loading progress bar image
	//------------------
	//Pre-processing html for .org specific
	$("#ch_org").removeClass("zone_toogle").addClass("zone_toogle_org");
	$("#_org").removeClass("info_box").addClass("info_box_org");
	$(".info_box_org .title").after("<button class=\"info\"></button>").after("<button class=\"refresh\"></button>");
	$(".info_box_org").hide();
	$(".info_box_org").addClass("unknown");
	$("#org_policy").dialog({modal: true, resizable: false, autoOpen: false});
	$(".info_box_org>.info").click(function(){
		$("#org_policy").dialog("open");
	})
	$("#ch_org").click(function()
	{
  		if ($(this).is(":checked"))
  		{
			$("#input_block").show("fast");
  			$("#_org").show("fast");
			pre_processInfoBox_org($("#mainfield").val()+".org");
  		}
  		else
  		{
  			$("#_org").hide("fast");
			if($(".zone_toogle:checked").length==0)
				$("#input_block").hide("fast");
  		}
	});
	$(".info_box_org>.refresh").mousedown(function(){
		if($(this).val()!=".org"&&(orgData["counter"]==0&&((orgData["registered"]!="no"&&orgData["registered"]!="yes")||$("#mainfield").val()+".org"!=orgData["domain"])))
			$(".info_box_org>.refresh").css("background-position", "17px 0px")
	});
	$(".info_box_org>.refresh").click(function(){
		if($(this).val()!=".org"&&(orgData["counter"]==0&&((orgData["registered"]!="no"&&orgData["registered"]!="yes")||$("#mainfield").val()+".org"!=orgData["domain"])))
		{
			orgData["counter"]=15;
			$(".info_box_org>.refresh").css("cursor","default");
			countdown=setInterval(tick, 1000);
			processInfoBox_org($(this).val());
		}
	});
	$(".info_box_org .short_whois").click(function(){
  		short_whois_org($(this).val());
  		return false;
  	});
	//------------------
  	$(".progress_bar").attr("src",progressBar.src);
  	$("#dialog").dialog({modal: true,draggable: false, resizable: false, autoOpen: false, height: 400, width: 600});
	$("#domains").buttonset();
	$("#mass_tooglers").buttonset();
	$("#input_block").hide();
  	$(".info_box").hide();
  	$(".info_box").addClass("unknown");
	$(".info_box").each(function(){jaxRequest[$(this).attr("id")]=0;});
  	$("form").submit(function() {return false});
	$("#mainfield").keypress(function AlphaNumericOnly(e)
	{
	   // copyright 1999 Idocs, Inc. http://www.idocs.com
	   var key = [e.keyCode||e.which];
	   var keychar = String.fromCharCode([e.keyCode||e.which]);
	   keychar = keychar.toLowerCase();
	   //alert(key);
	   if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) || (key==37) || (key==39) || (key==46))
			return true;
	   else if ((("abcdefghijklmnopqrstuvwxyz0123456789-").indexOf(keychar) > -1))
			return true;
	   else
			return false;
	});
  	$("#mainfield").keyup(function()
  	{
		if($(this).val()!=previousText)
  		{
  			previousText=$(this).val();
  				$(".zone_toogle:checked").each(function()
  				{
  					processInfoBox(previousText,$(this).val());		
  				});
				pre_processInfoBox_org(previousText+".org");
		}
  	});
  	$(".info_box .short_whois").click(function(){
  		short_whois($(this).attr("value"));
  		return false;
  	});
  	$(".zone_toogle").click(function()
	{
  		if ($(this).is(":checked"))
  		{
			$("#input_block").show("fast");
  			$("#"+$(this).val()).show("fast");
			processInfoBox($("#mainfield").val(),$(this).val());
  		}
  		else
  		{
  			$("#"+$(this).val()).hide("fast");
			if($(".zone_toogle:checked").length==0&&$(".zone_toogle_org:checked").length==0)
				$("#input_block").hide("fast");
  		}
	});
	$(".site_link").click(function(){window.open($(this).attr('value'))});
  	$("#check_all").click(function()
  	{
  		$(".zone_toogle:not(:checked)").each(function()
  		{
  			$(this).attr('checked','checked');
  			$("#"+$(this).val()).show("fast");
			processInfoBox($("#mainfield").val(),$(this).val());
  		});
		//.org addon
		$(".zone_toogle_org:not(:checked)").attr('checked','checked');
		$("#_org").show("fast");
		pre_processInfoBox_org($("#mainfield").val()+".org");
		//---
  		$("#domains").buttonset("refresh");
		$("#input_block").show("fast");
  	});
  	$("#uncheck_all").click(function()
  	{
  		$(".zone_toogle:checked").each(function()
  		{
  			$(this).removeAttr('checked');
  			$("#"+$(this).val()).hide("fast");
  		});
		//.org addon
		$(".zone_toogle_org:checked").removeAttr('checked');
		$("#_org").hide("fast");
		//---
  		$("#domains").buttonset("refresh");
		$("#input_block").hide("fast");
  	});
});       