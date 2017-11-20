"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire(require("angular"));

var m = angular.module("app.widgets.v2.scatter-chart-adapter", []);
m.service("NVD3ScatterAdapter", function () {

  this.onSelectSerie = function (selection, settings, api) {
    var data = d3.select(api.getSVG()).data();
    settings.data.forEach(function (s) {
      var f = selection.filter(function (l) {
        return l.key == s.key;
      })[0];
      if (f) {
        s.disabled = f.disabled;
      }
    });
    return settings;
  };

  this.applyDecoration = function (options, decoration, selector, api) {
    if (angular.isDefined(decoration) && angular.isDefined(options)) {
      options.chart.height = decoration.height;
      options.title.text = decoration.title;
      options.subtitle.text = decoration.subtitle;
      options.caption.text = decoration.caption;
      options.chart.xAxis.axisLabel = decoration.xAxisName;
      options.chart.yAxis.axisLabel = decoration.yAxisName;
      options.chart.xAxis.staggerLabels = decoration.staggerLabels;
      options.chart.rotateLabels = decoration.xAxisAngle;
      options.chart.reduceXTicks = decoration.reduceXTicks;
      options.chart.isArea = decoration.isArea;
      options.chart.color = decoration.color ? decoration.color : null;
      options.chart.scatter.label = decoration.showLabels ? function (d) {
        return d.label;
      } : undefined;
      options.chart.showRadiusVector = decoration.radiusVector;
      if (decoration.enableEmitEvents) {
        options.chart.legend.dispatch = {
          stateChange: function stateChange(e) {
            selector.selectSerie(e.disabled);
          }
        };
      }
    }
    return options;
  };

  this.getDecoration = function (options) {
    if (angular.isDefined(options)) {
      var decoration = {};
      decoration.height = options.chart.height;
      decoration.title = options.title.text;
      decoration.subtitle = options.subtitle.text;
      decoration.caption = options.caption.text;
      decoration.xAxisName = options.chart.xAxis.axisLabel;
      decoration.yAxisName = options.chart.yAxis.axisLabel;
      decoration.xAxisAngle = options.chart.rotateLabels;
      decoration.reduceXTicks = options.chart.reduceXTicks;
      decoration.staggerLabels = options.chart.xAxis.staggerLabels;
      decoration.isArea = options.chart.isArea;
      decoration.color = options.chart.color;
      decoration.radiusVector = options.chart.showRadiusVector;
      decoration.showLabels = angular.isDefined(options.chart.scatter.label);
      return decoration;
    }
  };
});
//# sourceMappingURL=../v2.nvd3-scatter/adapter.js.map