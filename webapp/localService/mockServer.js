sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/base/Log"
], function (MockServer, Log) {
	"use strict";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function () {
			// create
			var aRequests;
			var oMockServer = new MockServer({
				rootUri: "/"
			});

			// simulate against the metadata and mock data
			oMockServer.simulate("../localService/metadata.xml", {
				sMockdataBaseUrl: "../localService/mockdata",
				bGenerateMissingMockData: true
			});
			// handling mocking a function import call step
			aRequests = oMockServer.getRequests();
			aRequests.push({
				method: "GET",
				path: new RegExp("(mockToDoList.*)"),
				response: function (oXhr) {
					Log.debug("Incoming request for toDoLists");
					var oResponse = jQuery.ajax({
						type: "GET",
						url: "http://localhost:8080/getAllTodos ",
						dataType: 'json'
					});
						oXhr.respondJSON(200, {}, JSON.stringify(oResponse.data))
					
					return true;
				}
			});
			aRequests = oMockServer.getRequests();
			aRequests.push({
				method: "POST",
				path: new RegExp("(mockToDoList.*)"),
				response: function (oXhr, taskName) {
					var listobj = {
						"taskName": taskName
					};
					oXhr.respond(201, {
						"Content-Type": "application/json;charset=utf-8"
					}, JSON.stringify(listobj));
					});
					return true;
				}
			});
			aRequests = oMockServer.getRequests();
			aRequests.push({
				method: "DELETE",
				path: new RegExp("(mockToDoList.*)"),
				response: function (oXhr) {
					Log.debug("Incoming request for toDoLists");
					var oResponse = jQuery.ajax({
						type: "GET",
						url: "http://localhost:8080/getAllTodos ",
						dataType: 'json'
					});
						oXhr.respondJSON(200, {}, JSON.stringify(oResponse.data))
					
					return true;
				}
			});
			oMockServer.setRequests(aRequests);
			// handling custom URL parameter step
			var fnCustom = function (oEvent) {
				var oXhr = oEvent.getParameter("oXhr");
				if (oXhr && oXhr.url.indexOf("first") > -1) {
					oEvent.getParameter("oFilteredData").results.splice(3, 100);
				}
			};
			oMockServer.attachAfter("GET", fnCustom, "mockToDoList");

			// start
			oMockServer.start();

			Log.info("Running the app with mock data");
		}

	};

});