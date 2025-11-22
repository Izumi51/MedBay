# 🏥 MedBay - Sistema de Gestão Médica

**MedBay** é uma plataforma digital completa desenvolvida para facilitar a interação entre médicos e pacientes. O sistema resolve desafios comuns no agendamento de consultas, gestão de horários e registro de histórico médico, oferecendo uma experiência moderna e eficiente.

Este projeto foi desenvolvido como parte da avaliação da disciplina de Análise e Desenvolvimento de Sistemas na FAETERJ-Rio.

## 🚀 Funcionalidades

O sistema atende a diferentes perfis de usuário com as seguintes funcionalidades implementadas:

### 🧑‍⚕️ Pacientes

  * **Cadastro e Login:** Criação de conta segura.
  * **Busca de Médicos:** Filtragem por especialidade.
  * **Agendamento:** Marcação de consultas (Presencial ou Telemedicina).
  * **Histórico de Consultas:** Visualização de agendamentos passados e futuros.
  * **Cancelamento:** Possibilidade de cancelar consultas agendadas.

### 👨‍⚕️ Médicos

  * **Dashboard Profissional:** Visualização da agenda diária.
  * **Prontuário Eletrônico:** Registro de histórico médico e diagnósticos.
  * **Prescrição Digital:** Emissão de receitas médicas digitais.

-----

## 🛠️ Tecnologias Utilizadas

### Backend (API)

  * **Java 17**
  * **Spring Boot 3.5.7**
  * **Spring Security + JWT (Auth0):** Autenticação e Autorização robustas.
  * **Spring Data JPA:** Camada de persistência de dados.
  * **PostgreSQL:** Banco de dados relacional.
  * **Lombok:** Redução de código boilerplate.
  * **Maven:** Gerenciamento de dependências.

### Frontend (Web)

  * **React 19**
  * **Vite:** Build tool rápida e moderna.
  * **TailwindCSS:** Estilização responsiva e utilitária.
  * **React Router:** Navegação SPA (Single Page Application).
  * **Axios:** Cliente HTTP para comunicação com a API.
  * **Lucide React:** Biblioteca de ícones.

-----

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

  * [Java JDK 17+](https://www.oracle.com/java/technologies/downloads/)
  * [Node.js 18+](https://nodejs.org/)
  * [PostgreSQL](https://www.postgresql.org/)
  * [Git](https://git-scm.com/)

-----

## 🏃‍♂️ Como Rodar o Projeto

### 1\. Configuração do Banco de Dados

Crie um banco de dados no PostgreSQL chamado `medBay`.
As credenciais padrão configuradas no projeto são:

  * **URL:** `jdbc:postgresql://localhost:5432/medBay`
  * **Usuário:** `postgres`
  * **Senha:** `root`

> **Nota:** Se suas credenciais forem diferentes, altere o arquivo `api/src/main/resources/application.properties`.

### 2\. Executando o Backend (API)

```bash
# Clone o repositório
git clone https://github.com/Izumi51/MedBay.git
cd MedBay/api

# Instalar dependências e rodar o projeto
./mvnw spring-boot:run
```

O servidor iniciará na porta **8080**.

### 3\. Executando o Frontend

Abra um novo terminal:

```bash
cd MedBay/frontend

# Instalar dependências do Node
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

O frontend estará acessível em `http://localhost:5173`.

-----

## 📂 Estrutura do Projeto

O projeto é dividido em dois diretórios principais:

  * `/api`: Contém todo o código fonte do Backend em Java/Spring Boot.
      * `controller`: Endpoints REST (ex: `ConsultaController`, `MedicoController`).
      * `model`: Entidades do banco de dados (ex: `Usuario`, `Consulta`).
      * `repository`: Interfaces de acesso a dados.
      * `service`: Regras de negócio e segurança.
  * `/frontend`: Contém a aplicação React.
      * `src/pages`: Telas da aplicação (Login, Agendamento, Dashboard).
      * `src/components`: Componentes reutilizáveis (Layout, Navbar).
      * `src/context`: Gerenciamento de estado global (AuthContext).

-----

## 👥 Autores

Projeto desenvolvido pelos alunos de **Análise e Desenvolvimento de Sistemas** da FAETERJ-Rio[cite: 27]:

  * **Filipe Rodrigues Albuquerque** [cite: 29]
  * **João Paulo Izumi de Oliveira** [cite: 30]

-----

## 📄 Licença

Este projeto é de uso acadêmico.