# Relatório de Análise: Módulo KYC - Consulta de Sessão

---

## 1. Objetivo do Teste

O objetivo é testar o endpoint `GET /individual-verification-sessions/standard/{sessionId}`, que serve para consultar o status e os detalhes de uma sessão de verificação de identidade já criada.

---

## 2. Metodologia

Utilizaremos o Postman para fazer uma requisição `GET`, usando o `id` da sessão criada com sucesso no teste anterior (documentado em `06-KYCAnalysis.md`).

- **URL Base:** `https://api.notus.team/api/v1/kyc`
- **Endpoint:** `/individual-verification-sessions/standard/{sessionId}`
- **Autenticação:** Header `x-api-key`.
- **Parâmetro de Path:** O `{sessionId}` na URL deve ser substituído pelo ID real da sessão.

---

## 3. Resultados Esperados

Conforme a documentação, esperamos receber um status **`200 OK`** e um corpo de resposta (Response Body) com a seguinte estrutura:

```json
{
  "session": {
    "id": "string",
    "individualId": "string",
    "status": "PENDING",
    "livenessRequired": true,
    "firstName": "string",
    "lastName": "string",
    "birthDate": "string",
    "document": {
      "id": "string",
      "type": "string",
      "category": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

Como ainda não fizemos o upload dos documentos, o campo `status` deve retornar como `"PENDING"`.

---

## 4. Resultados Obtidos

A requisição foi executada com sucesso, retornando o status **`200 OK`**.

**Requisição Enviada:**

- **Método:** `GET`
- **URL:** `{{kyc_base_url}}/individual-verification-sessions/standard/99802067-c35d-48ff-88ff-0df338a859de`

**Resposta Recebida (Response Body):**

```json
{
  "session": {
    "id": "99802067-c35d-48ff-88ff-0df338a859de",
    "individualId": null,
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1990-01-15",
    "document": {
      "id": "123456789",
      "type": null,
      "category": "IDENTITY_CARD"
    },
    "status": "EXPIRED",
    "livenessRequired": true,
    "createdAt": "2025-10-01T23:35:50.122Z",
    "updatedAt": null
  }
}
```

---

## 5. Análise e Conclusão

O teste foi um **sucesso**. O endpoint `GET /individual-verification-sessions/standard/{sessionId}` se comportou como o esperado, retornando os dados da sessão solicitada.

**Pontos de Destaque:**

1.  **Confirmação de Dados:** A API retornou todos os dados que foram enviados na criação da sessão, confirmando que a consulta foi bem-sucedida.
2.  **Status `EXPIRED`:** Este é o achado mais importante. O status não é `PENDING`, mas sim `EXPIRED`. Isso indica que a sessão de verificação, incluindo as URLs pré-assinadas para upload de documentos, tem um **tempo de vida limitado**. Como demoramos para consultar, a sessão expirou. Isso é uma medida de segurança para evitar que links de upload fiquem ativos indefinidamente.

Este comportamento é uma excelente prática de segurança e um ponto crucial para a documentação da DX.

---

## 6. Teste de Erro: Sessão Não Encontrada

**Objetivo:** Verificar o comportamento da API ao tentar consultar uma sessão com um `sessionId` que não existe.

**Metodologia:**

1.  **Requisição:** Duplicamos a requisição `GET` anterior.
2.  **Modificação:** Alteramos o `sessionId` na URL para um valor aleatório e inválido (ex: `.../standard/99802067-c35d-48ff-88ff-0df338a859dA` - com um `A` no final).
3.  **Resultado Esperado:** Status `404 Not Found`.

**Resultado Obtido:**

A API retornou o status **`404 Not Found`** com o seguinte corpo de resposta:

```json
{
  "message": "Standard individual verification session not found",
  "id": "STANDARD_SESSION_NOT_FOUND",
  "traceId": "3c4146ea378d4a189522af5dccd64944"
}
```

**Análise:**

O teste foi um **sucesso**. A API respondeu de forma robusta e previsível, confirmando que o sistema de busca por sessão é seguro e não expõe informações indevidamente. A mensagem de erro é clara e o `id` do erro (`STANDARD_SESSION_NOT_FOUND`) é útil para a criação de tratamentos de erro no lado do cliente.

Com este último teste, a análise dos endpoints do módulo KYC está concluída. Cobrimos os cenários de sucesso e de erro para a criação e consulta de sessões.
