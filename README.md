# 🎁 Secret Santa Gift
Este projeto é uma aplicação web que facilita a organização de um sorteio de amigo secreto (Secret Santa) de forma prática, permitindo definir participantes e sugestões de presentes. O app também gera um QR code para que os participantes possam escanear e visualizar quem sortearam

##  🚀 Funcionalidades
Sorteio de Amigo Secreto: O app realiza um sorteio entre os participantes, garantindo que ninguém tire a si mesmo.
Definir Participantes: Os participantes podem ser adicionados ao sorteio.
Sugestões de Presentes: Permite adicionar sugestões personalizadas de presentes para cada participante.
Geração de QR Code: O sorteio gera um QR code que pode ser escaneado pelos participantes para ver o resultado.
Interface amigável: Fácil de usar, com uma interface intuitiva que guia os usuários por todo o processo.

## 🛠️ Tecnologias Utilizadas

React.js: Biblioteca JavaScript para construir interfaces de usuário.
Styled Components: Para estilização dinâmica e modular dos componentes.
React QR Code: Utilizado para gerar e exibir QR Codes para os participantes.
Hooks do React: Para gerenciar estado e efeitos colaterais de forma eficiente.


## 🖥️ Como Rodar o Projeto
Pré-requisitos
Node.js instalado na máquina (versão 16+).
Gerenciador de pacotes npm ou yarn.

## Passo a passo


### Clone o repositório
``
git clone https://github.com/seu-usuario/amigo-secreto.git
``

### Navegue até o diretório do projeto

``
cd amigo-secreto
``

### Instale as dependências

Com npm:
``
npm install
``

Com yarn:
``
yarn install
``

### Inicie o servidor de desenvolvimento

Com npm:
``
npm start
``

Com yarn:
``
yarn start
``

Acesse o app no navegador Abra http://localhost:3000 para visualizar o projeto.

## 📂 Estrutura do Projeto

``
src/
│
├── components/
│   ├── Input.js      # Componente para os campos de entrada de texto
│   ├── Button.js     # Componente de botão reutilizável
│   ├── QRCodeModal.js # Modal para exibir o QR Code do sorteio
│   └── ...
│
├── App.js            # Componente principal da aplicação
├── index.js          # Arquivo principal de inicialização do React
└── styles.js         # Estilizações globais e dos componentes usando Styled Components
``


## 📝 Como Funciona

Adicionar Participantes: Os usuários podem adicionar os participantes do sorteio.
Definir Regras: É possível definir se algum participante não pode tirar outro específico.
Valor do Presente: Defina o valor máximo do presente para todos os participantes.
Sugestões de Presentes: O app permite que cada participante sugira presentes que gostaria de receber.
Gerar QR Code: Após realizar o sorteio, o app gera um QR Code para que os participantes possam escanear e visualizar o resultado de forma secreta.
Novo Sorteio: O botão "Novo Sorteio" permite reiniciar o processo e realizar um novo sorteio.
