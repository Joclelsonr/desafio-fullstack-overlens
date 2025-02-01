<div align="center">
  <br />
  <a href="" target="_blank" rel="noopener noreferrer">
    <h1 align="center">NotesApp</h1>
  </a>

  <br />
  <div>
    <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" alt="next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" alt="typescript" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff" alt="shadcn" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white" alt="postgresql" />
  </div>

  <div align="center">
    Sua plataforma intuitiva para organizar e gerenciar anotações. Transforme suas ideias em notas estruturadas com nossa solução que combina simplicidade e recursos avançados para manter seus pensamentos sempre organizados. 
  </div>
</div>

## 📋 <a name="table">Índice</a>

1. 🤖 [Introdução](#introduction)
2. ⚙️ [Tecnologia Utilizadas](#tech-stack)
3. 🔋 [Funcionalidades](#features)
4. 🤸 [Início Rápido](#quick-start)
5. 🕸️ [](#)

## <a name="introduction">🤖 Introdução</a>

Desenvolver uma plataforma de compartilhamento de anotações. Os usuários devem poder criar, editar, excluir e compartilhar anotações com outros usuários.

#### 🌐 Acesse em: [https://overnote-two.vercel.app](https://overnote-two.vercel.app)

## <a name="tech-stack">⚙️ Tecnologia Utilizadas</a>

- **[Next.js](https://nextjs.org/)**
- **[TypeScript](https://www.typescriptlang.org)**
- **[ShadCN](https://ui.shadcn.com)**
- **[Tiptap](https://tiptap.dev)**
- **[Tailwind CSS](https://tailwindcss.com)**
- **[Prisma ORM](https://www.prisma.io)**
- **[PostgreSQL](https://www.postgresql.org)**
- **[React Hook Form](https://react-hook-form.com)**
- **[Zod](https://zod.dev)**

## <a name="features">🔋 Funcionalidades</a>

👉 **Editor Rich Text WYSIWYG**: Crie anotações ricas em texto com suporte a formatação, imagens, códigos e muito mais.

👉 **Autosave durante edição**: Suas anotações são salvas automaticamente enquanto você edita, garantindo que nenhuma alteração seja perdida.

👉 **Feed de anotações geral**: Visualize todas as anotações compartilhadas pela comunidade em um feed centralizado e interativo.

👉 **Feed de anotações do usuário**: Visualize e gerencie todas as suas anotações públicas e privadas em um feed organizado e personalizado.

👉 **Compartilhamento de Anotações**: Compartilhe suas anotações com outros usuários.

👉 **Responsividade**: A plataforma é totalmente responsiva, garantindo uma experiência perfeita em dispositivos móveis e desktops.

👉 **Dark mode**: Alterne entre os temas claro e escuro para uma experiência visual personalizada e confortável.

## <a name="quick-start">🤸 Quick Start</a>

Siga estas etapas para configurar o projeto localmente na sua máquina.

**Pré-requisitos**

Certifique-se de ter o seguinte instalado em sua máquina:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/pt)
- [Npm](https://www.npmjs.com) (Geralmente instalado com node.js)

**Clonando o Repositório**

```bash
git clone https://github.com/Joclelsonr/desafio-fullstack-overlens.git
cd desafio-fullstack-overlens
```

**Instalação**

Instale as dependências do projeto usando npm:

```bash
npm install
```

**Configurar variáveis ​​de ambiente**

Crie um novo arquivo chamado `.env` na raiz do seu projeto e adicione o seguinte conteúdo:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/database
AUTH_SECRET=################
```

Execute as migrations do banco de dados

```bash
npx prisma migrate dev
```

**Executando o Projeto**

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o projeto.
