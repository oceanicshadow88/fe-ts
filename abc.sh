PAYLOAD='{"user": "TheUnstoppables2019:ATBBKxmdFWwpnNVyvcF8KYZJbTxy98EC005C"}'

RESPONSE=`curl --request GET -H "Content-Type:application/json" https://api.bitbucket.org/2.0/repositories/010001/fe.techscrum/pullrequests/293	 --data "${PAYLOAD}"`

jq/help
