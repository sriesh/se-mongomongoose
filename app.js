var MongoClient = require('mongodb').MongoClient;
var CustomerDAO = require('./shopdaomongoose.js');
var mongoose = require('mongoose');

var Schema= mongoose.Schema;
/*var storeschema=new Schema({

					storename:String,
					city:String
			},{ collection: 'Store' });*/



mongoose.connect('mongodb://localhost:27017/onlineAd',function(error, result)
{
	console.log('db connected');
	console.log("Really connected");
	var custdao=CustomerDAO(mongoose, Schema);
	
//custdao.simpleInsert();

	//custdao.selectWhere();

	// custdao.selectWhereANDOrderby();

 	//	custdao.selectWhereOR();

   // custdao.selectSkipLimit();

  //   custdao.selectConditionsGTLTEQ();

 // custdao.selectisNullisNotNull();

 // custdao.selectWhereIN();

// custdao.selectDistinct();

//custdao.selectLike();

//custdao.selectAll();

// custdao.selectAll();

custdao.selectElemMatch();




});

