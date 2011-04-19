$(document).ready(function()
{
  	var previousText="";
  	progressBar = new Image();
  	progressBar.src = "techImages/loadingAnimation.gif";
  	$(".progress_bar").attr("src",progressBar.src);
  	$("#dialog").dialog({modal: true,draggable: false, resizable: false, autoOpen: false, height: 400, width: 600});
  	$(".info_box").css("display","none");
  	$(".info_box").addClass("unknown");
  	$("form").submit(function() {return false});
  	$("#mainfield").keyup(function()
  	{
  		if($(this).val()!=previousText)
  		{
  			previousText=$(this).val();
  			if(previousText)
  			{
  				$("input:checked").each(function()
  				{
  					processInfoBox(previousText,$(this).val());		
  				});
  			}
  		}
  	});
  	$(".short_whois").click(function(){
  		short_whois($(this).attr("href"));
  		return false;
  	});
  	$(":checkbox").click(function()
	{
  		if ($(this).is(":checked"))
  		{
  			$("#"+$(this).val()).show("fast");
  			if($("#mainfield").val())
  			{
				processInfoBox($("#mainfield").val(),$(this).val());
  			}
  		}
  		else
  		{
  			$("#"+$(this).val()).hide("fast");
  		}
	});
  	$("#check_all").click(function()
  	{
  		$("input:checkbox:not(:checked)").each(function()
  		{
  			$(this).attr('checked','checked');
  			$("#"+$(this).val()).show("fast");
  			if($("#mainfield").val())
  			{
				processInfoBox($("#mainfield").val(),$(this).val());
  			}
  		});
  		return false;
  	});
  	$("#uncheck_all").click(function()
  	{
  		$("input:checked").each(function()
  		{
  			$(this).removeAttr('checked');
  			$("#"+$(this).val()).hide("fast");
  		});
  		return false;
  	});
});       