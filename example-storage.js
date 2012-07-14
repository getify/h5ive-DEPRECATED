var keep = H5.storage();
var session = H5.storage({ expires: "session" });
var temp = H5.storage({ expires: 5*60*1000 }); // 5 minutes


keep
.save({
	prefs: { /* ... */ }
});


session
.save({
	session_id: 123456,
	foo: "bar baz"
})
.discard(["foo"]);


temp.save({
	active_login: session.get("session_id") // only keep this around for a little while
});


/*
session.listen(function(info){
	if (info.action == "update") {
		console.log("Updated `" + info.key + "` to '" + info.value + "'");
	}
});
*/
