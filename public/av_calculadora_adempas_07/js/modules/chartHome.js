const chartHomeModule = {
   chartIni: function (veeva) {
      const ctx = document.getElementById('chartHome').getContext('2d');
      const names = veeva.calculadora.chartOptions.chartHome.names;
      const valores = veeva.calculadora.chartOptions.chartHome.valores;

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
                  min: 0,
                  max: 65,
                  ticks: {
                     stepSize: 5,
                  }
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
