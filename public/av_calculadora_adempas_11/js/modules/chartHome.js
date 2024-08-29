const chartHomeModule = {
   chartIni: function (veeva) {
      const ctx = document.getElementById('chartHome').getContext('2d');
      const names = veeva.calculadora.chartOptions.chartHome.names;
      const valores = veeva.calculadora.chartOptions.chartHome.valores;

      const valorMinimo = Math.min(...valores);
      const valorMaximo = Math.max(...valores);

      
      const valorMinimoDigitos = parseInt(valorMinimo).toString().length;
      const valorMaximoDigitos = parseInt(valorMaximo).toString().length;

      const min = Math.round(((valorMinimo - parseInt('1' + '0'.repeat(valorMinimoDigitos - 1))) / parseInt('1' + '0'.repeat(valorMinimoDigitos - 1)))) * parseInt('1' + '0'.repeat(valorMinimoDigitos - 1));
      const max = Math.round(((parseInt('1' + '0'.repeat(valorMaximoDigitos - 1)) + valorMaximo) / (parseInt('1' + '0'.repeat(valorMaximoDigitos - 1)))) * parseInt('1' + '0'.repeat(valorMaximoDigitos - 1)) + 5);


      Chart.defaults.font.family = "'FSAlbert'";
      const chartHome = new Chart(ctx, {
         type: veeva.calculadora.chartOptions.chartHome.type,
         data: {
            labels: names,
            datasets: [{
               label: veeva.calculadora.chartOptions.chartHome.title,
               data: valores,
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
                     const categorias = ['bajo', 'intermedio', 'alto'];
                     let formato = `${value}% - ${veeva.calculadora.estadificacionCategoria[categorias[context.datasetIndex]]}`;
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
                  text: veeva.calculadora.chartOptions.chartHome.title,
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
                        const categorias = ['bajo', 'intermedio', 'alto'];
                        let formato = `  ${context.raw}% - ${veeva.calculadora.estadificacionCategoria[categorias[context.datasetIndex]]}`;
                        return formato;
                     }
                  }
               }
            },
         },
         plugins: [ChartDataLabels]
      });
   }
};

export default chartHomeModule;
