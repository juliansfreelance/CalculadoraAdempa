const chartHomeModule = {
   chartIni: function (veeva) {
      const ctx = document.getElementById('chartHome').getContext('2d');
      const names = ['Estadificación riesgo Bajo', 'Estadificación riesgo Intermedio', 'Estadificación riesgo Alto'];
      const valores = [veeva.calculadora.estadificacionPacientes.bajo, veeva.calculadora.estadificacionPacientes.intermedio, veeva.calculadora.estadificacionPacientes.alto];

      console.log(veeva);

      Chart.defaults.font.family = "'FSAlbert'";
      const chartHome = new Chart(ctx, {
         type: 'bar',
         data: {
            labels: names,
            datasets: [{
               label: 'Distribución de la cohorte por categoria de riesgo',
               data: valores,
               backgroundColor: veeva.calculadora.chartOptions.backgroundColor,
               borderColor: veeva.calculadora.chartOptions.borderColor,
               borderWidth: veeva.calculadora.chartOptions.borderWidth,
            }]
         },
         options: {
            indexAxis: 'x',
            plugins: {
               datalabels: {
                  anchor: 'end',
                  align: 'end',
                  formatter: (value, context) => {
                     const categorias = ['bajo', 'intermedio', 'alto'];
                     let formato = `${value}% - ${veeva.calculadora.estadificacionCategoria[categorias[context.datasetIndex]]}`;
                     return formato;
                  },
                  font: {
                     family: "'FSAlbert'",
                     size: 14,
                     style: 'normal',
                     weight: 'normal'
                  }
               },
               legend: {
                  display: false,
               },
               title: {
                  display: true,
                  text: 'Distribución de la cohorte por categoria de riesgo',
                  color: 'rgba(251, 146, 60, 1)',
                  font: {
                     family: "'FSAlbert'",
                     size: 18,
                     style: 'normal',
                     weight: 'bold',
                     lineHeight: 2
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
            scales: {
               y: {
                  min: 0,
                  max: 65,
                  ticks: {
                     stepSize: 5
                  }
               }
            },
         },
         plugins: [ChartDataLabels]
      });
   }
};

export default chartHomeModule;
