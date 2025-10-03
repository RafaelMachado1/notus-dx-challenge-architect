# Arquitetura Notus DX Challenge (Enterprise-Grade)

## Visão Geral

Este projeto foi desenhado para ser superior em robustez, modularidade e testabilidade em relação aos concorrentes. A arquitetura é enxuta, focada apenas nos componentes essenciais para garantir qualidade, rastreabilidade e facilidade de manutenção.

## Componentes Principais

- **SDK (`src/sdk/client.ts`)**  
  Centraliza toda a lógica de integração com a Notus API. Cada método representa um endpoint testado, com tipagem forte e validação de dados.

- **Schemas (`src/schemas/index.ts`)**  
  Validação de dados usando Zod, garantindo que todas as respostas e payloads estejam em conformidade com o contrato esperado.

- **Types (`src/types/index.ts`)**  
  Interfaces e tipos TypeScript para todas as entidades do projeto, garantindo clareza e segurança na manipulação dos dados.

- **Testes Automatizados (`__tests__/unit/client.test.ts`)**  
  Cobertura unitária completa dos métodos do SDK, simulando todos os cenários testados manualmente no Postman.

## Fluxo de Dados

```
Frontend/Scripts → SDK → Schemas/Types → Notus API
```

- O frontend ou scripts consomem o SDK.
- O SDK valida os dados com schemas e tipos antes de enviar para a Notus API.
- Os testes automatizados garantem que cada cenário está coberto e funcionando.

## Decisões Técnicas

- **SDK-First:**  
  Toda a lógica de integração fica centralizada, facilitando manutenção e reuso.

- **Validação com Zod:**  
  Respostas e payloads são validados antes de serem usados, evitando erros inesperados.

- **Testes Automatizados:**  
  Cada cenário testado manualmente foi automatizado, garantindo qualidade contínua.

- **Arquitetura Enxuta:**  
  Pastas e arquivos vazios foram removidos para manter o projeto limpo e profissional.

## Vantagens

- Fácil manutenção e expansão.
- Superioridade em cobertura de testes e validação de dados.
- Estrutura clara e rastreável para recrutadores e equipes técnicas.

