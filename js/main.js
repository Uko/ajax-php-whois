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
  	$(".whois").click(function(){
  		whois($(this).attr("href"));
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
  	$("#dialog").click(function(){
  		$("#dialog").html("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  	});
});       