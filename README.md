# Clínica Patinhas - Frontend

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

## Sobre o Projeto

A **Clínica Patinhas** é uma plataforma web profissional para gerenciamento de clínica veterinária, permitindo:

- Cadastro e gerenciamento de pacientes (animais)
- Agendamento e gerenciamento de consultas
- Gestão de veterinários e especialidades
- Catálogo de serviços com preços
- Perfil de usuário e configurações
- Sistema de autenticação seguro
- Interface responsiva com tema claro/escuro

## Tecnologias Utilizadas

### Frontend
- **React** 19.2.0 - Biblioteca UI
- **TypeScript** - Type-safe JavaScript
- **React Router** 7.0 - Roteamento
- **Tailwind CSS** 4.1 - Estilização utilitária
- **React Hook Form** 7.60 - Gerenciamento de formulários
- **Zod** 3.25 - Validação de esquemas
- **Axios** 1.6 - Cliente HTTP
- **Lucide React** - Ícones
- **date-fns** - Manipulação de datas
- **Vite** 6.0 - Build tool

### Desenvolvimento
- ESLint - Linting
- TypeScript - Type checking
- PostCSS - Processamento CSS

## Funcionalidades do Frontend

### Páginas Implementadas

| Página | Descrição | Status |
|--------|-----------|--------|
| **Home** | Página inicial com serviços e informações 
| **Login** | Autenticação de usuários 
| **Signup** | Cadastro de novos usuários
| **Dashboard** | Visão geral com estatísticas 
| **Pacientes** | CRUD de pacientes com upload de foto 
| **Consultas** | Agendamento e gerenciamento de consultas
| **Veterinários** | Gerenciamento de veterinários 
| **Serviços** | Catálogo de serviços 
| **Perfil** | Edição de perfil do usuário 
| **Configurações** | Tema e preferências
| **404** | Página não encontrada 

### Recursos

-  Autenticação com JWT
-  Proteção de rotas
-  Formulários com validação Zod
-  Estados de loading, error e empty
-  Upload de fotos
-  Pesquisa e filtros
-  Tema claro/escuro
-  Modo responsivo (Mobile, Tablet, Desktop)
- Integração com API REST
-  Tatamento de erros global

## Como Instalar e Rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git

### Instalação Rápida

\`\`\`bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/clinica-patinhas-frontend.git
cd clinica-patinhas-frontend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Rodar em desenvolvimento
npm run dev
\`\`\`

Acesse: `http://localhost:5173`

### Comandos Disponíveis

\`\`\`bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
npm run lint     # Verifica erros de linting
\`\`\`


## Integração com Backend

O frontend está **100% preparado** para integração com um backend real:

### Como Começar

1. **Configure o endpoint da API**:
   \`\`\`bash
   # .env
   VITE_API_URL=http://seu-backend:3001/api
   \`\`\`

2. **Use os services** para fazer chamadas:
   \`\`\`typescript
   import { patientService } from '../services/patient.service'
   
   const response = await patientService.getAll()
   \`\`\`

3. **Os tipos e validações** já estão definidos:
   \`\`\`typescript
   // Zod validation
   const PatientSchema = z.object({
     name: z.string(),
     species: z.string(),
     ...
   })
   
   // TypeScript types
   interface Patient {
     id: string
     name: string
     ...
   }
   \`\`\`

### Endpoints Esperados do Backend

\`\`\`
POST   /api/auth/login
POST   /api/auth/signup
GET    /api/auth/me
PUT    /api/auth/profile

GET    /api/patients
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id
POST   /api/patients/:id/photo

GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
GET    /api/appointments/search?q=

GET    /api/veterinarians
POST   /api/veterinarians
PUT    /api/veterinarians/:id
DELETE /api/veterinarians/:id
GET    /api/veterinarians/specialty/:specialty

GET    /api/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
\`\`\`


## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para detalhes.

## Autores

- **Ellen** - Desenvolvimento Frontend




## Changelog

### v1.0.0 (2024-01-15)
- Inicialização do projeto
- Implementação de todas as páginas
- Sistema de autenticação
- Integração com API
- Tema claro/escuro

## Roadmap

- [ ] PWA (Progressive Web App)
- [ ] Notificações em tempo real
- [ ] Relatórios em PDF
- [ ] Integração com WhatsApp
- [ ] App mobile (React Native)
- [ ] Múltiplas linguagens (i18n)

---


