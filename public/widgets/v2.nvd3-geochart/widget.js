"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire(require("angular"));

require("widgets/v2.nvd3-widget/nvd3-widget");

require("widgets/v2.nvd3-geochart/wizard");

require("widgets/v2.nvd3-geochart/adapter");

var m = angular.module("app.widgets.v2.nvd3-geochart", ["app.widgets.v2.nvd3-widget", "app.widgets.v2.geochart-wizard", "app.widgets.v2.geochart-adapter"]);

m.controller("Nvd3GeochartCtrlV2", ["$scope", "NVD3WidgetV2", "GeochartWizard", "GeochartAdapter", "i18n", function ($scope, NVD3WidgetV2, GeochartWizard, GeochartAdapter, i18n) {

  new NVD3WidgetV2($scope, {
    wizard: GeochartWizard,
    decorationAdapter: GeochartAdapter,
    optionsURL: "/widgets/v2.nvd3-geochart/options.json",
    acceptData: function acceptData(context) {
      return context.key == "geochart";
    },
    serieAdapter: {
      tooltipContent: function tooltipContent(serie, x, y, s) {
        var locale = i18n.locale();
        var name = serie.properties.name[locale] ? serie.properties.name[locale] : serie.properties.name.en;
        var result = "<center><b>" + name + "</center></b>";
        if (serie.properties.values && serie.properties.values[y.index()].c >= 0) {
          result += "<div style=\"font-size:smaller;padding: 0 0.5em;\"> " + y.series[y.index()].key + " : " + serie.properties.values[y.index()].v + "</div>";
        }
        return result;
      },

      getSeriesSelection: function getSeriesSelection(data) {
        // console.log(data)
        return data[0].series.map(function (s) {
          return { key: s.key, disabled: false };
        });
      },

      getObjectsSelection: function getObjectsSelection(data) {
        var r = [];
        data[0].features.forEach(function (s) {
          r.push({ key: s.properties.name, disabled: true });
        });

        var result = [];
        r.forEach(function (item) {
          var notExists = true;
          result.forEach(function (v) {
            notExists &= item.key != v.key;
          });
          if (notExists == true) result.push(item);
        });
        return result;
      }
    }
  });
}]);
//# sourceMappingURL=../v2.nvd3-geochart/widget.js.map