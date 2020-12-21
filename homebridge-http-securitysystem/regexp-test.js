/**
 * Mapper class that can be used as a dictionary for mapping one value to another
 *
 * @param {Object} parameters The parameters of the mapper
 * @constructor
 */
function StaticMapper(parameters) {
	var self = this;
	self.mapping = parameters.mapping;

	self.map = function(value) {
		return self.mapping[value] || value;
	};
}

/**
 * Mapper class that can extract a part of the string using a regex
 *
 * @param {Object} parameters The parameters of the mapper
 * @constructor
 */
function RegexMapper(parameters) {
	var self = this;
	self.regexp = new RegExp(parameters.regexp);
	self.capture = parameters.capture || "1";
	self.map = function(value) {
		var matches = self.regexp.exec(value);

		if (matches !== null && self.capture in matches) {
			return matches[self.capture];
		}

		return value;
	};
}

var mappers = [];
mappers.push(new RegexMapper({
    "regexp": "\"value\"\:(\\d)"
}));

mappers.push(new StaticMapper({
    "mapping": {
		"0": "3",
		"1": "0"
    }
}));

var input ='{"Name":"HomeSeer Devices","Version":"1.0","Devices":[{"ref":266,"name":"Areas Secure","location":"RaspberryIO","location2":"TexecomConnect","value":1,"status":"On","device_type_string":"RaspberryIO","last_change":"\/Date(1525265141999)\/","relationship":4,"hide_from_view":false,"associated_devices":[258],"device_type":{"Device_API":4,"Device_API_Description":"Plug-In API","Device_Type":0,"Device_Type_Description":"Plug-In Type 0","Device_SubType":0,"Device_SubType_Description":""},"device_image":"","UserNote":"","UserAccess":"Any","status_image":"/images/HomeSeer/status/on.gif","voice_command":"","misc":4864}]}';

mappers.forEach(m => input = m.map(input));
console.log(input);

