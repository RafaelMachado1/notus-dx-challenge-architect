# Relatório de Análise: POST /wallets/{walletAddress}/deposit

---

## 1. Objetivo do Teste

Analisar sistematicamente o endpoint `POST /wallets/{walletAddress}/deposit` para validar seu comportamento na criação de transações de depósito de tokens ERC-20 em Smart Wallets, compreendendo sua funcionalidade e integração com a blockchain.

---

## 2. Metodologia

Execução de chamadas `POST` via Postman, testando o endpoint contra um conjunto de cenários predefinidos, incluindo o caminho feliz e casos de erro planejados.

---

## 3. Sumário dos Resultados e Descobertas

### ✅ Cenário de Sucesso (200 OK)

- **Ação:** Requisição com `walletAddress` registrado, `amount` válido, `chainId` suportado (Polygon), `token` ERC-20 (USDC) e `fromAddress` EOA com saldo suficiente.
- **Resultado:** Retornou o objeto `transfer` completo com campos `from`, `to`, `value`, `data` e `estimateGasCost`, confirmando a geração bem-sucedida dos dados para a transação de depósito.

### 💡 Descoberta de Design: Estrutura da Transação

- **Ação:** Análise da resposta de sucesso.
- **Resultado:** O endpoint gera dados codificados para uma chamada ERC-20 `transfer`, com `to` apontando para o contrato do token e `data` contendo o endereço da Smart Wallet como destinatário.
- **Conclusão:** Esta descoberta revela que o endpoint não executa a transação, mas prepara os dados necessários para que o EOA assine e envie via wallet externa, seguindo um padrão de "prepare-then-execute".

### ❌ Cenário de Erro: Validação de Dados (400 Bad Request)

- **Ação:** Requisição com um `fromAddress` malformado (ex: `"0xINVALID_ADDRESS"`).
- **Resultado:** A API retornou um erro `400 Bad Request` com um objeto de erro detalhando `code: "invalid_string"` no `path: "fromAddress"`, demonstrando um tratamento de erro robusto e específico.

### ❌ Cenário de Erro: Autenticação (403 Forbidden)

- **Ação:** Requisição sem o header `x-api-key` ou com uma chave inválida.
- **Resultado:** O acesso foi bloqueado com um erro `403 Forbidden` e a mensagem `{"message": "Invalid Api key.", "id": "HTTP_EXCEPTION"}`, confirmando que a camada de segurança está funcionando corretamente.

### ❌ Cenário de Erro: Roteamento (404 Not Found)

- **Ação:** Utilização de um método HTTP incorreto (ex: `GET`) na mesma rota.
- **Resultado:** A API retornou `404 Not Found` com a mensagem `{"message": "Cannot GET /api/v1/wallets/...", "id": "HTTP_EXCEPTION"}`. Isso indica um erro de protocolo, confirmando que a rota existe apenas para o método `POST`.

### ❌ Cenário de Erro: Saldo Insuficiente (500 Internal Server Error)

- **Ação:** Requisição com um EOA sem saldo de USDC na rede especificada.
- **Resultado:** A API retornou um erro `500 Internal Server Error` com a mensagem `{"message": "Execution reverted with reason: ERC20: transfer amount exceeds balance.", "id": "FAILED_TO_ESTIMATE_TRANSFER"}`, demonstrando uma validação de saldo durante a estimativa de gas.

---

## 4. Conclusão Final da Análise

A investigação do endpoint `POST /wallets/{walletAddress}/deposit` está **concluída**. A análise revelou um design eficiente para preparar depósitos ERC-20, com validação de saldo e geração de dados transacionais. O tratamento de erros para todos os cenários testados (sucesso, validação, autenticação, roteamento e lógica de negócio) é robusto e segue as melhores práticas.