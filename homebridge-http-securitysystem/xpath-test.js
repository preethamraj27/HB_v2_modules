var xpath = require("xpath");
var dom = require("xmldom").DOMParser;

function XPathMapper(parameters) {
	var self = this;
	self.xpath = parameters.xpath;
	self.index = parameters.index || 0;

	self.map = function(value) {
		var document = new dom().parseFromString(value);
		var result  = xpath.select(this.xpath, document);

		if (typeof result == "string") {
			return result;
		} else if (result instanceof Array && result.length > self.index) {
			return result[self.index].data;
		}

		return value;
	};
}

var params = {
	xpath: "string(/state/datapoint/@value)"
};

var xml = '<?xml version="1.0" encoding="ISO-8859-1" ?><state><datapoint ise_id="52967" value="4"/></state>';

var mapper = new XPathMapper(params);
var mapped = mapper.map(xml);
console.log(mapped);
