# Relatório de Análise: PATCH /wallets/transactions/{transactionId}/metadata (Update Transaction Metadata)

---

## 1. Objetivo do Teste

Analisar o endpoint `PATCH .../metadata` para validar sua funcionalidade de atualização de metadados de uma transação e verificar seu comportamento em cenários de erro, especialmente quanto ao formato do campo `metadata`.

---

## 2. Metodologia

Execução de chamadas `PATCH` via Postman, variando o formato do corpo da requisição (`metadata` como objeto e como string JSON) e utilizando um `transactionId` falso para testar os cenários de erro.

---

## 3. Sumário dos Resultados

### ❌ Descoberta Crítica: Inconsistência no Tratamento de Erros

- **Ação:** Envio de requisições `PATCH` com o campo `metadata` como objeto, conforme sugerido pela documentação.
- **Resultado:** A API apresentou comportamento inconsistente:
  - Em alguns testes, retornou `400 Bad Request` com mensagem clara de tipo inválido (`Expected string, received object`).
  - Em outros, retornou `404 Not Found` com erro de roteamento (`Cannot GET .../metadata`).
- **Conclusão:** O tratamento de erros para o campo `metadata` é inconsistente. O formato correto aceito pela API é **string JSON**. Essa inconsistência representa uma falha de Developer Experience (DX) e deve ser reportada.

### ❌ Cenário de Erro: Roteamento (404 Not Found)

- **Ação:** Requisição `PATCH` para um `transactionId` inexistente, utilizando o formato de body correto (`metadata` como string JSON).
- **Resultado:** A API retornou `404 Not Found` com mensagem específica: `{"message": "Could not find the transaction by the given parameters", "id": "TRANSACTION_NOT_FOUND"}`.

### ❌ Cenário de Erro: Validação de Dados (400 Bad Request)

- **Ação:** Requisição `PATCH` com o campo `metadata` como objeto.
- **Resultado:** A API retornou `400 Bad Request` com mensagem detalhada sobre o tipo inválido, indicando que espera uma string.

### ✅ Cenários Bloqueados (200 OK)

- O cenário de sucesso permanece bloqueado, pois exige um `transactionId` válido, que só pode ser obtido através de outros endpoints.

---

## 4. Conclusão Final da Análise

A investigação deste endpoint revelou uma inconsistência crítica no tratamento de erros para o campo `metadata`. O formato correto é string JSON, e o envio como objeto pode resultar em diferentes respostas de erro.

**Importante:** O teste de sucesso (200 OK) não pôde ser realizado, pois não foi possível obter um `transactionId` válido durante os testes. Recomenda-se que, para validar o caminho feliz, seja obtido um ID de transação gerado por outros endpoints da API.

Com isso, a análise deste endpoint está concluída para os cenários de erro e limitações encontradas.
