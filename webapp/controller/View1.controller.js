sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
	"use strict";

	return Controller.extend("todolist.ToDoList.controller.View1", {
		onInit: function () {
			var oModel = new JSONModel(sap.ui.require.toUrl("todolist/ToDoList/model") + "/mockToDoList.json");
			this.getView().setModel(oModel, "ToDoList");
			var oModel_todo = new JSONModel(sap.ui.require.toUrl("todolist/ToDoList/model") + "/mockToDos.json");
			this.getView().setModel(oModel_todo, "ToDos");
		},
		loadData: function () {
			var oModel = this.getView().getModel("ToDoList");
			jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "http://localhost:8080/getAllTodos",
				success: function (data, textStatus) {
					oModel.setData(data);
					oModel.refresh(true);
					console.log("Success");
					return true;
				},
				error: function (error) {
					console.log(error);
					return false;
				}
			});
		},
		onSwitch: function (oEvent) {
			if (oEvent.getParameters().state === false) {
				var oModel = this.getView().getModel("ToDoList");
				var that = this;
				jQuery.ajax({
					type: "GET",
					contentType: "application/json",
					url: "http://localhost:8080/getAllTodos",
					success: function (data, textStatus) {
						oModel.setData(data);
						oModel.refresh(true);
						console.log("Success");
					},
					error: function (error) {
						console.log(error);
					}
				});
				this.getView().setModel(oModel);
			}
		},
		onDelete: function (oEvent) {
			var event = oEvent.getSource().mBindingInfos.tooltip.binding.aBindings[0].oContext.sPath;
			var id = this.getView().getModel("ToDoList").getProperty(event).uuid;
			var that = this;
			jQuery.ajax({
				type: "DELETE",
				contentType: "application/json",
				url: "http://localhost:8080/delete/" + id,
				success: function (data, textStatus) {
					that.loadData();
				},
				error: function (error) {
					console.log(error);
				}.bind(this)
			});
		},
		handleSelectDialogPress: function (oEvent) {
			var oView = this.getView();
			if (!this._oDialog) {
				Fragment.load({
					id: oView.byId(),
					name: "todolist.ToDoList.view.dialogue",
					controller: this
				}).then(function (oDialog) {
					this._oDialog = oDialog;
					oView.addDependent(oDialog);
					this._oDialog.open();
				}.bind(this));
			} else {
				this._oDialog.open();
			}
		},
		onAddPress: function (oEvent) {
			// var listName = oEvent.getSource().getParent().mAggregations.content[0].mProperties.value;
			var listName = oEvent.getSource().getParent().getAggregation("content")[0].getValue();
			var listobj = {
				"taskName": listName
			};
			var that = this;
			jQuery.ajax({
				type: "POST",
				contentType: "application/json",
				url: "http://localhost:8080/create",
				data: JSON.stringify(listobj),
				success: function (data, textStatus) {
					that.loadData();
					that._oDialog.getContent()[0].setValue('');
					that._oDialog.close();
				},
				error: function (error) {
					that.loadData();
					that._oDialog.getContent()[0].setValue('')
					that._oDialog.close();
				}.bind(this)
			});

		},
		// onListSelection: function (oEvent) {
		// 	if (this.getView().byId("switch").getState() !== false) {
		// 		var title = this.getView().getModel("ToDoList").getProperty(oEvent.getSource().getBindingContextPath()).todoListName;
		// 		if (!this._oDialogtask) {
		// 			Fragment.load({
		// 				name: "todolist.ToDoList.view.taskDialogue",
		// 				controller: this
		// 			}).then(function (oDialog) {
		// 				this._oDialogtask = oDialog;
		// 				this.getView().addDependent(oDialog);
		// 				this._oDialogtask.setTitle(title);
		// 				this._oDialogtask.open();
		// 			}.bind(this));

		// 		} else {
		// 			this._oDialogtask.setTitle(title);
		// 			this._oDialogtask.open();
		// 		}
		// 	} else {

		// 		var id = this.getView().getModel("ToDoList").getProperty(oEvent.getSource().getBindingContextPath()).uuid;
		// 		var title = this.getView().getModel("ToDoList").getProperty(oEvent.getSource().getBindingContextPath()).todoListName;
		// 		var oModel = this.getView().getModel("ToDos");
		// 		jQuery.ajax({
		// 			type: "GET",
		// 			contentType: "application/json",
		// 			url: "http://localhost:8080/" + id + "/getAllTodos/",
		// 			success: function (data, textStatus) {
		// 				oModel.setData(data);
		// 				oModel.refresh(true);
		// 				console.log("Success");
		// 				if (!this._oDialogtask) {
		// 					Fragment.load({
		// 						name: "todolist.ToDoList.view.taskDialogue",
		// 						controller: this
		// 					}).then(function (oDialog) {
		// 						this._oDialogtask = oDialog;
		// 						this.getView().addDependent(oDialog);
		// 						this._oDialogtask.setTitle(title);
		// 						this._oDialogtask.open();
		// 					}.bind(this));

		// 				} else {
		// 					this._oDialogtask.setTitle(title);
		// 					this._oDialogtask.open();
		// 				}
		// 			},
		// 			error: function (error) {
		// 				console.log(error);
		// 			}.bind(this)
		// 		});

		// 	}

		// },
		// onAddTask: function (oEvent) {
		// 	var taskname = oEvent.getSource().getParent().mAggregations.items[0].getProperty("value");
		// 	var taskobj = {
		// 		"taskName": "Buy Milk",
		// 	};
		// 	jQuery.ajax({
		// 		type: "POST",
		// 		contentType: "application/json",
		// 		url: "http://localhost:8080/create",
		// 		data: JSON.stringify(taskobj),
		// 		success: function (data, textStatus) {
		// 			this.loadData();
		// 			this._oDialog.close();
		// 		},
		// 		error: function (error) {
		// 			this.loadData();
		// 			this._oDialog.close();
		// 		}.bind(this)
		// 	});

		// },
		onCancelPress: function (oEvent) {
			this._oDialog.getContent()[0].setValue('');
			this._oDialog.close();
			
		},
		test: function(val){return val;}
		// onCancelPressToDo: function (oEvent) {
		// 	this._oDialogtask.close();
		// }

	});
});