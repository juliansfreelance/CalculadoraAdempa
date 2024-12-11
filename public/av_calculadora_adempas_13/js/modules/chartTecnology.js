const chartTecnologyModule = {
   chartTecnology: function (veeva) {
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });

      const ctx = document.getElementById('chartTecnology').getContext('2d');
      const names = veeva.calculadora.chartOptions.chartTecnology.names;
      const valoresTecnology = veeva.calculadora.chartOptions.chartTecnology.valores;

      const valorMinimoTec = Math.min(...valoresTecnology);
      const valorMaximoTec = Math.max(...valoresTecnology);

      const valorMinimoDigitosTec = parseInt(valorMinimoTec).toString().length;
      const valorMaximoDigitosTec = parseInt(valorMaximoTec).toString().length;

      const min = Math.round(((valorMinimoTec - parseInt('1' + '0'.repeat(valorMinimoDigitosTec - 1))) / parseInt('1' + '0'.repeat(valorMinimoDigitosTec - 1)))) * parseInt('1' + '0'.repeat(valorMinimoDigitosTec - 1));
      const max = Math.round(((parseInt('1' + '0'.repeat(valorMaximoDigitosTec - 1)) + valorMaximoTec) / parseInt('1' + '0'.repeat(valorMaximoDigitosTec - 1)))) * parseInt('1' + '0'.repeat(valorMaximoDigitosTec - 1));

      Chart.defaults.font.family = "'FSAlbert'";
      const chartTecnology = new Chart(ctx, {
         type: veeva.calculadora.chartOptions.chartTecnology.type,
         data: {
            labels: names,
            datasets: [{
               label: veeva.calculadora.chartOptions.chartTecnology.title,
               data: valoresTecnology,
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
                  text: veeva.calculadora.chartOptions.chartTecnology.title,
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

export default chartTecnologyModule;
