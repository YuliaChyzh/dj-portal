"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire(require("angular"));

require("widgets/v2.nvd3-widget/nvd3-widget");

require("widgets/v2.nvd3-gantt/wizard");

require("widgets/v2.nvd3-gantt/adapter");

var m = angular.module("app.widgets.v2.nvd3-gantt", ["app.widgets.v2.nvd3-widget", "app.widgets.v2.gantt-chart-wizard", "app.widgets.v2.gantt-chart-adapter"]);

m.controller("Nvd3GanttChartCtrlV2", ["$scope", "NVD3WidgetV2", "GanttChartWizard", "GanttChartAdapter", function ($scope, NVD3WidgetV2, GanttChartWizard, GanttChartAdapter) {

  // var taskTree = [{"id":"B","title":"Мінімізація гальмуючих факторів для соціо-економічного розвитку України","start":"2016","note":"Послідовність дій влади, спрямованих на мінімізацію Топ-5 гальмуючих факторів для соціо-економічного розвитку України на часовому відрізку 2016-2020 роки","timeDomain":[2015,2024],"index":0,"taskCount":16,"childs":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"isOpen":1,"parents":[]},{"id":"B.1","title":"Частка тіньової економіки  (% від ВВП)","start":"2016","income":[{"x":2015,"y":48,"marker":"48%","index":1,"type":"income"},{"x":2016,"y":47,"index":1,"type":"income"},{"x":2020,"y":70,"marker":"70% (Графік прибутків для прикладу)","index":1,"type":"income"},{"x":2024,"y":70,"index":1,"type":"income"}],"expenditure":[{"x":2015,"y":0.52,"marker":"52%","index":1,"type":"expenditure"},{"x":2016,"y":0.47,"index":1,"type":"expenditure"},{"x":2020,"y":0.25,"marker":"Очікувана в 2020р. частка тіньової економіки 25%","index":1,"type":"expenditure"},{"x":2024,"y":0.25,"index":1,"type":"expenditure"}],"timeDomain":[2015,2024],"index":1,"taskCount":3,"childs":[2,3],"isOpen":1,"parents":[0]},{"id":"B.1.1","title":"Реформування податкової системи","start":"2016","end":"2017","note":"Для стрімкого росту економіки України, податок на прибуток для фізичних осіб має бути встановлено за прогресивною шкалою в діапазоні від 5% для низьких прибутків до 17% для високих. Для юридичних осіб – в діапазоні 15%-17%. Податок з обороту – в діапазоні 3%-5%. Податок від доходів, пов’язаних з володінням нерухомістю має бути встановлено за ставкою, що не перевищує 15%. ПДВ має бути скасовано. Лібералізація податкової системи має проводитися одночасно з підвищенням відповідальності фізичних і юридичних осіб за порушення податкового законодавства.","timeDomain":[2015,2024],"index":2,"taskCount":1,"childs":[],"parents":[0,1]},{"id":"B.1.2","title":"Перехід до цивілізованого ринку землі","start":"2020","causes":[{"src":{"x":2017,"task":2},"target":{"x":2020,"task":3}},{"src":{"x":2017,"task":5},"target":{"x":2020,"task":3}},{"src":{"x":2017,"task":6},"target":{"x":2020,"task":3}},{"type":"+","src":{"x":2018,"task":12,"type":"+"},"target":{"x":2021,"task":3,"type":"+"}}],"note":"Оскільки ринок землі в сучасній Україні є тіньовим і непрозорим, ця обставина призводить до вилучення з національної економіки від 15% до 20% від ВВП. Олігархічний, латіффундістский устрій аграрного сектора України, який сконцентрував десятки і сотні тисяч гектарів землі, не дає можливості розвитку малим і середнім фермерським господарствам (ділянки землі від декількох гектарів до декількох сотень гектарів). Він унеможливлює конкуренцію і перехід аграрного сектора України на високотехнологічні уклади задля виробництва продуктів харчування високих ступеней переробки. Ці обставини впритул наблизили Україну до переходу на цивілізований, підконтрольний державі і прозорий для громадянського суспільства, ринку землі. Такий перехід, який для умов України може продовжуватися в часі від 5 до 15 років, потребує системного вирішення ряду нових проблем: створення локальної фінансово кредитної системи для АПК, включаючи земельний банк; створення системи страхування для АПК; за прикладом Японії, підтримки малих і середніх фермерських господарств, діяльність яких має координуватися кооперативними утвореннями; перехід АПК на вищі технологічні уклади з метою виробництва якісних продуктів харчування високих ступеней переробки.","timeDomain":[2015,2024],"index":3,"taskCount":1,"childs":[],"isOpen":true,"parents":[0,1]},{"id":"B.2","title":"Масштаб корупції (% від ВВП)","start":"2016","end":"2017","expenditure":[{"x":2015,"y":0.14,"index":4,"type":"expenditure"},{"x":2016,"y":0.13,"index":4,"type":"expenditure"},{"x":2020,"y":0.04,"index":4,"type":"expenditure"},{"x":2024,"y":0.04,"index":4,"type":"expenditure"}],"timeDomain":[2015,2024],"index":4,"taskCount":4,"childs":[5,6,7],"isOpen":0,"parents":[0]},{"id":"B.2.1","title":"Масштабна лібералізація економіки","start":"2016","end":"2017","note":"скасування більшості узгоджувальних інстанцій в економіці і суспільстві, зменшення кількості службовців цих ланок від 30% до 40%.","timeDomain":[2015,2024],"index":5,"taskCount":1,"childs":[],"parents":[0,4]},{"id":"B.2.2","title":"Введення відкритих електронних форм звітності","start":"2016","end":"2017","note":"Введення відкритих в інформаційному просторі електронних форм звітності стосовно прибутків та видатків державних службовців, близьких членів їх сімей та осіб, що до них прирівнюються.","timeDomain":[2015,2024],"index":6,"taskCount":1,"childs":[],"parents":[0,4]},{"id":"B.2.3","title":"Посилення відповідальності за ухилення від публічної звітності","start":"2016","end":"2017","note":"Посилення відповідальності за ухилення від публічної звітності про отримані прибутки та здійснені видатки для осіб, що пов’язані з державною службою, для близьких членів їх сімей, або до осіб, що до них прирівнюються.","timeDomain":[2015,2024],"index":7,"taskCount":1,"childs":[],"parents":[0,4]},{"id":"B.3","title":"Пенсійне навантаження на бюджет (% від ВВП)","start":"2016","end":"2019","expenditure":[{"x":2015,"y":0.04,"index":8,"type":"expenditure"},{"x":2016,"y":0.041,"index":8,"type":"expenditure"},{"x":2020,"y":0.021,"index":8,"type":"expenditure"},{"x":2024,"y":0.021,"index":8,"type":"expenditure"}],"timeDomain":[2015,2024],"index":8,"taskCount":2,"childs":[9],"isOpen":0,"parents":[0]},{"id":"B.3.1","title":"Введення паралельно з солідарною пенсійною системою накопичувальної пенсійної системи","start":"2016","end":"2019","note":"Введення паралельно з солідарною пенсійною системою накопичувальної пенсійної системи та створення фінансових інститутів (можливо з участю іноземних учасників) для гарантування та страхування накопичуваних пенсійних вкладів населення.","timeDomain":[2015,2024],"index":9,"taskCount":1,"childs":[],"parents":[0,8]},{"id":"B.4","title":"Обслуговування державного боргу   (% від ВВП)","start":"2016","end":"2018","expenditure":[{"x":2015,"y":0.0869,"index":10,"type":"expenditure"},{"x":2016,"y":0.074,"index":10,"type":"expenditure"},{"x":2020,"y":0.029,"index":10,"type":"expenditure"},{"x":2024,"y":0.029,"index":10,"type":"expenditure"}],"timeDomain":[2015,2024],"index":10,"taskCount":3,"childs":[11,12],"isOpen":0,"parents":[0]},{"id":"B.4.1","title":"Укладання з кредиторами договорів про зміну умов боргу","start":"2016","end":"2017","note":"Для послаблення боргового тиску на бюджет та платіжний баланс, а також створення умов для економічного зростання, виконавчим органам влади доцільно досягти укладання з кредиторами договорів про зміну умов боргу на умовах зниження виплат та обміну боргових зобов’язань країни на її активи;","timeDomain":[2015,2024],"index":11,"taskCount":1,"childs":[],"parents":[0,10]},{"id":"B.4.2","title":"Реструктуризація державної заборгованості","start":"2016","end":"2018","note":"Шляхом досягнення домовленостей з міжнародними кредиторами необхідно забезпечити реструктуризацію державної заборгованості з її концентрацією на внутрішні кредитні ресурси, довгострокові позики із фіксованими відсотковими ставками, суттєве зменшення гарантованих державою боргів, збереження оптимальних рівнів заборгованості відносно ВВП, використання державних запозичень на інвестування з метою розвитку національної економіки та орієнтацію на фінансування активних державних видатків","timeDomain":[2015,2024],"index":12,"taskCount":1,"childs":[],"parents":[0,10]},{"id":"B.5","title":"Енергомісткість ВВП України  (кг.н.е./дол. США)","start":"2016","end":"2020","expenditure":[{"x":2015,"y":0.338,"index":13,"type":"expenditure"},{"x":2016,"y":0.328,"index":13,"type":"expenditure"},{"x":2020,"y":0.18,"index":13,"type":"expenditure"},{"x":2024,"y":0.18,"index":13,"type":"expenditure"}],"timeDomain":[2015,2024],"index":13,"taskCount":3,"childs":[14,15],"isOpen":0,"parents":[0]},{"id":"B.5.1","title":"Зменшення енергоємності ВВП","start":"2016","end":"2020","causes":[{"type":"-","src":{"x":2016,"task":15,"type":"-"},"target":{"x":2019,"task":14,"type":"-"}}],"note":"Для зменшення енергоємності ВВП в Україні і, як наслідок, зниження собівартості продукції та підвищення її конкурентоздатності в державі необхідно  здійснити  низку дій за  такими  напрямами [Б. В. Слупський, завдання впровадження Європейських норм і стандартів з Енергоефективності та Енергозбереження в Україні, Механізми державного    управління, 2010, с. 97-99]:","timeDomain":[2015,2024],"index":14,"taskCount":1,"childs":[],"parents":[0,13]},{"id":"B.5.2","title":"Перехід   економіки  на \"інтелектуальні\"  технології","start":"2016","end":"2020","causes":[{"type":"+","src":{"x":2016,"task":14,"type":"+"},"target":{"x":2019,"task":15,"type":"+"}}],"note":"Поступовий  перехід  української  економіки  на \"інтелектуальні\"  технології  (комп'ютерні,  телекомунікаційні, біогенні та ін.) як менш енергоємні,  більш високорентабельні і екологічно чисті.","timeDomain":[2015,2024],"index":15,"taskCount":1,"childs":[],"parents":[0,13]}]

  // var options = {
  //                   "chart": {
  //                     "type": "gantt",
  //                     "height": 750,
  //                     "width": 950,
  //                     "margin": {
  //                       "top": 20,
  //                       "right": 40,
  //                       "bottom": 40,
  //                       "left": 20
  //                     }
  //                   }
  //                 } 

  //   $scope.settings = {
  //     data:taskTree, "options":options
  //   }

  // console.log("GANTT", $scope.settings)
  new NVD3WidgetV2($scope, {
    wizard: GanttChartWizard,
    decorationAdapter: GanttChartAdapter,
    optionsURL: "/widgets/v2.nvd3-gantt/options.json",
    serieAdapter: {
      getSeriesSelection: function getSeriesSelection(data) {
        return [];
      },

      getObjectsSelection: function getObjectsSelection(data) {
        return [];
      },

      getSeries: function (data) {
        var result = data.map(function (item) {
          return item;
        });
        result.forEach(function (item) {
          if (item.end == null) delete item.end;
          if (item.note == null) delete item.note;

          if (item.income == null) {
            delete item.income;
          } else {
            item.income.forEach(function (p) {
              if (p.marker == null) delete p.marker;
            });
          }

          if (item.expenditure == null) {
            delete item.expenditure;
          } else {
            item.expenditure.forEach(function (p) {
              if (p.marker == null) delete p.marker;
            });
          }

          if (item.causes == null) {
            delete item.causes;
          } else {
            item.causes.forEach(function (p) {
              if (p.type == null) {
                delete p.type;
                delete p.src.type;
                delete p.target.type;
              }
            });
          }
        });
        return result;
      }
      //getX:function(d){return d.label},
      //getY:function(d){return d.value}
      // tooltipContent: function (serie, x, y, s) {
      //   return "<center><b>" + s.point.label + "</b><br/>" + s.series.key + " : " + s.point.value.toFixed(2) + "</center>"
      // }
    }
  });
}]);
//# sourceMappingURL=../v2.nvd3-gantt/widget.js.map