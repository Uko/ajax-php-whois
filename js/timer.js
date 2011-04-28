function tick()
{
	$(".info_box_org>.refresh").css("background-position", (-17*orgData["counter"])+"px 0px")
	if (orgData["counter"]==0)
	{
		clearInterval(countdown);
		if(!$("#mainfield").val()||((orgData["registered"]=="yes"||orgData["registered"]=="no")&&$("#mainfield").val()+".org"==orgData["domain"]))
			$(".info_box_org>.refresh").css("background-position", "17px 0px");
		else
			$(".info_box_org>.refresh").css("cursor","pointer");
		return;
	}
	else
	{
		orgData["counter"]--;
	}		
}


