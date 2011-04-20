var jaxRequest = new Array();
$(document).ready(function()
{
  	var previousText="";
  	progressBar = new Image();
  	progressBar.src = "techImages/loadingAnimation.gif";
  	$(".progress_bar").attr("src",progressBar.src);
  	$("#dialog").dialog({modal: true,draggable: false, resizable: false, autoOpen: false, height: 400, width: 600});
	$("#domains").buttonset();
	$("#mass_tooglers").buttonset();
  	$(".info_box").css("display","none");
  	$(".info_box").addClass("unknown");
	$(".info_box").each(function(){jaxRequest[$(this).attr("id")]=0;});
  	$("form").submit(function() {return false});
	$("#mainfield").keypress(function(e)
	{         
		var key = e.charCode || e.keyCode || 0;                     
		var keychar = String.fromCharCode(key);
		if (  ((key == 8 || key == 9 || key == 46 || key == 35 || key == 36 || (key >= 37 && key <= 40)) && e.charCode==0) || (key >= 48 && key <= 57) || (key >= 97 && key <= 122) || (key >= 65 && key <= 90) || key == 45 )
		{
			return;
		} 
		else {
			e.preventDefault();
		}
    });
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
  		$("#domains").buttonset("refresh");
  	});
  	$("#uncheck_all").click(function()
  	{
  		$("input:checkbox:checked").each(function()
  		{
  			$(this).removeAttr('checked');
  			$("#"+$(this).val()).hide("fast");
  		});
  		$("#domains").buttonset("refresh");
  	});
});       