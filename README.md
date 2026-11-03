# Lista de Compras Inteligente

Aplicação móvel multiplataforma desenvolvida em **React Native (Expo)** para gestão de compras de supermercado em tempo real, com categorização por secções e persistência de dados local.

## Tecnologias Utilizadas

- **Framework Base:** React Native com Expo SDK 57
- **Navegação:** Expo Router (File-based routing em abas)
- **Gestão de Estado:** React Hooks (`useState` e `useEffect`)
- **Persistência Nativa:** `@react-native-async-storage/async-storage`

## Funcionalidades Implementadas

- **Organização por Secções:** Classificação de itens por corredores do supermercado (_Mercearia, Hortifruti, Carnes, Limpeza, Padaria_) com ordenação alfabética automática.
- **Controlo de Estado (Pendente / No Carrinho):** Movimentação rápida de itens com feedback visual imediato.
- **Cálculo em Tempo Real:** Soma dinâmica do valor total acumulado dos produtos que estão no carrinho.
- **Armazenamento Offline:** Gravação automática da lista na memória interna do dispositivo.

## Arquitetura e Decisões Técnicas

- **Fluxo de Dados Reativo:** Utilização do `useEffect` monitorizando a matriz principal de itens para acionar a gravação assíncrona no `AsyncStorage` a cada alteração.
- **Renderização Otimizada:** Uso do componente `FlatList` para garantir fluidez na rolagem das listas de itens pendentes e concluídos.

## Como Executar o Projeto

1. Clone o repositório: `git clone https://github.com/Daviw2/lista-compras-inteligente.git`
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npx expo start`
4. Pressione `a` para abrir no emulador Android ou leia o código QR com a aplicação Expo Go.
