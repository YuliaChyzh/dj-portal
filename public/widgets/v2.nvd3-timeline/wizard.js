"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire(require("angular"));

// import 'widgets/nvd3-widget/nvd3-widget';

require("widgets/wizard/wizard");

require("widgets/v2.steps/edit-widget-id");

require("widgets/v2.nvd3-timeline/timeline-chart-decoration");

require("widgets/v2.nvd3-timeline/adapter");

var m = angular.module("app.widgets.v2.timeline-chart-wizard", [
// 'app.widgets.nvd3-widget',
"app.widgets.wizard", "app.widgets.v2.steps.edit-widget-id", "app.widgets.v2.steps.timeline-chart-decoration", "app.widgets.v2.timeline-chart-adapter"]);

m._wizard = undefined;

m.factory("TimelineChartWizard", ["$http", "$modal",
// "NVD3Widget",
"Wizard", "EditWidgetID", "TimelineChartDecoration", "parentHolder", "TimelineChartAdapter", function ($http, $modal,
// NVD3Widget,
Wizard, EditWidgetID, TimelineChartDecoration, parentHolder, TimelineChartAdapter) {
	if (!m._wizard) {
		m._wizard = new Wizard($modal).setTitle("Timeline Chart Settings Wizard").push(EditWidgetID).push(TimelineChartDecoration).onStart(function (wizard) {

			wizard.conf = angular.copy(wizard.parentScope.widget);
			//console.log("Start wizard", wizard.parentScope.widget)
		}).onCancel(function (wizard) {
			wizard.conf = {};
			wizard.context = {};
		}).onFinish(function (wizard) {
			//console.log("Finish wizard", wizard)
			wizard.parentScope.widget.instanceName = wizard.conf.instanceName;
			wizard.parentScope.widget.decoration = wizard.conf.decoration;
			wizard.parentScope.widget.serieDataId = wizard.conf.serieDataId;
			// wizard.parentScope.widget.queryID = wizard.conf.queryID;
			wizard.parentScope.widget.dataID = wizard.conf.dataID;

			wizard.parentScope.updateChart();

			wizard.conf = {};
			wizard.context = {};
			//console.log("Parentscope", wizard.parentScope.widget)
		});
	}
	return m._wizard;
}]);
//# sourceMappingURL=../v2.nvd3-timeline/wizard.js.map