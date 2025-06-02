import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store.ts';

const SCRIPT_URLS = [
  'https://code.highcharts.com/highcharts.js',
  'https://code.highcharts.com/modules/parallel-coordinates.js',
  'https://code.highcharts.com/modules/accessibility.js',
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.body.appendChild(script);
  });
}

const NeuralNetworkChart: React.FC = () => {
  const idioma = useSelector((state: RootState) => state.locale.language);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const textoNN={
    titulo: { ES: "Red Neuronal para clasificación binaria", EN: "Neural Network for binary clasification" },
    subtitulo: { ES: "Datos de entrada", EN: "Automation" },
    descripcion: { ES: "Red neuronal para clasificación", EN: "Neural network for clasification" },
    numnnodes: { ES: "Número de nodos", EN: "Number of nodes" },
    activacion: { ES: "Funcion de activación", EN: "Activation function" },
    capas: { ES: "Capas en la red neuroanl ", EN: "Layers in neural " },
    capaInput: { ES: "Capas de Entrada ", EN: "Input Layer" },
    capaHidden: { ES: "Capas Intermedias", EN: "Hidden Layer " },
    capasOutput: { ES: "Capas de Salida ", EN: "Output Layer " },
  }as const;
  useEffect(() => {
    // Cargar los scripts secuencialmente
    async function loadAll() {
      try {
        for (const src of SCRIPT_URLS) {
          await loadScript(src);
        }
        setIsReady(true);
      } catch (error) {
        console.error(error);
      }
    }
    loadAll();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    if (!containerRef.current) return;

    // Ya que Highcharts está cargado en window, se puede usar directamente
    const Highcharts = (window as any).Highcharts;

    // Define capas (igual que antes)
    const layers = [
      { nodes: 1, activation: 'tanh', label: `${textoNN.capaInput[idioma]} (#0)` },
      { nodes: 6, activation: 'tanh', label: `${textoNN.capaHidden[idioma]} #1 (tanh)` },
      { nodes: 6, activation: 'ReLU', label: `${textoNN.capaHidden[idioma]} #2 (ReLU)` },
      { nodes: 6, activation: 'ReLU', label: `${textoNN.capaHidden[idioma]} #3 (ReLU)` },
      { nodes: 2, activation: 'sigmoid', label: ` ${textoNN.capasOutput[idioma]} (sigmoid)` },
    ];

    function generateData() {
      if (layers.length === 0) return [];
      const data: { data: number[] }[] = [];

      function generate(currentIndices: number[]) {
        if (currentIndices.length === layers.length) {
          data.push({ data: [...currentIndices] });
          return;
        }
        const dimensionIndex = currentIndices.length;
        for (let i = 0; i < layers[dimensionIndex].nodes; i++) {
          generate([...currentIndices, i]);
        }
      }
      generate([]);
      return data;
    }

    Highcharts.chart(containerRef.current, {
      chart: {
        type: 'line',
        parallelCoordinates: true,
        inverted: true,
      },
      title: {
        text: textoNN.titulo[idioma],
        align: 'left',
      },
      subtitle: {
        text: textoNN.subtitulo[idioma],
        align: 'left',
      },
      accessibility: {
        typeDescription: textoNN.descripcion[idioma],
        point: {
          descriptionFormat: 'node on {series.xAxis.options.custom.layers.(x).label}',
        },
      },
      tooltip: {
        stickOnContact: true,
        formatter() {
          const point = this.point;
          const x = point.x;
          const layersData = this.series.xAxis.options.custom.layers;
          return `
            <span style="font-weight: bold">${textoNN.activacion[idioma]}:</span> ${layersData[x].activation} <br>
            <span style="font-weight: bold">${textoNN.numnnodes[idioma]}:</span> ${layersData[x].nodes}
          `;
        },
        useHTML: true,
      },
      plotOptions: {
        line: {
          lineWidth: 0.5,
          color: '#3B82F615',
          marker: {
            symbol: 'circle',
            enabled: true,
            radius: 10,
            fillColor: 'white',
            lineWidth: 1.5,
            lineColor: '#3B82F6',
            states: {
              hover: {
                lineColor: '#60a5fa',
              },
            },
          },
          states: {
            inactive: {
              enabled: false,
            },
            hover: {
              lineColor: '#3B82F6',
              lineWidthPlus: 0,
            },
          },
        },
      },
      xAxis: {
        custom: { layers },
        categories: layers.map(layer => layer.label),
        accessibility: {
          description: textoNN.capas[idioma],
        },
      },
      yAxis: layers.map(layer => ({
        type: 'category' as const,
        visible: false,
        accessibility: {
          description: `Axis for the nodes contained the layer ${layer.label}.`,
        },
      })),
      series: generateData(),
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              xAxis: {
                categories: layers.map(layer => layer.activation),
              },
            },
          },
        ],
      },
    });
  }, [isReady,idioma]);

  return (
    <section>
      <div className=' flex justify-between'>
        <figure className=" p-20 highcharts-figure">
          <div id="container" ref={containerRef} style={{ height: 500, width: "100%" }} />
        </figure>
        <div className=' w-1/2 h-96 p-20'>
          Redes Neuronales
        </div>
      </div>
    </section>
  );
};

export default NeuralNetworkChart;
