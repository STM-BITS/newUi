sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";
	var sViewName = "View1";
	var items;
	Opa5.createPageObjects({
		onTheAppPage: {

			actions: {
				iClickOnAddButton: function() {
					return this.waitFor({
						controlType: "sap.m.Button",
						
						viewName: sViewName,
						success: function (oButton) {
							oButton[0].firePress();
							Opa5.assert.ok(true, "The View1 view is displayed");
						},
						errorMessage: "Did not find the View1 view"
					});
				},
				iWriteATaskName: function() {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.Input",
						success: function(oInput){
							oInput[0].setValue("hi");
							Opa5.assert.ok(true, "The task name entered");
						},
						errorMessage: "Did not find the task name"
					});
				},
				iDeleteATask: function(){
					return this.waitFor({
						controlType: "sap.f.GridList",
						success: function(oGridList){
							oGridList[0].getAggregation('items')[0].getAggregation('content')[0].getAggregation('items')[0].getAggregation('items')[0].getAggregation('items')[1].firePress();
							items = oGridList[0].getAggregation('items').length;
							Opa5.assert.ok(true, "The task name entered");
						},
						errorMessage: "Did not find the task name"
					});
				},
				iToggleTheSwitch: function(){
					return this.waitFor({
						controlType: "sap.m.Switch",
						success: function(oSwitch){
							oSwitch[0].setState(false);
							
						}
					});
				}
			},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						id: "app",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The View1 view is displayed");
						},
						errorMessage: "Did not find the View1 view"
					});
				},
				iShouldSeeDialog: function(){
					return this.waitFor({
						controlType: "sap.m.Dialog",
						success: function() {
								Opa5.assert.ok(true, "The Dialog is displayed");
						},
						errorMessage: "Did not find the Dialog"
					});
				},
				iClickOnAddTaskButton: function(){
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.Button",
						success: function(oButton) {
							oButton[0].firePress();
								Opa5.assert.ok(true, "The Dialog is displayed");
						},
						errorMessage: "Did not find the Dialog"
					});
				},
				iClickOnCancelTaskButton: function(){
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.Button",
						success: function(oButton) {
								oButton[1].firePress();
								Opa5.assert.ok(true, "The Dialog is displayed");
						},
						errorMessage: "Did not find the Dialog"
					});
				},
				iSeeTheTaskIsDeleted: function(){
					return this.waitFor({
						controlType: "sap.f.GridList",
						success: function(oGridList) {
								var items1 = oGridList[0].getAggregation('items').length+1;
								if(items === items1)
								{
									Opa5.assert.ok(true, "The Dialog is displayed");
								}
								
						},
						errorMessage: "Did not find the Dialog"
					});
				},
				theSwitchIsToggled: function(){
					return this.waitFor({
						controlType: "sap.m.Switch",
						success: function(oSwitch) {
	
								if(oSwitch[0].getState()  === false)
								{
									Opa5.assert.ok(true, "The Dialog is displayed");
								}
								
						},
						errorMessage: "Did not find the Dialog"
					});
				},
			}
		}
	});

});