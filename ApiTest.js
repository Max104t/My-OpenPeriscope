var ApiTestController = {
    init: function(parent) {
        NODEJS = typeof require === 'function';
        if (NODEJS) {
            ApiTestController.init_nodejs(parent);
        } else {
            ApiTestController.init_one_script(parent);
        }
    },
    init_nodejs: function(parent) {
        const fs = require('fs');
        fs.readFile('ApiTest.html', 'utf8', function (err, data) {
            parent.append(data);
         });
    },
    init_one_script: function(parent) {
        parent.append('<div id="ApiTest"><a href="https://github.com/gitnew2018/My-OpenPeriscope"><img'+
                                'style="position: absolute; top: 0; right: 0; border: 0;" src="/images/forkme.png"'+
                                'alt="Fork me on GitHub"></a>Some documentation can be found in <a'+
                            'href="http://static.pmmlabs.ru/OpenPeriscope" target="_blank">docs by @cjhbtn</a><br>'+
                        '<dt>Url</dt><iframe id="urlautocomplete" name="urlautocomplete" style="display: none;"></iframe>'+
                        '<form target="urlautocomplete"><input id="url_root" type="text" value="https://api.periscope.tv/api/v2/"'+
                                'autocomplete="on"></form><br>'+
                        '<dt>Http</dt><select id="http_method">'+
                            '<option value="POST" selected="selected">POST</option> <!-- The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server. -->'+
                            '<option value="GET">GET</option>                       <!-- The GET method requests a representation of the specified resource. Requests using GET should only retrieve data. -->'+
                            '<option value="HEAD">HEAD</option>                     <!-- The HEAD method asks for a response identical to that of a GET request, but without the response body. -->'+
                            '<option value="PUT">PUT</option>                       <!-- The PUT method replaces all current representations of the target resource with the request payload. -->'+
                            '<option value="DELETE">DELETE</option>                 <!-- The DELETE method deletes the specified resource. -->'+
                            '<option value="CONNECT">CONNECT</option>               <!-- The CONNECT method establishes a tunnel to the server identified by the target resource. -->'+
                            '<option value="OPTIONS">OPTIONS</option>               <!-- The OPTIONS method is used to describe the communication options for the target resource. -->'+
                            '<option value="TRACE">TRACE</option>                   <!-- The TRACE method performs a message loop-back test along the path to the target resource. -->'+
                            '<option value="PATCH">PATCH</option>                   <!-- The PATCH method is used to apply partial modifications to a resource. -->'+
                        '</select><br><br>'+
                        '<dt>Method</dt><iframe id="forautocomplete" name="forautocomplete" style="display: none;"></iframe>'+
                        '<form target="forautocomplete"><input id="method" type="text" placeholder="mapGeoBroadcastFeed"'+
                                'autocomplete="on"></form><br>'+
                        '<dt>Header</dt><textarea id="headers">{'+
                        '"User-Agent": "Periscope/2699 (iPhone; iOS 8.1.2; Scale/2.00)"'+
                        '}</textarea><br>'+
                        '<dt>Parameters</dt><textarea id="params"'+
                            'placeholder="{&quot;include_replay&quot;: true, &quot;p1_lat&quot;: 1, &quot;p1_lng&quot;: 2, &quot;p2_lat&quot;: 3, &quot;p2_lng&quot;: 4}"></textarea><br><br>'+
                            '<a class="button" onclick="ApiTestController.submitButton_click()">Submit</a><br><br>'+
                        '<pre id="response"></pre>Response is also displayed in the browser console, if [Debug mode] is checked'+
                        '</div>');
    },
    submitButton_click: function () {
        try {
            $('#ApiTest form').submit();
            var url_root = $('#url_root').val().trim();
            if (url_root == '')
                throw Error('url is empty');
            var http_method = $('#http_method').val().trim();
            var method = $('#method').val().trim();
            var headers = $('#headers').val().trim();
            var params = $('#params').val().trim();
            if (params == '') {
                params = '{}';
                $('#params').text(params);
            }
            ApiWorker(http_method, url_root, method, JSON.parse(headers), JSON.parse(params), function (response) {
                $('#response').html(JSON.stringify(response, null, 4));
            }, function (error) {
                $('#response').text(error);
            });
        } catch (e) {
            $('#response').text(e.toString());
        }
    }
}
