# System Design & Architecture Specification - MeatTech

## 1. Global Architectural Taxonomy
The MeatTech system uses a **3-Tier Monolithic Web Architecture** mapped across distributed infrastructure nodes to prevent performance bottlenecks.

```mermaid
graph TD
    subgraph Presentation Layer
        UI[React.js Client App / Responsive Tailwind UI]
    end
    subgraph Application Control Layer
        API[Node.js Engine / Express.js Routing Services]
    end
    subgraph Data Resource Layer
        DB[(PostgreSQL Primary Instance)]
        Cache[(Redis Cache Engine)]
    end

    UI <-- JSON over HTTPS --> API
    API <-- TypeORM Mappings --> DB
    API <-- Key/Value Lookups --> Cache