{/* ESTE SI ES */}
import React, { useState } from 'react';
import { BarChart3, Bot, ChevronDown, Send, Loader2, TrendingUp, Users, ShoppingCart, Target, Brain, Zap, AlertTriangle, Star, Calendar, HelpCircle, Database } from 'lucide-react';

function App() {
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setIsLoading(true);
    setShowPrediction(false);

    const payload = {
    mensaje: chatInput.trim()
  };
       console.log("📤 Enviando al backend:", payload);
    
    try {
      const response = await fetch('https://api-backend-proyecto-final-especializacion-951527847571.us-central1.run.app/conversar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)

      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔎 Respuesta del backend:", data);

      let formattedPrediction = '';
      if (data.prediccion !== undefined) {
        formattedPrediction = data.prediccion;
      } else if (data.response) {
        formattedPrediction = data.response;
      } else {
        formattedPrediction = 'Respuesta recibida del servidor';
      }

      setPrediction(formattedPrediction);
      setShowPrediction(true);
    } catch (error) {
      console.error('Error calling API:', error);
      setPrediction('❌ Error al conectar con el servidor. Por favor, intenta nuevamente.');
      setShowPrediction(true);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const clusters = [
    {
      id: 3,
      name: "Usuarios de alto valor",
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      icon: <Zap className="h-6 w-6" />,
      conversion: "40.4%",
      description: "Este grupo engloba a los usuarios con mayor compromiso dentro del sitio web. Se caracterizan por registrar una alta duración en la sesión (+7.9 desviaciones estándar), así como un elevado número de páginas de producto visitadas (+7.9). Además, presentan un nivel de compromiso sin precedentes (+68.3), lo cual sugiere un comportamiento intensivo de exploración y evaluación antes de la compra. Complementariamente, muestran una tasa de rebote (-0.36) y tasa de salida (-0.54) muy por debajo del promedio, lo que refuerza su perfil como usuarios altamente interesados.",
      profile: "Compradores Premium",
      characteristics: "Engagement extremo, +7.9σ páginas producto, +7.9σ tiempo sesión"
    },
    {
      id: 4,
      name: "Exploradores comprometidos",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-800",
      icon: <Star className="h-6 w-6" />,
      conversion: "27.9%",
      description: "Aunque no tan intensos como los del clúster 3, los usuarios de este grupo también evidencian un alto nivel de interacción con el sitio. Tienen un tiempo de permanencia prolongado (+1.05) y una cantidad significativa de páginas visitadas, junto con tasas de rebote y salida bajas. Estos usuarios navegan a profundidad, probablemente comparando productos, lo que indica un interés real en convertir, aunque menos enfático que en el clúster anterior.",
      profile: "Navegadores Profundos",
      characteristics: "+1.05σ tiempo permanencia, tasas rebote/salida bajas"
    },
    {
      id: 1,
      name: "Usuario promedio",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-800",
      icon: <Users className="h-6 w-6" />,
      conversion: "15.5%",
      description: "Este clúster agrupa a los usuarios con un comportamiento medio en la plataforma. No presentan valores extremos en ninguna variable, pero destacan por tener tasas de rebote (-0.28) y salida (-0.24) ligeramente inferiores al promedio, lo que los convierte en un segmento receptivo. Aunque su compromiso es menor que el de los clústeres 3 y 4, estos usuarios sí exploran el sitio de forma moderada, lo que representa una oportunidad de optimización con incentivos dirigidos.",
      profile: "Exploradores Moderados",
      characteristics: "Comportamiento medio, -0.28σ rebote, -0.24σ salida"
    },
    {
      id: 0,
      name: "Visitantes de fechas especiales",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      icon: <Calendar className="h-6 w-6" />,
      conversion: "6.1%",
      description: "Este grupo se distingue por su comportamiento sensible a las fechas clave. Aunque muestran una interacción general baja en el sitio, presentan una altísima puntuación en la variable is_special_day (+3.13), lo que indica que su actividad está concentrada en momentos puntuales como promociones, festividades o eventos. Sin embargo, esta actividad no se traduce con fuerza en conversiones, por lo cual podrían beneficiarse de campañas mejor dirigidas en esos periodos.",
      profile: "Visitantes Estacionales",
      characteristics: "+3.13σ días especiales, actividad concentrada en eventos"
    },
    {
      id: 2,
      name: "Rebotadores",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      icon: <AlertTriangle className="h-6 w-6" />,
      conversion: "0.6%",
      description: "Este es el grupo con menor valor para la empresa. Muestran mínimos niveles de interacción (-0.66), tanto en páginas vistas como en tiempo de permanencia. Además, las tasas de rebote (+3.11) y salida (+2.91) son extremadamente altas, lo cual sugiere que abandonan el sitio casi de inmediato, sin explorar productos ni contenidos. El compromiso es prácticamente nulo, lo que los clasifica como tráfico no cualificado o incluso tóxico.",
      profile: "Tráfico No Cualificado",
      characteristics: "+3.11σ rebote, +2.91σ salida, -0.66σ interacción"
    }
  ];

  const strategies = [
    {
      cluster: "Segmentación Élite de Alto Engagement (Clúster 3 + Firefox + Estambul/İzmir + Noviembre)",
      recommendation: "Crear eventos pop-up exclusivos en Estambul/İzmir durante noviembre con acceso prioritario para usuarios Firefox, ofreciendo previews de productos y 15% descuento en compras in situ.",
      color: "bg-red-50 border-red-200 text-red-800",
      details: "Conversión excepcional (40.4%) - Firefox dominante (90.4%), 98.1% visitantes recurrentes, pico en noviembre (33 sesiones)."
    },
    {
      cluster: "Segmentación de Alto Impacto Estacional (Clúster 4 + Firefox + Q4)",
      recommendation: "Lanzar campañas estacionales con experiencias visuales avanzadas para Firefox en noviembre-diciembre, combinando ofertas segmentadas por región y remarketing con productos de alto engagement.",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      details: "Alta conversión (27.9%) - Firefox líder (70.3%), picos en noviembre (633) y diciembre (226 sesiones)."
    },
    {
      cluster: "Segmentación de Reactivación Estacional (Clúster 0 + Firefox + Mayo)",
      recommendation: "Campañas temáticas en mayo para Estambul/İzmir con ofertas 'Primera Impresión' (15% descuento + envío gratis) y contenido interactivo optimizado para Firefox.",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      details: "Firefox predominante (66.0%), 95.1% recurrentes con baja conversión (6.1%), foco estacional en mayo (895 sesiones)."
    },
    {
      cluster: "Segmentación de visitantes sensibles a eventos (Clúster 2 + Depuración)",
      recommendation: "Redirección automática a versión ligera para IE/Netscape, banner promocional 'Actualiza y recibe 10% OFF', pausa de inversión en fuentes tóxicas.",
      color: "bg-green-50 border-green-200 text-green-800",
      details: "Mínima conversión (0.6%) - Navegadores obsoletos, +3.11σ rebote, +2.91σ salida, 95.2% recurrentes sin conversión."
    },
    {
      cluster: "Segmentación Masiva Estacional (Clúster 1 + Firefox + Eventos)",
      recommendation: "Alertas personalizadas por ciudad, descuentos progresivos en noviembre ('Calendario Firefox Adviento'), competencias regionales con rankings en vivo.",
      color: "bg-orange-50 border-orange-200 text-orange-800",
      details: "Conversión media (15.5%) - Respuesta a eventos +3.13σ, Firefox dominante (63.7%), base nacional amplia."
    }
  ];

  // Categorías de ejemplos de consultas
  const queryCategories = [
    {
      title: "📊 Información sobre Variables",
      icon: <Database className="h-5 w-5" />,
      color: "bg-blue-50 border-blue-200 text-blue-800",
      queries: [
        "¿Cuál es la descripción de las variables de salida de la página por el usuario, regiones, el valor de una página, tipo de página del producto?"
      ]
    },
    {
      title: "🎯 Predicciones de Compra",
      icon: <Target className="h-5 w-5" />,
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
      queries: [
        "Dime si un cliente va a comprar. Tiene los siguientes datos: el visitante entró en octubre, utiliza el navegador Firefox y el sistema operativo Windows. Además, visitó 5 páginas informativas con una duración de 60 segundos.",
        "Dime si un cliente va a comprar. Este tiene los siguientes datos: el usuario visitó la página en octubre, en un fin de semana; accedió a 5 páginas informativas, 10 páginas administrativas, y duró 10 segundos en cada una de ellas.",
        "Dime si un cliente con las siguiente características va a comprar: el visitante entró en enero, utiliza el navegador Chrome y el sistema operativo Linux. Además, visitó 1 páginas informativas con una duración de 5 segundos."
      ]
    }
  ];

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">ShopPredict</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Dashboard
              </button>
              <button 
                onClick={() => scrollToSection('clustering')}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Análisis de Clústeres
              </button>
              <button 
                onClick={() => scrollToSection('chatbot')}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Predicción IA
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="pt-8 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Predicción Inteligente de
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Compras Online</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Plataforma avanzada de análisis predictivo basada en el dataset UCI de intención de compra. 
              Analiza comportamiento de usuarios y predice probabilidades de conversión en tiempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                <Users className="h-5 w-5" />
                <span className="font-medium">12,330 sesiones analizadas</span>
              </div>
              <div className="flex items-center space-x-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-medium">Columbia.com.tr dataset</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Precisión 85%+</span>
              </div>
            </div>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Explorar Dashboard</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Section - Enhanced */}
      <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-full mb-6 font-medium">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics Dashboard</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Dashboard Interactivo
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Visualización en tiempo real de patrones de comportamiento, métricas de conversión 
              e insights predictivos basados en el dataset de Columbia.com.tr
            </p>
          </div>

          <div className="bg-white rounded-3xl p-2 shadow-2xl border border-slate-200">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                <iframe 
                  width="100%" 
                  height="900" 
                  src="https://lookerstudio.google.com/embed/reporting/8becebfe-452b-4e8b-8cf1-e4875c36ff58/page/BBaNF" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  className="w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clustering Analysis Section */}
      <section id="clustering" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full mb-6 font-medium">
              <Brain className="h-5 w-5" />
              <span>Análisis de Clustering</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Clústeres de Comportamiento
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Segmentación inteligente de usuarios basada en algoritmos K-Means y análisis de componentes principales
            </p>
          </div>

          {/* t-SNE Visualization */}
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Clusters de comportamiento (t-SNE)
              </h3>
              <div className="flex justify-center mb-8">
                <img 
                  src="/image.png" 
                  alt="Visualización t-SNE de clústeres de comportamiento"
                  className="max-w-full h-auto rounded-2xl shadow-lg border border-slate-200"
                />
              </div>
              <p className="text-slate-600 text-center max-w-4xl mx-auto leading-relaxed">
                En esta visualización se proyectaron sesiones de usuario usando t-SNE (t-Distributed Stochastic Neighbor Embedding). 
                Cada punto representa una sesión y el color indica a qué clúster fue asignado por el algoritmo K-Means. 
                La técnica t-SNE permite una mejor separación visual de los grupos, revelando la estructura natural de los datos 
                y las diferencias comportamentales entre los distintos tipos de usuarios.
              </p>
            </div>
          </div>

          {/* Cluster Distribution */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Visualización y Descripción de Clústeres
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {clusters.map((cluster) => (
                <div key={cluster.id} className={`${cluster.bgColor} ${cluster.borderColor} border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`bg-gradient-to-r ${cluster.color} p-3 rounded-xl text-white shadow-lg`}>
                      {cluster.icon}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${cluster.textColor}`}>
                        Clúster {cluster.id} – {cluster.name}
                      </h4>
                      <div className={`text-2xl font-bold ${cluster.textColor} mt-1`}>
                        Conversión: {cluster.conversion}
                      </div>
                    </div>
                  </div>
                  <p className={`${cluster.textColor} leading-relaxed mb-4`}>
                    {cluster.description}
                  </p>
                  <div className={`text-sm font-semibold ${cluster.textColor} opacity-80`}>
                    {cluster.characteristics}
                  </div>
                </div>
              ))}
            </div>
          </div>

        

          {/* Strategic Segmentation */}
          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Propuesta de Segmentación Estratégica
            </h3>
            <div className="grid grid-cols-1 gap-8">
              {strategies.map((strategy, index) => (
                <div key={index} className={`${strategy.color} border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <h4 className="font-bold text-xl mb-4">{strategy.cluster}</h4>
                  <p className="leading-relaxed mb-4 text-lg">{strategy.recommendation}</p>
                  <div className="text-sm opacity-80 font-medium">
                    {strategy.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section id="chatbot" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full mb-6 font-medium">
              <Bot className="h-5 w-5" />
              <span>IA Predictiva</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Chatbot Predictivo
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Describe el comportamiento de un usuario y obtén predicciones instantáneas 
              sobre la probabilidad de compra usando algoritmos de Machine Learning
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-3">
                  Describe el comportamiento del usuario:
                </label>
                <textarea
                  id="description"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ejemplo: Dime si un cliente va a comprar teniendo en cuenta que el usuario visitó la página en enero durante un fin de semana y visitó 30 paginas de productos relacionados con 120 segundos de interacción."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !chatInput.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analizando...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Obtener Predicción</span>
                  </>
                )}
              </button>
            </form>

            {/* Prediction Result */}
            {showPrediction && (
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl animate-fade-in shadow-lg">
                <div className="flex items-start space-x-3">
                  <Bot className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Resultado del Análisis</h3>
                    <pre className="text-slate-700 whitespace-pre-wrap leading-relaxed font-medium">
                      {prediction}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Example Queries with Categories */}
            <div className="mt-8 space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                <span>Ejemplos de consultas por categoría:</span>
              </h3>
              
              {queryCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className={`${category.color} border-2 rounded-2xl p-6 shadow-lg`}>
                  <div className="flex items-center space-x-2 mb-4">
                    {category.icon}
                    <h4 className="font-bold text-lg">{category.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {category.queries.map((query, queryIndex) => (
                      <button
                        key={queryIndex}
                        onClick={() => setChatInput(query)}
                        className="block w-full text-left p-4 bg-white/70 hover:bg-white rounded-xl transition-all duration-200 text-sm border border-white/50 hover:border-white hover:shadow-md transform hover:scale-[1.02]"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-xs bg-white/80 px-2 py-1 rounded-full font-medium mt-0.5 flex-shrink-0">
                            Ejemplo {queryIndex + 1}
                          </span>
                          <span className="leading-relaxed">"{query}"</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">ShopPredict</span>
          </div>
          <p className="text-slate-600">
            Basado en el dataset UCI "Online Shoppers Purchasing Intention" • 
            Desarrollado con React + Machine Learning
          </p>

        </div>
      </footer>
      
             
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;