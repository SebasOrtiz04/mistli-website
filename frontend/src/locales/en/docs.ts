export const docs = {
  search: {
    placeholder: "Search documentation...",
    results: "Search results",
    noResults: "No documentation found for this search.",
  },

  navigation: {
    docs: "Documentation",
    previous: "Previous",
    next: "Next",
  },

  sections: [
    {
      category: "Getting Started",
      description: "Start working with Mistli",
      icon: "mdi:rocket-launch-outline",
      articles: [
        {
          slug: "introduction",
          title: "Introduction",
          content: `Mistli is a technology platform for building digital solutions with software, artificial intelligence, automation and integrations.

This documentation explains how Mistli solutions are structured, how the available services work, and how to integrate them into your own workflows.

**What you can build with Mistli**

- Custom web applications and digital platforms
- Backend services and REST APIs
- AI-powered features and intelligent assistants
- Business process automations
- Document processing and data workflows
- Integrations with external services and APIs

Mistli solutions are designed around the specific requirements of each project. The technologies, integrations and infrastructure used can vary depending on the solution being implemented.`,
        },
        {
          slug: "quickstart",
          title: "Getting Started",
          content: `The fastest way to start with Mistli is to define the problem, the workflow and the systems involved.

**1 — Define the solution**

Identify what you want to build, automate or integrate. This can be a web application, an internal tool, an AI workflow, an API or a complete digital platform.

**2 — Define the data**

Determine what information the solution needs to receive, process and return. This includes databases, documents, external APIs and user-generated information.

**3 — Define integrations**

List the services your solution needs to communicate with. Mistli can connect software components through APIs, webhooks and other integration mechanisms.

**4 — Implement and test**

The solution is developed around the defined workflow and validated against the expected behavior before being deployed.

**5 — Deploy**

Once the solution is ready, the application and its supporting services are deployed according to the project's infrastructure requirements.`,
        },
        {
          slug: "account",
          title: "Account & Access",
          content: `Access to Mistli services depends on the solution and environment being used.

**Authentication**

Applications can implement authentication using the identity provider and authentication mechanism defined for the project.

**User access**

Access permissions should be defined according to the responsibilities of each user or system consuming the solution.

**Environment separation**

Development, testing and production environments should be kept separated when the project requires independent testing and deployment cycles.

If your Mistli project uses a custom authentication flow, refer to the authentication documentation provided for that project.`,
        },
      ],
    },

    {
      category: "Mistli Platform",
      description: "Core concepts and architecture",
      icon: "mdi:cube-outline",
      articles: [
        {
          slug: "solutions",
          title: "Mistli Solutions",
          content: `Mistli solutions are composed of one or more technical components working together to solve a specific business requirement.

**Web**

Web solutions provide user-facing interfaces for customers, teams and internal operations.

**Backend**

Backend services handle business logic, APIs, authentication, data processing and communication between systems.

**Artificial Intelligence**

AI capabilities can be incorporated into applications and workflows for assistants, classification, extraction, generation, analysis and other use cases.

**Automation**

Automations connect events, business rules and external services to reduce repetitive manual work.

**Applications**

Custom applications combine these capabilities into a complete solution tailored to a specific workflow or organization.`,
        },
        {
          slug: "architecture",
          title: "Solution Architecture",
          content: `A Mistli solution can contain several independent components connected through well-defined interfaces.

A typical architecture may include a frontend, backend services, databases, external APIs and AI or automation components.

**Frontend**

The frontend provides the interface used by people interacting with the solution.

**Backend**

Backend services expose business operations, validate requests and coordinate communication between the different components.

**Data**

Databases and storage systems persist the information required by the application.

**Integrations**

External services can be connected through APIs, webhooks or other supported mechanisms.

**AI and automation**

AI models and automation workflows can be added when the solution requires intelligent processing or automated actions.

The final architecture depends on the requirements, scale and integrations of each project.`,
        },
        {
          slug: "environments",
          title: "Environments",
          content: `Mistli projects can use separate environments for development, testing and production.

**Development**

Used to implement and test changes without affecting the production solution.

**Testing**

Used to validate integrations, workflows and application behavior before release.

**Production**

The environment used by the final application and its users.

Environment configuration should be managed independently so that credentials, services and data from one environment are not accidentally used by another.`,
        },
      ],
    },

    {
      category: "Development",
      description: "Build and integrate with Mistli",
      icon: "mdi:code-braces",
      articles: [
        {
          slug: "api",
          title: "API Integration",
          content: `Mistli solutions can expose or consume REST APIs to communicate with other applications and services.

**Request flow**

A client sends a request to an API endpoint. The backend validates the request, executes the required operation and returns a response.

**Authentication**

Protected endpoints should require an authentication mechanism appropriate for the project. Credentials and tokens must never be exposed in frontend code or public repositories.

**Request validation**

Incoming data should be validated before it reaches business logic or external services.

**Error handling**

API responses should provide predictable status codes and useful error information so consuming applications can handle failures correctly.

The exact endpoints, authentication method and request schemas depend on the Mistli solution being integrated.`,
        },
        {
          slug: "webhooks",
          title: "Webhooks",
          content: `Webhooks allow a system to notify another service when an event occurs.

They are useful when a Mistli automation needs to react to an event generated by another application.

**Typical flow**

1. An event occurs in an external system.
2. The external system sends an HTTP request to the webhook.
3. Mistli validates the incoming request.
4. The configured workflow processes the event.
5. The result is stored, returned or forwarded to another service.

Webhook endpoints should validate incoming requests and should not assume that every received request is trustworthy.`,
        },
        {
          slug: "integrations",
          title: "Integrations",
          content: `Integrations connect Mistli solutions with the systems already used by an organization.

**Common integration patterns**

- REST APIs
- Webhooks
- Database connections
- Authentication providers
- Cloud services
- Internal business systems
- AI model providers

Before implementing an integration, define the data that needs to move between systems, the direction of the communication and how errors should be handled.

Credentials should be stored securely and should never be hardcoded into application source code.`,
        },
      ],
    },

    {
      category: "AI & Automation",
      description: "Intelligent workflows and automation",
      icon: "mdi:brain",
      articles: [
        {
          slug: "ai",
          title: "AI Solutions",
          content: `Mistli can incorporate artificial intelligence into applications and business workflows.

AI capabilities can be used when a process requires understanding, classification, generation, extraction or interaction with unstructured information.

**Common use cases**

- AI assistants
- Document analysis
- Information extraction
- Text classification
- Content generation
- Intelligent search
- Automated decision support

AI components should be designed around a clearly defined task, expected inputs and measurable outputs.

For production systems, model behavior should also be evaluated continuously to identify incorrect or unexpected responses.`,
        },
        {
          slug: "automation",
          title: "Automation Workflows",
          content: `Mistli automations connect business events with predefined actions.

An automation can receive information from one system, process it and trigger an action in another system.

**Example workflow**

A new event is received → the data is validated → an AI or business rule processes the information → the result is stored → another service is notified.

**Design principles**

Automations should be deterministic where possible, observable during execution and designed to handle failures safely.

Long-running or critical workflows should also provide enough logging to determine what happened when an execution fails.`,
        },
        {
          slug: "documents",
          title: "Document Processing",
          content: `Mistli solutions can process documents as part of automated or AI-powered workflows.

Depending on the project, a document workflow may include:

- File upload
- Text extraction
- Data classification
- Structured information extraction
- Validation
- Storage
- Integration with another system

Document processing should define what happens when information is missing, ambiguous or cannot be extracted reliably.

For sensitive documents, access controls and storage policies should be defined as part of the solution architecture.`,
        },
      ],
    },

    {
      category: "Security",
      description: "Protect applications and integrations",
      icon: "mdi:shield-lock-outline",
      articles: [
        {
          slug: "security",
          title: "Security Principles",
          content: `Security is part of the design of every Mistli solution.

The exact security controls depend on the architecture, integrations and requirements of each project.

**Credentials**

API keys, passwords, tokens and other credentials must be stored securely and must not be committed to source control.

**Access control**

Applications should grant users and services only the permissions they require to perform their tasks.

**Data protection**

Sensitive information should be protected during transmission and while stored using the security capabilities provided by the selected infrastructure.

**Integrations**

External integrations should validate authentication, permissions and incoming data before executing operations.

Security requirements should be defined before a solution is deployed to production.`,
        },
        {
          slug: "authentication",
          title: "Authentication",
          content: `Authentication determines how users or systems prove their identity before accessing a Mistli solution.

Depending on the project, authentication may use email and password, Google authentication, tokens, API keys or another identity provider.

**User authentication**

User-facing applications should authenticate users before allowing access to protected resources.

**API authentication**

APIs should use an appropriate authentication mechanism and validate credentials before executing protected operations.

**Session security**

Sessions and authentication tokens should be handled securely and should not be exposed through URLs, logs or client-side configuration.`,
        },
        {
          slug: "best-practices",
          title: "Security Best Practices",
          content: `Follow these practices when developing or integrating with a Mistli solution.

**Keep secrets out of source code**

Use environment variables or a dedicated secrets-management solution for credentials.

**Use least privilege**

Give users and services only the permissions required for their responsibilities.

**Validate external input**

Never trust data received from users, APIs, webhooks or external systems.

**Monitor failures**

Application and integration errors should be logged in a way that helps diagnose problems without exposing sensitive information.

**Separate environments**

Development credentials and production credentials should not be shared.`,
        },
      ],
    },
  ],
} as const;


export default docs;