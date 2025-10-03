# Relatório de Análise: GET /wallets/address (Get Smart Wallet)

---

## 1. Objetivo do Teste

Analisar sistematicamente o endpoint `GET /wallets/address` para validar seu comportamento em múltiplos cenários, a fim de compreender profundamente sua funcionalidade como um buscador e calculador de endereços de Smart Wallets.

---

## 2. Metodologia

Execução de chamadas `GET` via Postman, utilizando query parameters (`externallyOwnedAccount`, `factory`, `salt`) para testar o endpoint contra um conjunto de cenários predefinidos, incluindo inputs válidos, inválidos e o uso de métodos HTTP incorretos.

---

## 3. Sumário dos Resultados e Descobertas

### ✅ Cenário de Sucesso (200 OK)

- **Ação:** Consulta com `externallyOwnedAccount`, `factory` e `salt` de uma wallet existente.
- **Resultado:** Retornou o objeto completo da wallet, com o campo `"registeredAt"` preenchido, confirmando que a carteira existe no sistema e retornando seus detalhes.

### 💡 Descoberta de Design: Calculador de Endereço Determinístico

- **Ação:** Consulta com um `salt` para uma wallet que ainda não foi registrada.
- **Resultado:** A API retorna `200 OK` com o objeto da wallet que *seria* gerado, mas com o campo `"registeredAt": null`.
- **Conclusão:** Esta descoberta é crucial. Ela revela que o endpoint não serve apenas para "buscar" uma wallet, mas atua como um **calculador de endereço determinístico**. Ele sempre retornará os detalhes da Smart Wallet para uma dada combinação de `EOA`, `factory` e `salt`, indicando com `registeredAt` se ela já foi oficialmente criada ou não.

### ❌ Cenário de Erro: Validação de Dados (400 Bad Request)

- **Ação:** Requisição com um `externallyOwnedAccount` malformado (ex: `"0xINVALID_ADDRESS"`) nos query parameters.
- **Resultado:** A API retornou um erro `400 Bad Request` com um objeto `errors` detalhando `code: "invalid_string"` no `path: "externallyOwnedAccount"`, demonstrando um tratamento de erro robusto e específico.

### ❌ Cenário de Erro: Autenticação (403 Forbidden)

- **Ação:** Requisição sem o header `x-api-key` ou com uma chave inválida.
- **Resultado:** O acesso foi bloqueado com um erro `403 Forbidden` e a mensagem `{"message": "Invalid Api key.", "id": "HTTP_EXCEPTION"}`, confirmando que a camada de segurança está funcionando corretamente.

### ❌ Cenário de Erro: Roteamento (404 Not Found)

- **Ação:** Utilização de um método HTTP incorreto (ex: `POST`) na mesma rota.
- **Resultado:** A API retornou `404 Not Found` com a mensagem `{"message": "Cannot POST /api/v1/wallets/address...", "id": "HTTP_EXCEPTION"}`. Isso confirma que a rota existe apenas para o método `GET`.

---

## 4. Conclusão Final da Análise

A investigação do endpoint `GET /wallets/address` está **concluída**. A análise revelou um design de API sofisticado, onde o endpoint atua como um calculador de endereço determinístico, separando a lógica de cálculo da verificação de registro. O tratamento de erros para todos os cenários testados (sucesso, validação, autenticação e roteamento) é robusto e segue as melhores práticas.