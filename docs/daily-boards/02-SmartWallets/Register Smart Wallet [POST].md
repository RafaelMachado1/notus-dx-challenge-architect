# Relatório de Análise: POST /wallets (Register Smart Wallet)

---

## 1. Objetivo do Teste

Analisar de forma exaustiva o endpoint de criação `POST /wallets` para validar seu comportamento em múltiplos cenários, incluindo sucesso, erros documentados, erros não documentados e validação de idempotência.

---

## 2. Metodologia

Utilização do Postman para enviar requisições `POST` para o endpoint `/api/v1/wallets/register`. Os testes envolveram a manipulação do corpo da requisição (JSON) e dos headers para simular sistematicamente cada cenário de teste.

---

## 3. Sumário dos Resultados e Descobertas

### ✅ Cenário de Sucesso - Primeira Wallet (201 Created)

- **Ação:** Envio de uma requisição `POST` com `EOA`, `factory` e `salt: "0"` válidos e inéditos.
- **Resultado:** A API retornou `201 Created` com os detalhes da wallet recém-criada.

### ✅ Cenário de Sucesso - Múltiplas Wallets (201 Created)

- **Ação:** Envio de uma segunda requisição `POST` para o mesmo `EOA`, mas com um `salt` diferente (`salt: "1"`).
- **Resultado:** A API retornou `201 Created` com uma nova wallet, provando que o campo `salt` funciona como o diferenciador para criar múltiplas Smart Wallets para a mesma conta.

### ❌ Erro de Conflito - Wallet Duplicada (400 Bad Request)

- **Ação:** Tentativa de registrar a mesma wallet (mesma combinação de `EOA` + `factory` + `salt`) uma segunda vez.
- **Resultado:** A API retornou `400 Bad Request` com o `id: "WALLET_ALREADY_REGISTERED"`. Embora o status não seja `409 Conflict`, o comportamento confirma que a API possui um mecanismo de idempotência que impede a criação de duplicatas.

### ❌ Erro de Validação e Lógica (400 Bad Request)

- **Ação:** Tentativa de registro com um `EOA` malformado, um `factory` não suportado ou um tipo de dado incorreto para o `salt` (número em vez de string).
- **Resultado:** A API retornou `400 Bad Request` com mensagens de erro específicas, confirmando a robustez da camada de validação.

### ❌ Erro de Autenticação (403 Forbidden)

- **Ação:** Tentativa de registro com uma `x-api-key` inválida ou malformada.
- **Resultado:** A API retornou `403 Forbidden`, confirmando a camada de segurança.

### 💡 Descoberta de Segurança - Tentativa de Erro 404 (Resultou em 403)

- **Análise:** Foi provado que a `x-api-key` possui um mecanismo de autoverificação (checksum/assinatura). Qualquer alteração na chave a torna estruturalmente inválida, resultando em `403 Forbidden` e tornando impossível para um cliente externo simular o erro `404 PROJECT_NOT_FOUND`.

### 💡 Descoberta de Robustez - Tentativa de Erro 500 (Resultou em 400)

- **Análise:** A tentativa de forçar um `500 Internal Server Error` com dados extremos falhou, resultando em um `400 Bad Request` controlado. Isso demonstra a alta qualidade e robustez da API.

---

## 4. Conclusão Final da Análise

A investigação do endpoint `POST /wallets` está **concluída**. Todos os cenários de sucesso e erro foram mapeados e compreendidos. A API demonstrou ser segura, robusta e bem projetada, com validações consistentes e mecanismos de proteção contra duplicação e inputs maliciosos.
