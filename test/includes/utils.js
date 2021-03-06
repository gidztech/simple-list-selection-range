var TIMEOUT_MS = 5000;

var assert = {
    waitForSelector: function(selector, message) {
        return casper.waitForSelector(selector, function() {
                casper.test.pass(message);
            }, function() {
                casper.test.fail(message);
            }
        );
    },
    waitForElementToHaveAttr: function (selector, attrName, expectedValue, message) {
        casper.then(function() {
            var attrValue = '';
            casper.waitFor(
                function() {
                    attrValue = casper.evaluate(function(selector, attrName) {
                        var els = document.querySelectorAll(selector);
                        if (els && els[0] && els[0].hasAttribute(attrName)) {
                            return els[0].getAttribute(attrName);
                        }
                        return false;
                    }, selector, attrName);

                    return attrValue === expectedValue;
                }, function() {
                    casper.test.pass(message);
                }, function() {
                    casper.test.fail(message + ': ' + selector + ' child should have attr ' + attrName + ' = ' + expectedValue + ', but it was ' + attrValue);
                },
                TIMEOUT_MS
            );
        });
    },
    waitForElementToNotHaveAttr: function (selector, attrName, message) {
        casper.then(function() {
            casper.waitFor(
                function() {
                    return casper.evaluate(function(selector, attrName) {
                        var els = document.querySelectorAll(selector);
                        if (els && els[0] && els[0].hasAttribute(attrName)) {
                            return false;
                        }
                        return true;
                    }, selector, attrName);
                }, function() {
                    casper.test.pass(message);
                }, function() {
                    casper.test.fail(message + ': ' + selector + ' child should not have attr ' + attrName + ', but it did');
                },
                TIMEOUT_MS
            );
        });
    },
    waitForElementCount: function (selector, expectedCount, message) {
        casper.then(function () {
            var count;
            casper.waitFor(
                function tester(){
                    count = casper.evaluate(function (selector) {
                        return document.querySelectorAll(selector).length;
                    }, selector);
                    return count === expectedCount;
                },
                function then() {
                    casper.test.assertEqual(count, expectedCount, message);
                },
                function timeout() {
                    casper.test.assertEqual(count, expectedCount, message);
                }
            );
        });
    },
};

