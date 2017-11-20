"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire(require("angular"));

require("widgets/v2.nvd3-widget/nvd3-widget");

require("widgets/v2.nvd3-bar/adapter");

require("wizard-directives");

require("ngReact");

require("custom-react-directives");

require("ng-prettyjson");

require("ng-ace");

var m = angular.module("app.widgets.v2.steps.bar-chart-decoration", ["app.widgets.v2.nvd3-widget", "app.widgets.v2.bar-chart-adapter", "wizard-directives", "app.dps", "ng.ace"]);

m.factory("BarChartDecoration", ["$http", "$dps", "$q", "parentHolder", "BarChartAdapter", "pageWidgets", "i18n", "dialog", "$error", "dpsEditor", function ($http, $dps, $q, parentHolder, BarChartAdapter, pageWidgets, i18n, dialog, $error, dpsEditor) {

    return {
        id: "BarChartDecoration",

        title: "Chart Decoration",

        description: "Setup chart decoration options",

        html: "./widgets/v2.nvd3-bar/bar-chart-decoration.html",

        onStartWizard: function onStartWizard(wizard) {
            var _this = this;

            this.wizard = wizard;
            this.conf = {
                decoration: wizard.conf.decoration,
                dataID: wizard.conf.dataID,
                script: wizard.conf.script,
                queryID: wizard.conf.queryID,
                serieDataId: wizard.conf.serieDataId,
                optionsUrl: "./widgets/v2.nvd3-bar/options.json",
                dataUrl: "/api/data/script/",
                emitters: wizard.conf.emitters
            };

            this.queries = [{ $id: "eventSource", $title: "setData(updateWithData) event" }];

            pageWidgets().filter(function (item) {
                return item.type == "v2.query-manager";
            }).map(function (item) {
                return item.queries;
            }).forEach(function (item) {
                _this.queries = _this.queries.concat(item);
            });

            if (this.conf.queryID) {
                var thos = this;
                this.inputQuery = this.queries.filter(function (item) {
                    return item.$id == _this.conf.queryID;
                })[0].$title;
            }
        },

        onFinishWizard: function onFinishWizard(wizard) {
            this.conf.decoration.setColor = undefined;
            wizard.conf.decoration = this.conf.decoration;
            wizard.conf.serieDataId = this.conf.serieDataId;
            wizard.conf.queryID = this.conf.queryID;
            wizard.conf.dataID = this.conf.dataID;
            wizard.conf.emitters = this.conf.emitters;
            wizard.conf.script = this.conf.script;

            this.settings = { options: angular.copy(this.options), data: [] };
            this.conf = {};
        },

        onCancelWizard: function onCancelWizard(wizard) {
            this.settings = { options: angular.copy(this.options), data: [] };
            this.conf = {};
        },

        reversePalette: function reversePalette() {
            if (this.conf.decoration.color) {
                this.conf.decoration.color = this.conf.decoration.color.reverse();
            }
        },

        selectInputData: function selectInputData() {
            var thos = this;
            thos.wizard.context.postprocessedTable = undefined;
            var iq = this.queries.filter(function (item) {
                return item.$title == thos.inputQuery;
            })[0];
            this.conf.dataID = iq.context ? iq.context.queryResultId : undefined;
            this.conf.queryID = iq.$id;
            this.loadData();
        },

        loadOptions: function loadOptions() {
            return $http.get(this.conf.optionsUrl);
        },

        loadSeries: function loadSeries() {
            if (this.conf.dataID) {
                return $dps.post("/api/data/script", {
                    data: "source(table:'" + this.conf.dataID + "');bar();save()",
                    locale: i18n.locale()
                });
            }if (this.conf.script) {
                return $dps.post("/api/script", {
                    script: this.conf.script,
                    locale: i18n.locale()
                }).then(function (resp) {
                    if (resp.data.type == "error") {
                        $error(resp.data.data);
                        return;
                    };
                    return { data: resp };
                });
            }return $http.get("./widgets/v2.nvd3-bar/sample.json");
        },

        loadData: function loadData() {
            var thos = this;

            if (!this.wizard.context.postprocessedTable) {
                $dps.get("/api/data/process/" + this.conf.dataID).success(function (resp) {
                    thos.wizard.context.postprocessedTable = resp.value;
                });
            }

            this.optionsLoaded = //(this.optionsLoaded) ? this.optionsLoaded :
            this.loadOptions().then(function (options) {
                thos.options = options.data;
                if (!thos.conf.decoration) {
                    thos.conf.decoration = BarChartAdapter.getDecoration(thos.options);
                }

                thos.conf.decoration.setColor = function (palette) {
                    thos.conf.decoration.color = angular.copy(palette);
                };
                thos.options.chart.x = function (d) {
                    return d.label;
                };
                thos.options.chart.y = function (d) {
                    return d.value;
                };

                thos.conf.decoration.width = parentHolder(thos.wizard.conf).width;

                //             thos.conf.decoration.title = thos.dataset.dataset.label;
                // thos.conf.decoration.subtitle = thos.dataset.dataset.source;
                // thos.conf.decoration.caption = 'Note:'+ thos.dataset.dataset.note;
                // thos.conf.decoration.xAxisName = thos.dataset.dataset.label;
                // thos.conf.decoration.yAxisName = thos.dataset.dataset.label;
            });
            this.dataLoaded = //(this.dataLoaded) ? this.dataLoaded :
            this.loadSeries().then(function (resp) {
                if (resp) {
                    // console.log(resp)
                    thos.data = resp.data.data.data;
                    thos.conf.serieDataId = resp.data.data.data_id;
                }
            });

            $q.all([this.optionsLoaded, this.dataLoaded]).then(function () {
                thos.apply();
            });
        },

        activate: function activate(wizard) {
            // this.dataset = wizard.context.dataset;
            // if (this.conf.dataID) {
            this.loadData();
            // }
        },

        editScript: function editScript() {
            var thos = this;
            dpsEditor(thos.conf.script).then(function (script) {
                thos.conf.script = script;
                thos.loadData();
            });
        },

        apply: function apply() {
            this.conf.decoration.width = parentHolder(this.wizard.conf).width;
            BarChartAdapter.applyDecoration(this.options, this.conf.decoration);
            this.settings = { options: angular.copy(this.options), data: angular.copy(this.data) };
        }
    };
}]);
//# sourceMappingURL=../v2.nvd3-bar/bar-chart-decoration.js.map