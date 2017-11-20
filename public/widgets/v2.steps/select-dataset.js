"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire(require("angular"));

var m = angular.module("app.widgets.v2.steps.select-dataset", ["ngFileUpload", "app.dps"]);

m.factory("SelectDataset", ["$upload", "$http", "$dps", "$timeout", "$lookup", "$translate", function ($upload, $http, $dps, $timeout, $lookup, $translate) {
  return {

    id: "SelectDataset",

    title: "Dataset",

    description: "Select or upload dataset",

    html: "./widgets/v2.steps/select-dataset.html",

    formatDate: function formatDate(date) {
      var locale = $translate.use() || "en";
      date = new Date(date);
      date = date.toLocaleString(locale, { year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      });
      return date;
    },

    lookup: $lookup,

    onStartWizard: function onStartWizard(wizard) {
      this.wizard = wizard;
      this.conf = {};
      wizard.process(this);
      //  this.wizard = wizard;

      //  this.conf = (wizard.conf) ? {
      //      datasetID : wizard.conf.datasetID,
      //      dataset : wizard.conf.dataset
      //    } : {}

      //  wizard.context.datasetID = this.conf.datasetID;
      //  wizard.context.dataset = this.conf.dataset;

      // if( angular.isUndefined(this.conf.dataset)){
      //  		wizard.process(this);
      //  	}else{
      //      wizard.complete(this);
      //    }
    },

    onFinishWizard: function onFinishWizard(wizard) {},

    updateDatasetList: function updateDatasetList() {
      var thos = this;
      this.pending = true;
      $dps.post("/api/metadata/items").success(function (data) {
        thos.datasets = data;
        thos.pending = false;
      }).error(function (data, status) {
        $window.alert("$http error " + status + " - cannot load data");
      });
    },

    select: function select(dataset) {
      // console.log("SELECT", this.wizard);
      if (!this.datasets || !dataset) {
        return;
      }this.datasets.forEach(function (item) {
        item.selected = false;
      });
      dataset.selected = true;
      this.conf.dataset = dataset;
      this.conf.datasetID = dataset.dataset.commit.id;
      this.wizard.context.datasetID = this.conf.datasetID;
      this.wizard.context.dataset = this.conf.dataset;
      this.wizard.complete(this);
    },

    activate: function activate(wizard) {
      this.conf.dataset = wizard.context.dataset;
      this.updateDatasetList();
    }
  };
}]);

// wizard.conf.datasetID = this.conf.datasetID;
// this.conf = {};
//# sourceMappingURL=../v2.steps/select-dataset.js.map