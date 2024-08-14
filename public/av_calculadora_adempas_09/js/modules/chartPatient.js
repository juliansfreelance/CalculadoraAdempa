const chartPatientModule = {
   chartPatient: function (veeva) {
      const FORMAT_ENTERO = value => currency(value, { precision: 0, symbol: '', decimal: ',', separator: '.' });

      const ctx = document.getElementById('chartPatient').getContext('2d');
      const names = veeva.calculadora.chartOptions.chartPatient.names;
      const valoresPatient = veeva.calculadora.chartOptions.chartPatient.valores;

      const valorMinimoPatient = Math.min(...valoresPatient);
      const valorMaximoPatient = Math.max(...valoresPatient);

      const valorMinimoDigitosPatient = parseInt(valorMinimoPatient).toString().length;
      const valorMaximoDigitosPatient = parseInt(valorMaximoPatient).toString().length;

      const min = Math.round(((valorMinimoPatient - parseInt('1' + '0'.repeat(valorMinimoDigitosPatient - 1))) / parseInt('1' + '0'.repeat(valorMinimoDigitosPatient - 1)))) * parseInt('1' + '0'.repeat(valorMinimoDigitosPatient - 1));
      const max = Math.round(((parseInt('1' + '0'.repeat(valorMaximoDigitosPatient - 1)) + valorMaximoPatient) / parseInt('1' + '0'.repeat(valorMaximoDigitosPatient - 1)))) * parseInt('1' + '0'.repeat(valorMaximoDigitosPatient - 1));

      Chart.defaults.font.family = "'FSAlbert'";
      const chartPatient = new Chart(ctx, {
         type: veeva.calculadora.chartOptions.chartPatient.type,
         data: {
            labels: names,
            datasets: [{
               label: veeva.calculadora.chartOptions.chartPatient.title,
               data: valoresPatient,
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
                  text: veeva.calculadora.chartOptions.chartPatient.title,
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

export default chartPatientModule;
