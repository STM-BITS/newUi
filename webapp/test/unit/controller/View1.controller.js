/*global QUnit*/

sap.ui.define([
	"todolist/ToDoList/controller/View1.controller",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (Controller) {
	"use strict";

	QUnit.module("View Controller");

	// QUnit.module('View1 Controller', {
	// 	before: function () {
	// 		this.server = sinon.fakeServer.create();
	// 	},
	// 	after: function () {
	// 		this.server.restore();
	// 		delete this.server;
	// 	}
	// });

	// QUnit.test("I should test the View1 controller", function (assert) {
	// 	var oAppController = new Controller();
	// 	oAppController.onInit();
	// 	assert.ok(oAppController);
	// });

	// https://stackoverflow.com/questions/38900858/qunit-testing-how-to-test-the-response-of-an-ajax-call-within-a-method
	QUnit.test("loadData ajax request", function (assert) {
		var callback = sinon.spy(jQuery, "ajax");

		this.server.respondWith("GET", "http://localhost:8080/getAllTodos", /*?id=123&name=-John*/ [200, {
			"Content-Type": "application/json"
		}, JSON.stringify([{
			"uuid": "3D45F01FE5974CC297F8E14D5B799873",
			"taskName": "Watch Series"
		}])]);

		this.server.respond();

		// assert.ok(callback.calledOnce, "Callback was called once");
		// var callll = sinon.spy();
		// console.log(callll);           
		var callArgs = callback.args[0];
		// console.log(callArgs.data);
		// sinon.assert.calledWith(JSON.stringify(callArgs.data),)
		assert.equal(JSON.stringify(callArgs.data), JSON.stringify([{
			"uuid": "55DF653E8B10414DA724C8E31EEA7C74",
			"taskName": "Watch Series"
		}]));
	});

	// QUnit.test("Stub", 1, function(assert) {
	//   sinon.stub(jQuery, "ajax").yieldsTo("success", [1, 2, 3]);

	//   jQuery.ajax({
	//     success: function (data) {
	//     assert.deepEqual(data, [1, 2, 3], "Right data set"); 
	//     }
	//   });
	//   jQuery.ajax.restore();
	// });

	QUnit.test('Ajax tests - For title Page', function (assert) {
		assert.expect(1); // we have one async test to run
		var done1 = assert.async();

		var xhr = $.ajax({
				type: 'GET',
				url: 'unitTests.qunit.html'
			})
			.always(function (data, status) {
				var $data = $(data);
				var pageTitle = $data.filter('title').text();
				assert.equal(pageTitle, 'Unit tests for ToDoList', 'Title of unitTests.qunit.html should be \'Unit tests for ToDoList\'');
				done1();
			});
	});

	QUnit.test('Example test', function (assert) {
		assert.equal(1, 1, 'One is one');
	});

	QUnit.test('Ajax tests - For Getting all todos', function (assert) {
		assert.expect(1); // we have one async test to run
		var done1 = assert.async();

		var xhr = $.ajax({
				type: 'GET',
				url: "http://localhost:8080/getAllTodos"
			})
			.always(function (data, status) {
				var $data = $(data);
				// console.log(data);
				var aResponse = [{
					"uuid": "55DF653E8B10414DA724C8E31EEA7C7",
					"taskName": "Watch Series"
				}];
				// [{"uuid":"3D45F01FE5974CC297F8E14D5B799873","taskName":"Watch Series"}]
				// console.log(JSON.stringify(data));
				// actual, expected, msg
				assert.equal(JSON.stringify(data), JSON.stringify(aResponse), 'Return all todos');
				done1();
			});
	});

});