<?php
	function toId($str)
	{
		return str_replace(".", "_", $str);
	}
	function toDomain($str)
	{
		return str_replace("_", ".", $str);
	}
?>