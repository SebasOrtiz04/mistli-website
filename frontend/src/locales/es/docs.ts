const docs = {
  search: {
    placeholder: "Buscar en la documentación...",
    results: "Resultados de búsqueda",
    noResults: "No se encontró documentación para esta búsqueda.",
  },

  navigation: {
    docs: "Documentación",
    previous: "Anterior",
    next: "Siguiente",
  },

  sections: [
    {
      category: "Primeros pasos",
      description: "Comienza a trabajar con Mistli",
      icon: "mdi:rocket-launch-outline",
      articles: [
        {
          slug: "introduction",
          title: "Introducción",
          content: `Mistli es una plataforma tecnológica para crear soluciones digitales mediante software, inteligencia artificial, automatización e integraciones.

Esta documentación explica cómo se estructuran las soluciones de Mistli, cómo funcionan los servicios disponibles y cómo integrarlos en tus propios flujos de trabajo.

**Qué puedes construir con Mistli**

- Aplicaciones web y plataformas digitales personalizadas
- Servicios backend y APIs REST
- Funcionalidades basadas en inteligencia artificial y asistentes inteligentes
- Automatizaciones de procesos de negocio
- Procesamiento de documentos y flujos de datos
- Integraciones con servicios y APIs externas

Las soluciones de Mistli se diseñan de acuerdo con los requerimientos específicos de cada proyecto. Las tecnologías, integraciones e infraestructura utilizadas pueden variar según la solución implementada.`,
        },
        {
          slug: "quickstart",
          title: "Primeros pasos",
          content: `La forma más rápida de comenzar con Mistli es definir el problema, el flujo de trabajo y los sistemas involucrados.

**1 — Define la solución**

Identifica qué quieres construir, automatizar o integrar. Puede ser una aplicación web, una herramienta interna, un flujo de IA, una API o una plataforma digital completa.

**2 — Define los datos**

Determina qué información necesita recibir, procesar y devolver la solución. Esto puede incluir bases de datos, documentos, APIs externas e información generada por usuarios.

**3 — Define las integraciones**

Identifica los servicios con los que la solución necesita comunicarse. Mistli puede conectar componentes de software mediante APIs, webhooks y otros mecanismos de integración.

**4 — Implementa y prueba**

La solución se desarrolla alrededor del flujo definido y se valida contra el comportamiento esperado antes de desplegarla.

**5 — Despliega**

Una vez que la solución está lista, la aplicación y sus servicios de soporte se despliegan de acuerdo con los requerimientos de infraestructura del proyecto.`,
        },
        {
          slug: "account",
          title: "Cuenta y acceso",
          content: `El acceso a los servicios de Mistli depende de la solución y del entorno utilizado.

**Autenticación**

Las aplicaciones pueden implementar autenticación mediante el proveedor de identidad y el mecanismo de autenticación definido para el proyecto.

**Acceso de usuarios**

Los permisos de acceso deben definirse de acuerdo con las responsabilidades de cada usuario o sistema que utilice la solución.

**Separación de entornos**

Los entornos de desarrollo, pruebas y producción deben mantenerse separados cuando el proyecto requiera ciclos independientes de pruebas y despliegue.

Si tu proyecto de Mistli utiliza un flujo de autenticación personalizado, consulta la documentación de autenticación correspondiente a ese proyecto.`,
        },
      ],
    },

    {
      category: "Plataforma Mistli",
      description: "Conceptos fundamentales y arquitectura",
      icon: "mdi:cube-outline",
      articles: [
        {
          slug: "solutions",
          title: "Soluciones Mistli",
          content: `Las soluciones de Mistli están compuestas por uno o más componentes técnicos que trabajan en conjunto para resolver un requerimiento específico de negocio.

**Web**

Las soluciones web proporcionan interfaces para clientes, equipos y operaciones internas.

**Backend**

Los servicios backend gestionan la lógica de negocio, APIs, autenticación, procesamiento de datos y comunicación entre sistemas.

**Inteligencia Artificial**

Las capacidades de IA pueden incorporarse en aplicaciones y flujos de trabajo para asistentes, clasificación, extracción, generación, análisis y otros casos de uso.

**Automatización**

Las automatizaciones conectan eventos, reglas de negocio y servicios externos para reducir trabajo manual y repetitivo.

**Aplicaciones**

Las aplicaciones personalizadas combinan estas capacidades para crear una solución completa adaptada a un flujo de trabajo u organización específica.`,
        },
        {
          slug: "architecture",
          title: "Arquitectura de soluciones",
          content: `Una solución de Mistli puede contener varios componentes independientes conectados mediante interfaces bien definidas.

Una arquitectura típica puede incluir un frontend, servicios backend, bases de datos, APIs externas y componentes de inteligencia artificial o automatización.

**Frontend**

El frontend proporciona la interfaz utilizada por las personas que interactúan con la solución.

**Backend**

Los servicios backend exponen operaciones de negocio, validan solicitudes y coordinan la comunicación entre los diferentes componentes.

**Datos**

Las bases de datos y sistemas de almacenamiento conservan la información requerida por la aplicación.

**Integraciones**

Los servicios externos pueden conectarse mediante APIs, webhooks u otros mecanismos compatibles.

**IA y automatización**

Los modelos de IA y los flujos de automatización pueden incorporarse cuando la solución requiere procesamiento inteligente o acciones automatizadas.

La arquitectura final depende de los requerimientos, escala e integraciones de cada proyecto.`,
        },
        {
          slug: "environments",
          title: "Entornos",
          content: `Los proyectos de Mistli pueden utilizar entornos separados para desarrollo, pruebas y producción.

**Desarrollo**

Se utiliza para implementar y probar cambios sin afectar la solución en producción.

**Pruebas**

Se utiliza para validar integraciones, flujos de trabajo y comportamiento de la aplicación antes de publicar cambios.

**Producción**

Es el entorno utilizado por la aplicación final y sus usuarios.

La configuración de cada entorno debe administrarse de forma independiente para evitar que credenciales, servicios o datos de un entorno sean utilizados accidentalmente en otro.`,
        },
      ],
    },

    {
      category: "Desarrollo",
      description: "Construye e integra soluciones con Mistli",
      icon: "mdi:code-braces",
      articles: [
        {
          slug: "api",
          title: "Integración con APIs",
          content: `Las soluciones de Mistli pueden exponer o consumir APIs REST para comunicarse con otras aplicaciones y servicios.

**Flujo de una solicitud**

Un cliente envía una solicitud a un endpoint de la API. El backend valida la solicitud, ejecuta la operación requerida y devuelve una respuesta.

**Autenticación**

Los endpoints protegidos deben utilizar un mecanismo de autenticación apropiado para el proyecto. Las credenciales y tokens nunca deben exponerse en el frontend ni en repositorios públicos.

**Validación de solicitudes**

Los datos recibidos deben validarse antes de llegar a la lógica de negocio o a servicios externos.

**Manejo de errores**

Las respuestas de la API deben proporcionar códigos de estado predecibles e información útil para que las aplicaciones consumidoras puedan manejar los errores correctamente.

Los endpoints, mecanismos de autenticación y esquemas de las solicitudes dependen de la solución de Mistli que se esté integrando.`,
        },
        {
          slug: "webhooks",
          title: "Webhooks",
          content: `Los webhooks permiten que un sistema notifique a otro servicio cuando ocurre un evento.

Son útiles cuando una automatización de Mistli necesita reaccionar ante un evento generado por otra aplicación.

**Flujo típico**

1. Ocurre un evento en un sistema externo.
2. El sistema externo envía una solicitud HTTP al webhook.
3. Mistli valida la solicitud recibida.
4. El flujo configurado procesa el evento.
5. El resultado se almacena, devuelve o envía a otro servicio.

Los endpoints de webhook deben validar las solicitudes recibidas y nunca deben asumir que toda solicitud externa es confiable.`,
        },
        {
          slug: "integrations",
          title: "Integraciones",
          content: `Las integraciones conectan las soluciones de Mistli con los sistemas que una organización ya utiliza.

**Patrones comunes de integración**

- APIs REST
- Webhooks
- Conexiones a bases de datos
- Proveedores de autenticación
- Servicios en la nube
- Sistemas internos de negocio
- Proveedores de modelos de IA

Antes de implementar una integración, define qué datos deben moverse entre los sistemas, la dirección de la comunicación y cómo deben manejarse los errores.

Las credenciales deben almacenarse de forma segura y nunca deben estar escritas directamente en el código fuente.`,
        },
      ],
    },

    {
      category: "IA y Automatización",
      description: "Flujos inteligentes y automatización",
      icon: "mdi:brain",
      articles: [
        {
          slug: "ai",
          title: "Soluciones de IA",
          content: `Mistli puede incorporar inteligencia artificial en aplicaciones y flujos de trabajo empresariales.

Las capacidades de IA pueden utilizarse cuando un proceso requiere comprensión, clasificación, generación, extracción o interacción con información no estructurada.

**Casos de uso comunes**

- Asistentes de IA
- Análisis de documentos
- Extracción de información
- Clasificación de texto
- Generación de contenido
- Búsqueda inteligente
- Soporte para toma de decisiones

Los componentes de IA deben diseñarse alrededor de una tarea claramente definida, entradas esperadas y resultados medibles.

En sistemas de producción también debe evaluarse continuamente el comportamiento de los modelos para identificar respuestas incorrectas o inesperadas.`,
        },
        {
          slug: "automation",
          title: "Flujos de automatización",
          content: `Las automatizaciones de Mistli conectan eventos de negocio con acciones predefinidas.

Una automatización puede recibir información de un sistema, procesarla y ejecutar una acción en otro sistema.

**Ejemplo de flujo**

Se recibe un nuevo evento → se validan los datos → una regla de negocio o componente de IA procesa la información → se almacena el resultado → se notifica a otro servicio.

**Principios de diseño**

Las automatizaciones deben ser deterministas cuando sea posible, observables durante su ejecución y capaces de manejar errores de forma segura.

Los flujos de larga duración o críticos también deben proporcionar suficientes registros para determinar qué ocurrió cuando una ejecución falla.`,
        },
        {
          slug: "documents",
          title: "Procesamiento de documentos",
          content: `Las soluciones de Mistli pueden procesar documentos como parte de flujos automatizados o basados en inteligencia artificial.

Dependiendo del proyecto, un flujo de documentos puede incluir:

- Carga de archivos
- Extracción de texto
- Clasificación de datos
- Extracción de información estructurada
- Validación
- Almacenamiento
- Integración con otro sistema

El procesamiento de documentos debe definir qué ocurre cuando falta información, cuando los datos son ambiguos o cuando la información no puede extraerse de forma confiable.

Para documentos sensibles, los controles de acceso y las políticas de almacenamiento deben definirse como parte de la arquitectura de la solución.`,
        },
      ],
    },

    {
      category: "Seguridad",
      description: "Protege aplicaciones e integraciones",
      icon: "mdi:shield-lock-outline",
      articles: [
        {
          slug: "security",
          title: "Principios de seguridad",
          content: `La seguridad forma parte del diseño de cada solución de Mistli.

Los controles específicos de seguridad dependen de la arquitectura, las integraciones y los requerimientos de cada proyecto.

**Credenciales**

Las API keys, contraseñas, tokens y demás credenciales deben almacenarse de forma segura y nunca deben incluirse en el control de versiones.

**Control de acceso**

Las aplicaciones deben otorgar a usuarios y servicios únicamente los permisos necesarios para realizar sus tareas.

**Protección de datos**

La información sensible debe protegerse durante su transmisión y almacenamiento mediante las capacidades de seguridad de la infraestructura seleccionada.

**Integraciones**

Las integraciones externas deben validar autenticación, permisos y datos recibidos antes de ejecutar operaciones.

Los requerimientos de seguridad deben definirse antes de desplegar una solución en producción.`,
        },
        {
          slug: "authentication",
          title: "Autenticación",
          content: `La autenticación determina cómo los usuarios o sistemas demuestran su identidad antes de acceder a una solución de Mistli.

Dependiendo del proyecto, la autenticación puede utilizar correo y contraseña, autenticación con Google, tokens, API keys u otro proveedor de identidad.

**Autenticación de usuarios**

Las aplicaciones orientadas a usuarios deben autenticar a las personas antes de permitir el acceso a recursos protegidos.

**Autenticación de APIs**

Las APIs deben utilizar un mecanismo de autenticación apropiado y validar las credenciales antes de ejecutar operaciones protegidas.

**Seguridad de sesiones**

Las sesiones y tokens de autenticación deben manejarse de forma segura y no deben exponerse mediante URLs, logs o configuración del cliente.`,
        },
        {
          slug: "best-practices",
          title: "Buenas prácticas de seguridad",
          content: `Sigue estas prácticas al desarrollar o integrar una solución de Mistli.

**Mantén los secretos fuera del código**

Utiliza variables de entorno o una solución dedicada para la gestión de secretos.

**Utiliza el principio de mínimo privilegio**

Otorga a usuarios y servicios únicamente los permisos necesarios para sus responsabilidades.

**Valida las entradas externas**

Nunca confíes directamente en información recibida de usuarios, APIs, webhooks o sistemas externos.

**Monitorea los errores**

Los errores de aplicaciones e integraciones deben registrarse de forma que permitan diagnosticar problemas sin exponer información sensible.

**Separa los entornos**

Las credenciales de desarrollo y producción no deben compartirse.`,
        },
      ],
    },
  ],
} as const;


export default docs;