	/*global QUnit*/

	sap.ui.define([
		"sap/ui/test/opaQunit",
		"./pages/View1"
	], function (opaTest) {
		"use strict";

		QUnit.module("Navigation Journey");

		opaTest("Should see the initial page of the app", function (Given, When, Then) {
			// Arrangements
			Given.iStartMyApp();

			// Assertions
			Then.onTheAppPage.iShouldSeeTheApp();

			//Cleanup
		});
		opaTest("I toggle the switch", function (Given, When, Then) {
			// Arrangements
			When.onTheAppPage.iToggleTheSwitch();

			// Assertions
			Then.onTheAppPage.theSwitchIsToggled();

			//Cleanup
		});
		opaTest("Click on add button", function (Given, When, Then) {

			When.onTheAppPage.iClickOnAddButton();
				// Assertions
			Then.onTheAppPage.iShouldSeeDialog();

		});
		opaTest("Click on cancel task button", function (Given, When, Then) {

			When.onTheAppPage.iWriteATaskName();
				// Assertions
			Then.onTheAppPage.iClickOnCancelTaskButton();

		});
		opaTest("Click on add button", function (Given, When, Then) {

			When.onTheAppPage.iClickOnAddButton();
				// Assertions
			Then.onTheAppPage.iShouldSeeDialog();

		});
		opaTest("Click on add task button", function (Given, When, Then) {

			When.onTheAppPage.iWriteATaskName();
				// Assertions
			Then.onTheAppPage.iClickOnAddTaskButton();

		});
		opaTest("I Delete the task", function (Given, When, Then) {

			When.onTheAppPage.iDeleteATask();
				// Assertions
			Then.onTheAppPage.iSeeTheTaskIsDeleted();

		});
		opaTest("I Should not see the input text after reopening the dialog on cancel", function (Given, When, Then) {

			When.onTheAppPage.iClickOnAddButton();
			When.onTheAppPage.iWriteATaskName();
			When.onTheAppPage.iClickOnCancel();
			When.onTheAppPage.iClickOnAddButton();
				// Assertions
			Then.onTheAppPage.iSeeTheInputFieldCleared();

		});
		
	});