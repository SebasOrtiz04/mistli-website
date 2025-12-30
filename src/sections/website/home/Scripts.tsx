import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { baseWhats } from '../../../constants.ts';
import { useTranslation } from 'react-i18next';

interface CustomScriptSectionProps {
  className?: string;
}
  const codeLines = [
    '# Script de Automatización de Tareas',
    'import pandas as pd',
    'import requests',
    'from datetime import datetime',
    'from pathlib import Path',
    '',
    'class TaskAutomation:',
    '    def __init__(self):',
    '        self.today = datetime.now()',
    '        ',
    '    def process_excel_reports(self, file_path):',
    '        """Procesa reportes de Excel automáticamente"""',
    '        df = pd.read_excel(file_path)',
    '        df_filtered = df[df["status"] == "active"]',
    '        return df_filtered.groupby("category").sum()',
    '        ',
    '    def send_notifications(self, data):',
    '        """Envía notificaciones automáticas"""',
    '        for item in data:',
    '            message = f"Tarea completada: {item}"',
    '            self.notify_user(message)',
    '',
    'if __name__ == "__main__":',
    '    automation = TaskAutomation()',
    '    report = automation.process_excel_reports("data.xlsx")',
    '    automation.send_notifications(report)',
  ];



const CustomScriptSection: React.FC<CustomScriptSectionProps> = ({
  className = '',
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const { t } = useTranslation();
  const features = t('home.scripts.features', { returnObjects: true }) as { title: string; desc: string }[];
  const code = t('home.scripts.code', { returnObjects: true }) as string[];
  const handleRequestScript = () => {
    const message = encodeURIComponent(t('home.scripts.waMessage'));
    window.open(`${baseWhats}${message}`, '_blank');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) =>
        prev >= code.length - 1 ? 0 : prev + 1
      );
    }, 150);

    return () => clearInterval(interval);
  }, [code.length]);

  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-16 ${className}`}>
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Columna Izquierda - Animación */}
        <div className="relative flex items-center justify-center">
          <div className="relative">
            {/* Editor de código / Terminal */}
            <div className="relative w-80 h-96 bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
              {/* Header del editor */}
              <div className="h-10 bg-gray-800 flex items-center px-4 gap-2 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Icon icon="vscode-icons:file-type-python" className="w-4 h-4" />
                  <span className="text-gray-400 text-sm">task_automation.py</span>
                </div>
                <div className="ml-auto">
                  <Icon icon="mdi:bookmark" className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              
              {/* Código */}
              <div className="p-4 font-mono text-xs overflow-y-auto h-80 custom-scrollbar">
                {codeLines.map((line: string, index: number) => {
                  const isVisible = index <= currentLine;
                  const isComment = line.trim().startsWith('#');
                  const isDocstring = line.trim().startsWith('"""');
                  const hasImport = line.includes('import');
                  const hasFrom = line.includes('from');
                  const hasDef = line.includes('def ');
                  const hasClass = line.includes('class ');
                  const hasSelf = line.includes('self.');
                  const hasIf = line.includes('if __name__');
                  
                  return (
                    <div
                      key={index}
                      className={`
                        flex gap-3 transition-all duration-300 leading-5
                        ${isVisible ? 'opacity-100' : 'opacity-0'}
                      `}
                    >
                      <span className="text-gray-600 select-none w-6 text-right flex-shrink-0">
                        {line ? index + 1 : ''}
                      </span>
                      <pre className="text-gray-300 flex-1 whitespace-pre-wrap break-words">
                        {isComment && <span className="text-green-500">{line}</span>}
                        {isDocstring && <span className="text-green-400">{line}</span>}
                        {!isComment && !isDocstring && (
                          <>
                            {hasFrom && (
                              <>
                                <span className="text-purple-400">from</span>
                                {line.includes('import') ? (
                                  <>
                                    <span className="text-blue-300">{line.split('import')[0].replace('from', '')}</span>
                                    <span className="text-purple-400">import</span>
                                    <span className="text-yellow-300">{line.split('import')[1]}</span>
                                  </>
                                ) : (
                                  <span className="text-gray-300">{line.replace('from', '')}</span>
                                )}
                              </>
                            )}
                            {hasImport && !hasFrom && (
                              <>
                                <span className="text-purple-400">import</span>
                                <span className="text-yellow-300">{line.replace('import', '')}</span>
                              </>
                            )}
                            {hasClass && (
                              <>
                                <span className="text-purple-400">class</span>
                                <span className="text-blue-400">{line.replace('class', '').split(':')[0]}</span>
                                <span className="text-gray-300">:</span>
                              </>
                            )}
                            {hasDef && (
                              <>
                                <span className="text-gray-300">{line.split('def')[0]}</span>
                                <span className="text-purple-400">def</span>
                                <span className="text-yellow-400">{line.split('def')[1].split('(')[0]}</span>
                                <span className="text-gray-300">({line.split('(')[1]}</span>
                              </>
                            )}
                            {hasSelf && !hasDef && (
                              <>
                                <span className="text-gray-300">{line.split('self')[0]}</span>
                                <span className="text-blue-300">self</span>
                                <span className="text-gray-300">.{line.split('self.')[1]}</span>
                              </>
                            )}
                            {hasIf && (
                              <>
                                <span className="text-purple-400">if</span>
                                <span className="text-blue-300"> __name__</span>
                                <span className="text-gray-300"> == </span>
                                <span className="text-green-400">"__main__"</span>
                                <span className="text-gray-300">:</span>
                              </>
                            )}
                            {!hasFrom && !hasImport && !hasClass && !hasDef && !hasSelf && !hasIf && !isComment && !isDocstring && line && (
                              <span className="text-gray-300">{line}</span>
                            )}
                            {!line && <span>&nbsp;</span>}
                          </>
                        )}
                      </pre>
                    </div>
                  );
                })}
                
                {/* Cursor parpadeante */}
                {currentLine < codeLines.length && (
                  <div className="inline-block w-2 h-4 bg-indigo-400 animate-pulse ml-9"></div>
                )}
              </div>

              {/* Terminal output */}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-700 p-3">
                <div className="flex items-center gap-2 text-xs">
                  <Icon icon="mdi:terminal" className="text-indigo-400" />
                  <span className="text-indigo-400 animate-pulse">
                    Escribiendo automatización...
                  </span>
                </div>
              </div>
            </div>
            
            {/* Iconos flotantes de automatización */}
            {[
              'mdi:folder-sync',
              'mdi:file-move',
              'mdi:table-edit',
              'mdi:clock-fast',
              'mdi:file-document-multiple',
              'mdi:email-fast',
              'mdi:sort-variant',
              'mdi:robot'
            ].map((icon: string, i: number) => (
              <div
                key={i}
                className="absolute opacity-60 animate-[float_3s_ease-in-out_infinite]"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 20 - 10}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <Icon icon={icon} className="w-6 h-6 text-indigo-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            <Icon icon="solar:programming-bold-duotone" />
            {t('home.scripts.badge')}
          </span>

          <h2 className="text-4xl font-bold text-gray-900">{t('home.scripts.title')}</h2>

          <p className="text-lg text-gray-600">{t('home.scripts.description')}</p>

          <div className="space-y-4">
            {features.map((f, i) => (
              <div key={i} className="flex gap-3">
                <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-indigo-600 mt-1" />
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <div className="text-sm text-gray-600">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRequestScript}
            className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
          >
            <Icon icon="mdi:whatsapp" />
            {t('home.scripts.cta')}
          </button>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="text-indigo-600" />
            {t('home.scripts.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomScriptSection;
