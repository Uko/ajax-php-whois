<?php
/*
Whois.php        PHP classes to conduct whois queries

Copyright (C)1999,2005 easyDNS Technologies Inc. & Mark Jeftovic

Maintained by David Saez (david@ols.es)

For the most recent version of this package visit:

http://www.phpwhois.org

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

/* uanic.whois	0.1	Yuriy Tymchuk <uko@unikernel.net> 2011/04/18 */

if (!defined('__UA_HANDLER__'))
	define('__UA_HANDLER__', 1);

require_once('whois.parser.php');

class ua_handler
	{

	function parse($data_str, $query)
		{
		$translate = array(
			'domain' => 'name',
			'fax-no' => 'fax',
			'e-mail' => 'email',
			'nic-handle' => 'handle',
			'person' => 'name',
			'personname' => 'name',
			'street address' => 'address.street',
			'city' =>	'address.city',
			'postal code' => 'address.pcode',
			'country' => 'address.country'
			);

		$contacts = array(
                    'owner-c' => 'owner',
                    'admin-c' => 'admin',
                    'tech-c' => 'tech',
                    'billing-c' => 'billing',
                    'zone-c' => 'zone'
		                );

		$r['regyinfo'] = array(
                          'referrer' => 'http://www.uar.net/',
                          'registrar' => 'ua.zz'
                          );
		
		$reg = generic_parser_a($data_str['rawdata'], $translate, $contacts, 'domain', 'dmY');
		if(substr($reg["domain"]["status"], 0, 8)=="OK-UNTIL")
		{
			$reg["domain"]["expires"]=substr($reg["domain"]["status"], 9, 4)."-".substr($reg["domain"]["status"], 13, 2)."-".substr($reg["domain"]["status"], 15, 2);
		}
		
		$r['regrinfo'] = $reg;
		return ($r);
		}
	}

?>
