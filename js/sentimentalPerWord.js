var server = 'http://115.146.95.86/couchdb';
//This function is just for text the other functions

function onload() {

    var res = sentimentalPerWord();
    //alert(JSON.stringify(res));
    $('#results').html(JSON.stringify(res));

    //alert(JSON.stringify(samanTest()));

};


// This function bring the sentimental tweets related with a word: 
// cordinate1, cordinate2, sentiment of each tweet 
//After it convert in another Json object in the format that Saman needs
//Input: No parameters
//Output: Json object 

function sentimentalPerWord() {
    month--;
    var json = '';
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: server + '/twitter/_design/sentimental/_view/sentimentalPerWord',
        success: function (result) {
            json = result;
            //alert('It gets the Json :)');
        },
        error: function () {
            alert("error");
        },
        //complete: function () {
        //    alert("completed");
        //},
        async: false
    });

    var res = {
        "extent": [150.821457, -34.026391, 151.319962, -33.724244],
        "features": []
    };
    alert(json.rows.length);
    for (var i = 0; i < json.rows.length; i++) {
        var point = {
            "geometry": {
                "type": "point",
                "coordinates": [json.rows[i].value[0], json.rows[i].value[1]],
            }
            "sentiment": json.rows[i].value[2]
        }
        //alert('Linea:'+ point.geometry.sentiment + "\n" + point.geometry.coordinates);
        res.features.push(point);
    }
    return res;
};
