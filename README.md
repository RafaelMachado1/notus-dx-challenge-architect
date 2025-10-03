# Notus DX Challenge – Ambiente de Testes Enterprise-Grade

## Visão Geral

Este projeto entrega um ambiente de testes robusto, automatizado e escalável para a Trilha A do Notus DX Challenge. Desenvolvido com foco em excelência técnica, modularidade e validação rigorosa, o objetivo é facilitar integrações seguras e confiáveis com a Notus API.

## Principais Características

- **SDK TypeScript:** Centraliza todos os métodos de integração, com tipagem forte e validação de dados.
- **Schemas de Validação (Zod):** Garante conformidade dos dados recebidos e enviados.
- **Testes Automatizados (Jest):** Cobertura completa dos cenários de sucesso e erro para todos os endpoints relevantes.
- **Arquitetura Modular:** Separação clara entre SDK, schemas, tipos e proxy, facilitando manutenção e expansão.
- **Documentação Técnica:** Relatórios, arquitetura e evidências organizadas para auditoria e apresentação.

## Estrutura do Projeto

```
├── __tests__/unit/client.test.ts
├── docs/
│   ├── architecture/ARCHITECTURE.md
│   ├── daily-boards/
│   └── FINAL-REPORT.md
├── postman_collection/
│   └── Notus DX Challenge.postman_collection(1).json
├── src/
│   ├── sdk/client.ts
│   ├── schemas/index.ts
│   ├── types/index.ts
│   ├── proxy/api-routes.ts
│   └── errors/index.ts
├── jest.config.js
├── package.json
└── README.md
```

## Como Executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute os testes automatizados:**
   ```bash
   npx jest
   ```

3. **Importe a coleção Postman para validar manualmente os endpoints:**
   - Arquivo disponível em `postman_collection/Notus DX Challenge.postman_collection(1).json`

## Documentação

- [Relatório Final](docs/FINAL-REPORT.md)
- [Arquitetura](docs/architecture/ARCHITECTURE.md)
- [Coleção Postman](postman_collection/Notus%20DX%20Challenge.postman_collection(1).json)

---

## Contato

- **LinkedIn:** [rafa25](https://www.linkedin.com/in/rafa25/)
- **E-mail:** rafaelmartinsmachado25@gmail.com
- **WhatsApp:** +55 24 98826-9179

---

**Este projeto está pronto para demonstração técnica e futuras expansões. Para dúvidas, networking ou oportunidades, entre em contato!**