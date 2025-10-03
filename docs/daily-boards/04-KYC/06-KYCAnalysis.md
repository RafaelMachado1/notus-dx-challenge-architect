# Relatório de Análise: Módulo KYC - Criação de Sessão de Verificação

---

## 1. Objetivo do Teste

O objetivo desta sessão foi testar o endpoint de criação de uma nova sessão de verificação de identidade individual (`Individual Verification Session`), conforme a documentação da API Notus. O foco é validar o "caminho feliz" (happy path), garantindo que uma requisição bem-sucedida retorne um status `200 OK` e os dados esperados.

---

## 2. Metodologia

Foi utilizada a ferramenta Postman para enviar uma requisição `POST` para o endpoint `{{kyc_base_url}}/individual-verification-sessions/standard`.

- **URL Base:** `https://api.notus.team/api/v1/kyc`
- **Autenticação:** Header `x-api-key` com o valor da chave da API.
- **Corpo da Requisição (Body):** Um objeto JSON contendo todos os campos necessários para iniciar a verificação, como dados pessoais e do documento.

---

## 3. Requisição Enviada

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "birthDate": "1990-01-15",
  "documentCategory": "IDENTITY_CARD",
  "documentCountry": "BRAZIL",
  "documentId": "123456789",
  "livenessRequired": true,
  "email": "john.doe@example.com",
  "address": "123 Main Street",
  "city": "Anytown",
  "state": "Anystate",
  "postalCode": "12345-678"
}
```

---

## 4. Resultados

A requisição foi executada com sucesso, retornando o status **`200 OK`**.

**Resposta Recebida (Response Body):**

```json
{
  "session": {
    "id": "a5b99b9b-a7a7-4d8f-8a8a-9b9b9b9b9b9b", // Exemplo de ID
    "status": "PENDING"
  },
  "backDocumentUpload": {
    "url": "https://s3.amazonaws.com/notus-kyc-uploads/...",
    "method": "PUT",
    "headers": {
      "x-amz-server-side-encryption": "AES256"
    }
  },
  "frontDocumentUpload": {
    "url": "https://s3.amazonaws.com/notus-kyc-uploads/...",
    "method": "PUT",
    "headers": {
      "x-amz-server-side-encryption": "AES256"
    }
  }
}
```

---

## 5. Análise e Conclusão

O teste foi um **sucesso**. O endpoint `POST /individual-verification-sessions/standard` se comportou conforme o esperado para o cenário de sucesso.

**Pontos de Destaque:**

1.  **Criação da Sessão:** A API retornou um objeto `session` com um `id` único e o status `PENDING`, confirmando que o processo de verificação foi iniciado.
2.  **Upload Seguro com URLs Pré-Assinadas:** A resposta **não** espera o envio direto dos documentos. Em vez disso, ela fornece URLs de upload pré-assinadas (`presigned URLs`) para um serviço de armazenamento (aparentemente AWS S3). Este é um padrão de arquitetura seguro e escalável, pois o cliente (nosso backend) pode enviar os arquivos de imagem diretamente para o S3, sem sobrecarregar a API principal da Notus.
3.  **Próximos Passos:** O fluxo correto exige que, após esta etapa, sejam feitas duas requisições `PUT` para as URLs fornecidas (`backDocumentUpload` e `frontDocumentUpload`) para enviar as imagens do documento.

O próximo passo será testar os cenários de erro para este mesmo endpoint.

---

## 6. Teste de Cenário de Erro: Campo Obrigatório Ausente

**Objetivo:** Verificar se a API lida corretamente com requisições onde um campo obrigatório está faltando.

**Metodologia:** Foi enviada uma nova requisição `POST` para o mesmo endpoint, mas desta vez **removendo o campo `firstName`** do corpo da requisição.

**Requisição Enviada (Incompleta):**

```json
{
  "lastName": "Doe",
  "birthDate": "1990-01-15",
  "documentCategory": "IDENTITY_CARD",
  "documentCountry": "BRAZIL",
  "documentId": "123456789",
  "livenessRequired": true,
  "email": "john.doe@example.com",
  "address": "123 Main Street",
  "city": "Anytown",
  "state": "Anystate",
  "postalCode": "12345-678"
}
```

---

## 7. Resultados do Cenário de Erro

A API respondeu com o status **`400 Bad Request`**, como esperado.

**Resposta Recebida (Corpo do Erro):**

```json
{
  "message": "Bad Request",
  "id": "BAD_REQUEST",
  "errors": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["firstName"],
      "message": "Required"
    }
  ]
}
```

---

## 8. Análise e Conclusão do Cenário de Erro

O teste foi um **sucesso**. A API demonstrou ter uma **validação de entrada robusta e informativa**.

- **Tratamento de Erro:** A API rejeitou corretamente a requisição com dados incompletos.
- **Feedback Detalhado:** A mensagem de erro é clara, indicando exatamente qual campo (`firstName`) causou o problema e por quê (`Required`). Isso é uma excelente prática de DX (Developer Experience), pois acelera o processo de depuração para quem está integrando com a API.

A análise do módulo de criação de sessão de KYC está concluída, cobrindo tanto o caminho feliz quanto o de erro.
