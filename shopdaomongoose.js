
module.exports = function(mongoose, Schema) {



var ads=new Schema({
	adname:String,
	adseller: String,
	clickedtime: Date,
	purchased: String,
	purchasedquantity: Number,
	item: String

},{collection:'ads'});

var customerschema=new Schema({
'userid':String,
fname:String,
lname:String,
phone:String,
email:String,
active:String,
score:Number,
searchpattern: Array,
clickedads: [ads]

},{collection:'customer'});

var customer=mongoose.model('customer',customerschema);

var callback =function(error,customers)
{
	console.log("Printing data ");
	console.log(customers);
}
	

  return {
   
simpleInsert: function() {
	var doc={'userid':'sri_88',
					fname:'Sri',
					lname:'Esh',
					phone:'666-888-9999',
					email:'sri@gmail.com',
					active:'Y',
					score:55,
					searchpattern: ['57 inch TV','LED TV']
				};

					
					
	var doc1={userid:'sri_90',
					fname:'Sri',
					lname:'Esh',
					phone:'666-888-9999',
					searchpattern: ['57 inch TV','LED TV'],
					clickedads:[
					{
					adname:'LG TV',
					adseller: 'Amazon',
					purchased: 'Y',
					purchasedquantity: 2,
					item: 'I100'
					},
					{
					adname:'LG TV',
					adseller: 'Frys',
					purchased: 'Y',
					purchasedquantity: 1,
					item: 'I101'
					}
					]


					};

					var sri=new customer(doc1);

					sri.save(callback);

					function callback(error){
						console.log("Inserted customer")
					}

    },
	
selectWhere: function() {
										
					customer
					.find()
					.where('userid').equals('sri_76')
					.select('userid fname lname -_id')
					.exec(callback);

	},
	
selectWhereANDOrderby: function() {
					customer
					.find()
					.where('active').equals('Y')
					.where('city').equals('New York')
					.sort('-fname userid')
					.exec(callback);
	
	},	
	
selectWhereOR: function() {
				
				
					var custor=[{'fname':'Greg'},{'city':'New York'}];

					customer
					.find()
					.or(custor)
					//variation
				//	.where({$or:custor})
					.exec(callback);
	
	},
	
selectSkipLimit: function(){
					console.log("selectSkipLimit-------->");
					
					customer
					.find()
					.sort('userid')
					.skip(1)
					.limit(5)
					.exec(callback);					
				//	variation
				//	var options={"skip":1,"limit":5};
				//	customer.find({},{},options).exec(callback);
		
	},


// has to be modified
selectConditionsGTLTEQ: function(){
					
				//	var where={'clickedItems.price': {$gte:'200'}};
					customer
					.find()
				//   variation 
				//	.find(where)
					.where('score').gte('50')
					.exec(callback);

	}, 
	
selectisNullisNotNull: function(){
				
					customer
					.find()
					.exists('email',false)
					.exists('phone',true)
					.exec(callback);

				//   variation	
				//	var where={'email': {$exists:false}, 'phone':{$exists:true}};
				//	.find(where)
					
	},

selectWhereIN: function(){
					//$in - IN, $nin - for Not in
					customer
					.find()
					.nin('city',['New York','San Francisco'])
					.exec(callback);

					//variation
					//var where={'city':{$nin:['New York','San Francisco']}};
					//.find(where)
					
	},

selectDistinct: function() {
										
					customer
					.distinct('userid')
					.exec(callback);

	},

selectLike: function() {
							
				// %lname% -/lname/ , lname% - /^lname/, %lname - /lname$/. 
				// Case Insensetivity - i ex: /lname/i			
					
					customer
				//   Variation
				//	.find({'lname': /^Es/})
					.find()
					.regex('lname',/^Es/)
					.select('fname lname')
					.exec(callback);
	},
selectAll: function(){
											
					customer
					.find()
					.all('searchpattern',[/TV/,/LED/])
					.exec(callback);
					
	},

selectElemMatch: function(){
								
				customer
					.where(fname,/Sr/)
					.where('clickedads').elemMatch(function (elem) {
 						 elem.where('adseller', 'Frys')
  						 elem.where('purchasedquantity').gte(1);
							})
					.exec(callback);
					
	}
  };
}

