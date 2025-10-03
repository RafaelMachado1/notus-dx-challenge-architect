# Daily Board - Sessão: GET /chains

---

## Sessão de Teste

**1. Qual é o objetivo desta sessão?**
Validar o funcionamento do endpoint `GET /chains` da API Notus.

---

**2. Qual abordagem você vai usar?**
Teste via Postman, utilizando uma variável de ambiente (`crypto_base_url`) para a URL base da API e autenticação via header.

---

**3. Há algo que precisa ser configurado antes de começar?**
Sim, a configuração da variável de ambiente `crypto_base_url` para o valor `https://api.notus.team/api/v1/crypto`.

---

**4. Você conseguiu atingir o objetivo da sessão?**

- [x] Sim.

---

**5. Problemas encontrados**
Nenhum. O endpoint `GET /chains` funcionou corretamente e retornou o payload esperado com status `200 OK`.

---

**6. Observações adicionais**
Para otimizar a clareza e a escalabilidade do nosso ambiente de testes, a variável de ambiente para a URL base foi nomeada `crypto_base_url`. Esta nomenclatura específica será adotada para futuros grupos de endpoints, tornando o ambiente auto-documentado e de fácil manutenção.

---

## Testes realizados

- **[200] Get List Chains:**  
  Requisição padrão com API Key válida retornou status `200 OK` e o payload esperado.

- **[403] Error - Invalid API Key:**  
  Requisição com API Key inválida retornou corretamente status `403 Forbidden` e mensagem de erro `"Invalid Api key."`.

---

**Conclusão:**  
O endpoint está validando corretamente a chave de API e protegendo o acesso aos dados conforme esperado.
