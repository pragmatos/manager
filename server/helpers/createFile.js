const fs = require('fs');
exports.create = function(req){
	var path = "uploads/files/"+req.decoded._id+"_file.m3u";
	var filename = "public/"+path;
	var file = fs.createWriteStream(filename);
	file.on('error', function(err) { /* error handling */ });

		req.body.forEach(function(v) {
			file.write('#EXTINF:0,'+ v.name + '\r\n');
			file.write(v.href + '\r\n');
		});
	file.end();
	return path;

}
