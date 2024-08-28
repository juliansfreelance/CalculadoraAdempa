const chartProceduresModule = {
   chartProcedures: function (veeva) {
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });

      const ctx = document.getElementById('chartProcedures').getContext('2d');
      const names = veeva.calculadora.chartOptions.chartProcedures.names;
      const valoresProcedures = veeva.calculadora.chartOptions.chartProcedures.valores;

      const valorMinimoProc = Math.min(...valoresProcedures);
      const valorMaximoProc = Math.max(...valoresProcedures);

      const valorMinimoDigitosProc = parseInt(valorMinimoProc).toString().length;
      const valorMaximoDigitosProc = parseInt(valorMaximoProc).toString().length;

      const min = Math.round(((valorMinimoProc - parseInt('1' + '0'.repeat(valorMinimoDigitosProc - 1))) / parseInt('1' + '0'.repeat(valorMinimoDigitosProc - 1)))) * parseInt('1' + '0'.repeat(valorMinimoDigitosProc - 1));
      const max = Math.round(((parseInt('1' + '0'.repeat(valorMaximoDigitosProc - 2)) + valorMaximoProc) / parseInt('1' + '0'.repeat(valorMaximoDigitosProc - 2)))) * parseInt('1' + '0'.repeat(valorMaximoDigitosProc - 2));

      Chart.defaults.font.family = "'FSAlbert'";
      const chartProcedures = new Chart(ctx, {
         type: veeva.calculadora.chartOptions.chartProcedures.type,
         data: {
            labels: names,
            datasets: [{
               label: veeva.calculadora.chartOptions.chartProcedures.title,
               data: valoresProcedures,
               backgroundColor: veeva.calculadora.chartOptions.colorsOpacity,
               borderColor: veeva.calculadora.chartOptions.colors,
               borderWidth: veeva.calculadora.chartOptions.borderWidth,
            }]
         },
         options: {
            indexAxis: 'x',
            scales: {
               y: {
                  min: min,
                  max: max,
               },
               x: {
                  ticks: {
                  font: {
                     style: veeva.calculadora.chartOptions.title.font.style,
                     weight: veeva.calculadora.chartOptions.title.font.weight,
                  }},
               }
            },
            plugins: {
               datalabels: {
                  anchor: 'end',
                  align: 'end',
                  formatter: (value, context) => {
                     let formato = `$ ${FORMAT_ENTERO(value).format()}`;
                     return formato;
                  },
                  color: veeva.calculadora.chartOptions.colors,
                  font: {
                     family: veeva.calculadora.chartOptions.title.font.family,
                     size: 12,
                     style: veeva.calculadora.chartOptions.title.font.style,
                     weight: veeva.calculadora.chartOptions.title.font.weight,
                  }
               },
               legend: {
                  display: false,
               },
               title: {
                  display: true,
                  text: veeva.calculadora.chartOptions.chartProcedures.title,
                  color: veeva.calculadora.chartOptions.title.color,
                  font: {
                     family: veeva.calculadora.chartOptions.title.font.family,
                     size: veeva.calculadora.chartOptions.title.font.size,
                     style: veeva.calculadora.chartOptions.title.font.style,
                     weight: veeva.calculadora.chartOptions.title.font.weight,
                     lineHeight: veeva.calculadora.chartOptions.title.font.lineHeight,
                  }
               },
               tooltip: {
                  callbacks: {
                     label: function (context) {
                        return `  $ ${FORMAT_ENTERO(context.raw).format()}`;
                     }
                  }
               }
            },
         },
         plugins: [ChartDataLabels]
      });
   }
};

export default chartProceduresModule;
