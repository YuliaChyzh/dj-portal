"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire(require("angular"));

require("widgets/data-util/dps");

var m = angular.module("app.widgets.v2.steps.line-post-process", ["app.widgets.data-util.dps"]);

m.factory("LinePostProcess", ["$http", "Requestor", function ($http, Requestor) {
  return {

    title: "Postprocessing",

    description: "View data and setup data postprocessing",

    html: "./widgets/v2.steps/line-post-process.html",

    onStartWizard: function onStartWizard(wizard) {
      this.wizard = wizard;
      this.postprocessSettings = wizard.conf.postprocessSettings;
      if (angular.isUndefined(this.postprocessSettings)) {
        this._initSettings();
        this.wizard.process(this);
        return;
      }
      this.wizard.complete(this);
    },

    onFinishWizard: function onFinishWizard(wizard) {
      wizard.conf.postprocessSettings = this.postprocessSettings;
      wizard.conf.postprocess = {
        data_id: this.queryResultId,
        params: {
          normalized: this.postprocessSettings.normalize,
          mode: this.postprocessSettings.mode,
          direction: this.postprocessSettings.direction,
          precision: this.postprocessSettings.precision
        },
        proc_name: "normalizer",
        response_type: "data"
      };
    },

    range: function range(min, max) {
      var result = [];
      for (var i = min; i <= max; i++) result.push(i);

      return result;
    },

    getValue: function getValue(value) {
      return value == null ? "-" : value;
    },

    enable: function enable(wizard) {},

    disable: function disable(wizard) {
      wizard.postprocessSettings = undefined;
    },

    _initSettings: function _initSettings() {
      // console.log("BEFORE INIT", this.wizard.postprocessSettings)
      this.postprocessSettings = {};
      this.postprocessSettings.normalize = false;
      this.postprocessSettings.direction = "Columns";
      this.postprocessSettings.mode = "Range to [0,1]";
      this.postprocessSettings.precision = 2;
      this.postprocessSettings.useColumnMetadata = [];
      this.postprocessSettings.useRowMetadata = [];
      this.postprocessSettings.axisX = -1;

      // console.log("INIT", this.postprocessSettings)
    },

    makeAxisXList: function makeAxisXList(table) {
      var result = [];
      table.body[0].metadata.forEach(function (item, index) {
        result.push({
          index: -index - 1,
          label: item.dimensionLabel
        });
      });
      table.header.forEach(function (column, index) {
        var label = "";
        column.metadata.forEach(function (item) {
          label = label == "" ? item.label : label + ", " + item.label;
        });
        result.push({
          index: index,
          label: label
        });
      });
      this.axisXColumn = result[0].label;
      this.postprocessSettings.axisX = result[0].index;

      return result;
    },

    selectAxisX: function selectAxisX() {
      var thos = this;
      this.postprocessSettings.axisX = this.axisXList.filter(function (item) {
        return item.label == thos.axisXColumn;
      })[0].index;
    },

    activate: function activate(wizard) {
      this.wizard.process(this);
      this.query = wizard.conf.query;
      this.postprocessSettings = wizard.conf.postprocessSettings;

      if (angular.isUndefined(this.postprocessSettings)) {
        this._initSettings();
        this.wizard.process(this);
      }

      var thos = this;
      // console.log(this.query);
      this.response = undefined;

      new Requestor().push("getQueryResult", function (requestor, value) {
        $http.post("./api/data/process/", thos.query).success(function (data) {
          // thos.response = data;
          thos.queryResultId = data.data_id;
          // thos.postprocessSettings.useColumnMetadata = data.data.header[0].metadata.map(function(item){return true});
          // thos.postprocessSettings.useRowMetadata = data.data.body[0].metadata.map(function(item){return true});
          requestor.resolve(thos.queryResultId);
        });
      }).push("postProcess", function (requestor, data_id) {
        $http.post("./api/data/process/", {
          data_id: data_id,
          params: {
            normalized: thos.postprocessSettings.normalize || false,
            mode: thos.postprocessSettings.mode,
            direction: thos.postprocessSettings.direction,
            precision: thos.postprocessSettings.precision
          },
          proc_name: "post-process",
          response_type: "data"
        }).success(function (data) {
          thos.response = data;
          thos.postprocessDataId = data.data_id;
          thos.postprocessSettings.useColumnMetadata = thos.postprocessSettings.useColumnMetadata.length == 0 ? thos.response.data.header[0].metadata.map(function (item) {
            return true;
          }) : thos.postprocessSettings.useColumnMetadata;
          thos.postprocessSettings.useRowMetadata = thos.postprocessSettings.useRowMetadata.length == 0 ? thos.response.data.body[0].metadata.map(function (item) {
            return true;
          }) : thos.postprocessSettings.useRowMetadata;

          thos.axisXList = thos.makeAxisXList(thos.response.data);
          requestor.resolve();
        });
      }).execute(null, function (data) {
        thos.wizard.complete(thos);
      });
    },

    getSelectedItemsCount: function getSelectedItemsCount(collection) {
      return collection.filter(function (item) {
        return item == true;
      }).length;
    },

    apply: function apply() {
      this.wizard.process(this);
      // console.log(this.postprocessSettings)

      if (this.postprocessSettings.normalize == true) {
        this.response = undefined;
        var thos = this;
        $http.post("./api/data/process/", {
          data_id: this.queryResultId,
          params: {
            normalized: this.postprocessSettings.normalize || false,
            mode: this.postprocessSettings.mode,
            direction: this.postprocessSettings.direction,
            precision: this.postprocessSettings.precision
          },
          proc_name: "post-process",
          response_type: "data"
        }).success(function (data) {
          thos.response = data;
          thos.postprocessDataId = data.data_id;
          thos.wizard.complete(thos);
        });
      } else {
        this.activate(this.wizard);
      }
    }

  };
}]);

// console.log("Enable Postprocess")
//# sourceMappingURL=../v2.steps/line-post-process.js.map