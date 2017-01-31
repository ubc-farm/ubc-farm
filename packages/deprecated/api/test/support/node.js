var chai = require("chai");
var chaiHttp = require("chai-http");
var chaiAsPromised = require("chai-as-promised");

chai.should();
chai.use(chaiHttp);
chai.use(chaiAsPromised);