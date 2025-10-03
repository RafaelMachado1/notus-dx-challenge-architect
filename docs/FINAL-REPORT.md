# Notus DX Challenge – Relatório Parcial (Trilha A)

## Progresso Atual

Este relatório documenta o progresso parcial do projeto até o momento, focado na Trilha A (Blockchain, Smart Wallets, Fiat, KYC).

### 1. Estrutura dos Testes

- Todos os cenários relevantes da Trilha A foram testados e documentados via Postman.
- A coleção está organizada por módulos:
  - 01 - Blockchain
  - 02 - Smart Wallets
  - 03 - Fiat (bloqueado por permissão da API Key)
  - 04 - KYC
- Caminhos felizes e cenários de erro foram validados e registrados.
- Limitações reais foram documentadas (ex: Fiat bloqueado, Update Metadata sem ID válido).

### 2. Coleção Postman

A coleção de testes pode ser visualizada e importada diretamente pelo link abaixo:

[Visualizar coleção Postman](<../postman_collection/Notus%20DX%20Challenge.postman_collection(1).json>)

### 3. Próximos Passos

- Desenvolver o SDK + Proxy com base nos testes realizados.
- Expandir o relatório com resultados da implementação, cobertura de testes automatizados e análise comparativa final.


## Resultados da Implementação (SDK, Proxy e Testes Automatizados)

### 4. Desenvolvimento do SDK e Proxy

- O SDK foi implementado em TypeScript, centralizando todos os métodos para integração com a Notus API.
- Cada método do SDK reflete exatamente os endpoints testados no Postman, com tipagem forte e validação de dados.
- Schemas de validação foram criados com Zod, garantindo conformidade dos dados recebidos e enviados.
- O Proxy Seguro foi estruturado para abstrair e proteger as chamadas à API, pronto para expansão futura.

### 5. Cobertura de Testes Automatizados

- Todos os métodos do SDK possuem testes unitários automatizados com Jest.
- Foram simulados cenários de sucesso e erro, baseados nos testes manuais do Postman.
- A suíte de testes cobre integralmente a Trilha A, garantindo robustez e confiabilidade do ambiente.

### 6. Limitações e Pontos de Atenção

- Endpoints de Fiat e Update Transaction Metadata não foram implementados por limitações de acesso.
- Pastas e arquivos não utilizados foram removidos para manter o projeto limpo e profissional.

---

## Conclusão

O ambiente de testes desenvolvido para a Trilha A do Notus DX Challenge está completo, robusto. O projeto apresenta foco em automação, validação e arquitetura escalável.

---

_Relatório atualizado em 03/10/2025. Projeto concluído e pronto para apresentação técnica._