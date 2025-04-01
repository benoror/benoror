export type PortfolioItem = {
  id: string
  title: string
  category: string
  description: string
  fullDescription: string
  image: string
  techStack: string[]
  url?: string
  github?: string
  section: "projects" | "publications" | "talks"
}

export const portfolioItems: PortfolioItem[] = [
  // Projects
  {
    id: "project-1",
    title: "E-commerce Platform",
    category: "Web Application",
    description: "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
    fullDescription: `
# E-commerce Platform

A comprehensive e-commerce solution built with modern web technologies.

## Features

- Product catalog with categories and search
- User authentication and profiles
- Shopping cart and wishlist
- Secure checkout process
- Order management
- Admin dashboard
- Analytics and reporting

## Technical Details

The application uses a microservices architecture with separate services for product management, user authentication, cart management, and order processing. The frontend is built with React and communicates with the backend via RESTful APIs.

![E-commerce Dashboard](/images/portfolio/ecommerce-dashboard.jpg)

The system is deployed on AWS using containerization for scalability and reliability.
    `,
    image: "/images/portfolio/ecommerce.jpg",
    techStack: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
    url: "https://example.com/ecommerce",
    github: "https://github.com/benoror/ecommerce",
    section: "projects",
  },
  {
    id: "project-2",
    title: "Task Management System",
    category: "Web Application",
    description: "A collaborative task management system for teams with real-time updates.",
    fullDescription: `
# Task Management System

A collaborative task management system designed for teams to organize and track their work efficiently.

## Features

- Task creation and assignment
- Project organization
- Due dates and reminders
- Real-time collaboration
- File attachments
- Progress tracking
- Reporting and analytics

## Technical Implementation

The system uses WebSockets for real-time updates and a React frontend with a Node.js backend. Data is stored in MongoDB with Redis for caching.

![Task Board View](/images/portfolio/task-board.jpg)

Authentication is handled via JWT tokens, and the application supports role-based access control.
    `,
    image: "/images/portfolio/task-management.jpg",
    techStack: ["React", "WebSockets", "Node.js", "MongoDB", "Redis"],
    url: "https://example.com/tasks",
    github: "https://github.com/benoror/task-manager",
    section: "projects",
  },
  {
    id: "project-3",
    title: "Financial Dashboard",
    category: "Data Visualization",
    description: "Interactive financial dashboard with real-time data visualization and analytics.",
    fullDescription: `
# Financial Dashboard

An interactive financial dashboard that provides real-time insights into financial data.

## Features

- Real-time data visualization
- Custom chart creation
- Financial metrics and KPIs
- Data export and reporting
- Alerts and notifications
- Mobile-responsive design

## Technical Details

The dashboard is built with React and D3.js for visualizations. It connects to various financial APIs to fetch real-time data and uses Redux for state management.

![Financial Charts](/images/portfolio/financial-charts.jpg)

The application is optimized for performance with lazy loading and virtualization for handling large datasets.
    `,
    image: "/images/portfolio/financial-dashboard.jpg",
    techStack: ["React", "D3.js", "Redux", "TypeScript", "REST APIs"],
    url: "https://example.com/finance",
    section: "projects",
  },
  // Publications
  {
    id: "publication-1",
    title: "Modern Web Architecture Patterns",
    category: "Technical Article",
    description: "An in-depth exploration of modern web architecture patterns and best practices.",
    fullDescription: `
# Modern Web Architecture Patterns

This article explores the evolution of web architecture patterns and provides insights into modern approaches.

## Topics Covered

- Monolithic vs. microservices architecture
- Serverless computing
- JAMstack architecture
- Event-driven architecture
- GraphQL and REST API design
- Progressive Web Apps
- Performance optimization strategies

## Key Takeaways

The article discusses how to choose the right architecture for different types of applications and the trade-offs involved in each approach.

![Architecture Diagram](/images/portfolio/architecture-diagram.jpg)

It also includes case studies of successful implementations and lessons learned from real-world projects.
    `,
    image: "/images/portfolio/web-architecture.jpg",
    techStack: ["Architecture", "Microservices", "Serverless", "JAMstack"],
    url: "https://medium.com/@benoror/web-architecture",
    section: "publications",
  },
  {
    id: "publication-2",
    title: "Scaling Node.js Applications",
    category: "Technical Guide",
    description: "A comprehensive guide to scaling Node.js applications for high traffic and performance.",
    fullDescription: `
# Scaling Node.js Applications

This comprehensive guide covers strategies and techniques for scaling Node.js applications to handle high traffic and maintain performance.

## Topics Covered

- Horizontal and vertical scaling
- Load balancing strategies
- Caching mechanisms
- Database optimization
- Microservices architecture
- Containerization and orchestration
- Monitoring and performance tuning

## Implementation Examples

The guide includes code examples and configuration snippets for implementing various scaling strategies.

![Node.js Scaling Diagram](/images/portfolio/nodejs-scaling.jpg)

It also discusses real-world case studies of companies that successfully scaled their Node.js applications to handle millions of users.
    `,
    image: "/images/portfolio/nodejs-scaling.jpg",
    techStack: ["Node.js", "Kubernetes", "Redis", "MongoDB", "Docker"],
    url: "https://dev.to/benoror/scaling-nodejs",
    section: "publications",
  },
  // Talks
  {
    id: "talk-1",
    title: "The Future of Web Development",
    category: "Conference Talk",
    description: "A presentation on emerging trends and technologies in web development.",
    fullDescription: `
# The Future of Web Development

This talk explores emerging trends and technologies that are shaping the future of web development.

## Key Points

- WebAssembly and its impact on web performance
- AI and machine learning integration in web applications
- Edge computing and distributed systems
- New JavaScript features and frameworks
- Web3 and decentralized applications
- Accessibility and inclusive design
- Sustainability in web development

## Presentation Highlights

The talk includes live demos of WebAssembly applications and AI-powered web features.

![Conference Presentation](/images/portfolio/conference-talk.jpg)

It also discusses how developers can prepare for these changes and develop the skills needed for the future.
    `,
    image: "/images/portfolio/web-dev-future.jpg",
    techStack: ["WebAssembly", "AI", "Edge Computing", "JavaScript", "Web3"],
    url: "https://youtube.com/watch?v=example",
    section: "talks",
  },
  {
    id: "talk-2",
    title: "Building Scalable Microservices",
    category: "Workshop",
    description: "A hands-on workshop on designing and implementing scalable microservices architecture.",
    fullDescription: `
# Building Scalable Microservices

This workshop provides a hands-on approach to designing and implementing scalable microservices architecture.

## Workshop Content

- Microservices design principles
- Service discovery and communication
- Data management across services
- Testing strategies
- Deployment and orchestration
- Monitoring and observability
- Handling failures and resilience

## Practical Exercises

The workshop includes practical exercises where participants build a microservices-based application from scratch.

![Microservices Workshop](/images/portfolio/microservices-workshop.jpg)

Participants learn how to implement service discovery, handle inter-service communication, and deploy their services using Docker and Kubernetes.
    `,
    image: "/images/portfolio/microservices.jpg",
    techStack: ["Microservices", "Docker", "Kubernetes", "Node.js", "API Gateway"],
    url: "https://workshop.example.com/microservices",
    section: "talks",
  },
]

// Add more dummy items to have around 20 projects
for (let i = 4; i <= 20; i++) {
  portfolioItems.push({
    id: `project-${i}`,
    title: `Project ${i}`,
    category: i % 3 === 0 ? "Mobile App" : i % 2 === 0 ? "Web Application" : "Data Analysis",
    description: `Description for Project ${i}. This is a brief overview of what the project does and its main features.`,
    fullDescription: `
# Project ${i}

This is a detailed description of Project ${i}.

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Details

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.

![Project Screenshot](/images/portfolio/placeholder.jpg)

## Implementation

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
    `,
    image: "/images/portfolio/placeholder.jpg",
    techStack: ["React", "Node.js", "MongoDB", "TypeScript"].slice(0, (i % 4) + 1),
    url: i % 2 === 0 ? `https://example.com/project-${i}` : undefined,
    github: i % 3 === 0 ? `https://github.com/benoror/project-${i}` : undefined,
    section: "projects",
  })
}

// Add more publications
for (let i = 3; i <= 6; i++) {
  portfolioItems.push({
    id: `publication-${i}`,
    title: `Publication ${i}`,
    category: i % 2 === 0 ? "Technical Article" : "Research Paper",
    description: `Description for Publication ${i}. This is a brief overview of what the publication covers.`,
    fullDescription: `
# Publication ${i}

This is a detailed description of Publication ${i}.

## Topics Covered

- Topic 1
- Topic 2
- Topic 3

## Key Takeaways

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.

![Publication Image](/images/portfolio/placeholder.jpg)

## Conclusion

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
    `,
    image: "/images/portfolio/placeholder.jpg",
    techStack: ["Architecture", "Best Practices", "Performance"].slice(0, (i % 3) + 1),
    url: `https://example.com/publication-${i}`,
    section: "publications",
  })
}

// Add more talks
for (let i = 3; i <= 4; i++) {
  portfolioItems.push({
    id: `talk-${i}`,
    title: `Talk ${i}`,
    category: i % 2 === 0 ? "Conference Talk" : "Workshop",
    description: `Description for Talk ${i}. This is a brief overview of what the talk covers.`,
    fullDescription: `
# Talk ${i}

This is a detailed description of Talk ${i}.

## Key Points

- Point 1
- Point 2
- Point 3

## Presentation Highlights

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.

![Talk Image](/images/portfolio/placeholder.jpg)

## Conclusion

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
    `,
    image: "/images/portfolio/placeholder.jpg",
    techStack: ["JavaScript", "React", "Node.js"].slice(0, (i % 3) + 1),
    url: `https://example.com/talk-${i}`,
    section: "talks",
  })
}

