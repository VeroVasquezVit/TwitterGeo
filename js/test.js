
var server = 'http://localhost/couchdb/';

function onload() {
	
	var res = getLanguageTweetsPerDay(2013, 9, 30);
	var text = '';
	for (var i = 0; i < res.length; i++) {
		text += res[i][0] + ' - ' + res[i][1] + '<br/>';
	}
	$('#results').html(text);
	
	alert(JSON.stringify(samanTest()));
	
};

function getLanguageTweetsPerDay(year, month, day) {
	var json = '';
	month--; //JavaScript Date works with months 0 - 11
	$.ajax({
		  type: 'GET',
		  dataType: 'json',
		  url: server + 'twittering_replica/_design/language/_view/per_day?group_level=4',
		  success: function(result) {
			  json = result;
		  },
		  async: false
	});
	
	var res = new Array();
	for (var i = 0, j = 0; i < json.rows.length; i++) {
		var k = json.rows[i].key;
		var v = json.rows[i].value;
		if (k[1] != year || k[2] != month || k[3] != day) 
			continue;
		res[j] = new Array(2);
		res[j][0] = k[0];
		res[j][1] = v;
		j++;
	}
	
	return res;
};

function samanTest() {
	
	var doc = '';
	$.ajax({
		  type: 'GET',
		  dataType: 'json',
		  url: server + 'twittering_replica/_design/language/_view/coordinates',
		  success: function(result) {
			  doc = result;
		  },
		  async: false
	});
	
	var res = {
		"extent" : [150.821457,-34.026391,151.319962,-33.724244],
		"features" : []
	};
	for (var i = 0; i < doc.total_rows; i++) {
		var point = {
			"geometry": {
				"type" : "point",
				"coordinates" : [doc.rows[i].value[1],doc.rows[i].value[2]]
			}
		}
		res.features.push(point);
	}
	return res;
}

