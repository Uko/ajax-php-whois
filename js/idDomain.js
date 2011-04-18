function toId(str)
 		{
 			return(str.replace(/./g,"_"));
 		}
		function toDomain(str)
 		{
 			return(str.replace(/_/g,"."));
		}