# Daily Board - Sessão: GET /tokens

---

## Sessão de Teste

**1. Qual é o objetivo desta sessão?**
Validar o funcionamento e a segurança do endpoint de descoberta `GET /tokens`.

---

**2. Qual abordagem você vai usar?**
Teste via Postman, utilizando a variável `crypto_base_url` e autenticação via header. Foram testados cenários de sucesso e de falha de autorização.

---

**3. Há algo que precisa ser configurado antes de começar?**
Nenhuma configuração adicional além do ambiente já estabelecido.

---

**4. Você conseguiu atingir o objetivo da sessão?**

- [x] Sim.

---

**5. Problemas encontrados**
Nenhum. O endpoint se comportou conforme o esperado em todos os cenários testados.

---

## Testes Realizados e Observações

- **✅ [200] Get List Tokens (Sucesso):**

  - A requisição com uma API Key válida retornou `200 OK`.
  - **Observação:** A resposta retornou um array de `tokens` vazio. Isso sugere que filtros adicionais (como `projectId` ou `filterByChainId`) podem ser necessários para obter uma lista populada de ativos. O funcionamento básico do endpoint está confirmado.

- **❌ [403] Error - Invalid API Key (Segurança):**
  - A requisição com uma API Key inválida (`invalid-api-key`) retornou corretamente o status `403 Forbidden` e a mensagem de erro `"Invalid Api key."`.
  - **Conclusão:** Este resultado confirma que o endpoint está devidamente protegido contra acessos não autorizados, validando a chave de API conforme o esperado.

---

**Conclusão Geral:**
O endpoint `GET /tokens` está funcional e seguro, respondendo corretamente tanto a chamadas válidas quanto a tentativas de acesso indevido.
