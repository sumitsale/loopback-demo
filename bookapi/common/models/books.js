'use strict';

module.exports = function(Books) {

	Books.getBookFromLibrary = function(libraryId, cb) {

		console.log(libraryId);
		var response;
    	Books.find( {'where' : {'library_id' : libraryId} }, function (err, results) {
        response = results;
        cb(null, response);
       // console.log(response);
    	});
  	}

   Books.remoteMethod (
        'getBookFromLibrary',
        {
          http: {path: '/getBookFromLibrary', verb: 'get'},
          accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
          returns: {arg: 'name', type: 'string'}
        }
    );


   Books.score = function(data, cb) {

   //console.log(data);
   	Books.create(data);
   	cb(null, data);
   }


   Books.remoteMethod('score', {
	    accepts: { arg: 'data', type: 'object', default: '{"name": "string", "library_id": "number", "author": "string","price":"number"}', http: { source: 'body' } },
	    returns: { arg: 'data', type: 'Challenge'},
	    http: { path: '/score', verb: 'post' }
	});


	Books.savelibrary = function(data, cb) {

	var app = Books.app;
	var Libraries = app.models.Libraries;

   	Libraries.create(data);
   	cb(null, data);

   }

    Books.remoteMethod('savelibrary', {
	    accepts: { arg: 'data', type: 'object', default: '{"name": "string", "library_id": "number", "location": "string"}', http: { source: 'body' } },
	    returns: { arg: 'data', type: 'Challenge'},
	    http: { path: '/savelibrary', verb: 'post' }
	});

};




