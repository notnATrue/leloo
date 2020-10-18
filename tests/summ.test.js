require("dotenv").config();
import "babel-polyfill";
const sum = require("./summ");
const { ThirdPartyAPI } = require("../src/third-party-api/leeloo/service");
const thirdPartyApi = new ThirdPartyAPI();

test('gets users from leeloo api', () => {
    expect(thirdPartyApi.getUsers().toBe(typeof "object" === true));
})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});