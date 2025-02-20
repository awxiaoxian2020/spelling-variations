const spellingVariations = require('../src/index.js');
const assert = require('assert');

describe('Spelling Variations', function () {
	
	describe('rontgenised (not preferred by any accent)', function () {
		var obj = new spellingVariations("rontgenised").analyze();
		it('word', function () {
			assert.equal(obj.word,"rontgenised");
		});
		it('scoreUK', function () {
			assert.equal(obj.scoreUK,0.5);
		});
		it('scoreUS', function () {
			assert.equal(obj.scoreUS,0.25);
		});
		it('hasVariations', function () {
			assert.equal(obj.hasVariations,true);
		});
		it('UKPrefered', function () {
			assert.equal(obj.UKPrefered,'roentgenises');
		});
		it('USPrefered', function () {
			assert.equal(obj.USPrefered,'roentgenizes');
		});
		it('UKVariations', function () {
			assert.equal(obj.UKVariations[0],'roentgenises');
		});
		it('USVariations', function () {
			assert.equal(obj.USVariations[0],'roentgenizes');
		});
	});

	describe('acclimating (common between the two)', function () {
		var obj = new spellingVariations("acclimating").analyze();
		it('word', function () {
			assert.equal(obj.word,"acclimating");
		});
		it('scoreUK', function () {
			assert.equal(obj.scoreUK,0.87);
		});
		it('scoreUS', function () {
			assert.equal(obj.scoreUS,0.87);
		});
		it('hasVariations', function () {
			assert.equal(obj.hasVariations,true);
		});
		it('UKPrefered', function () {
			assert.equal(obj.UKPrefered,'acclimatising');
		});
		it('USPrefered', function () {
			assert.equal(obj.USPrefered,'acclimatizing');
		});
		it('UKVariations', function () {
			assert.equal(obj.UKVariations[1],'acclimatizing');
		});
		it('USVariations', function () {
			assert.equal(obj.USVariations[1],'acclimatising');
		});
	});

	describe('grecise (least favorite for the brits)', function () {
		var obj = new spellingVariations("grecise").analyze();
		it('word', function () {
			assert.equal(obj.word,"grecise");
		});
		it('scoreUK', function () {
			assert.equal(obj.scoreUK,0.25);
		});
		it('scoreUS', function () {
			assert.equal(obj.scoreUS,0.75);
		});
		it('hasVariations', function () {
			assert.equal(obj.hasVariations,true);
		});
		it('UKPrefered', function () {
			assert.equal(obj.UKPrefered,'graecise');
		});
		it('USPrefered', function () {
			assert.equal(obj.USPrefered,'grecize');
		});
		it('UKVariations', function () {
			assert.equal(obj.UKVariations[1],'graecize');
		});
		it('USVariations', function () {
			assert.equal(obj.USVariations[2],'graecise');
		});
	});

	describe('pattern recognition', function () {
		it('ellous$', function () {
			assert.equal(new spellingVariations("coloellous").analyze().USVariations[0],"coloelous");
		});
		it('elous$', function () {
			assert.equal(new spellingVariations("coloelous").analyze().UKVariations[0],"coloellous");
		});
		it('sation$', function () {
			assert.equal(new spellingVariations("mesovasation").analyze().USVariations[0],"mesovazation");
		});
		it('zation$', function () {
			assert.equal(new spellingVariations("mesovazation").analyze().UKVariations[0],"mesovasation");
		});
		// TODO: write more tests about patterns
	});

});


describe('API testing', function () {
	it('scoreUK', function () {
		assert.equal(new spellingVariations("multicolours").scoreUK(),1);
	});
	it('scoreUS', function () {
		assert.equal(new spellingVariations("monotonize").scoreUS(),1);
	});
	it('hasVariations', function () {
		assert.equal(new spellingVariations("multicolours").hasVariations(),true);
	});
	it('USVariations', function () {
		assert.equal(new spellingVariations("monopolised").USVariations()[0],"monopolized");
	});
	it('UKVariations', function () {
		assert.equal(new spellingVariations("moralize").UKVariations()[0],"moralise");
	});
	it('UKPrefered', function () {
		assert.equal(new spellingVariations("moralize").UKPrefered(),"moralise");
	});
	it('USPrefered', function () {
		assert.equal(new spellingVariations("moralize").USPrefered(),"moralize");
	});
	it('variations', function () {
		assert.equal(new spellingVariations("molding").variations().length,1);
	});
	it('commonVariation', function () {
		assert.equal(new spellingVariations("anglify").commonVariation(),"anglify");
	});
	it('toUK', function () {
		assert.equal(new spellingVariations("Anglify").toUK(),"anglicise");
	});
	it('toUS', function () {
		assert.equal(new spellingVariations("amenorrheic").toUS(),"amenorrheal");
	});
});

describe('performance test', function (done) {
	it('less than 500 ms for 10000 words', function (done) {
		var t0 = Date.now();
		for (var i = 10000; i; i--) {
			new spellingVariations("rontgenised").analyze();
		}
		this.test.title = this.test.title + ": " + (Date.now() - t0);
		done(assert.equal(Date.now() - t0 < 500,true));
	});
});