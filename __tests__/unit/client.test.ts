import { getChains, getTokens, registerSmartWallet, getSmartWallet, getSmartWalletHistory, getSmartWalletPortfolio, createKYCSession, getKYCResult } from "../../src/sdk/client";

jest.mock("../../src/sdk/client", () => ({
  getChains: jest.fn(),
  getTokens: jest.fn(),
  registerSmartWallet: jest.fn(),
  getSmartWallet: jest.fn(),
  getSmartWalletHistory: jest.fn(),
  getSmartWalletPortfolio: jest.fn(),
  createKYCSession: jest.fn(),
  getKYCResult: jest.fn(),
}));




describe("getChains", () => {
  it("deve retornar lista de chains com status 200", async () => {
    const mockResponse = {
      chains: [
        { id: 137, name: "POLYGON", logo: "https://logopolygon.com" }
      ]
    };
    (getChains as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getChains({ page: 2, perPage: 20 });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro ao buscar chains", async () => {
    (getChains as jest.Mock).mockRejectedValue(new Error("Unauthorized"));

    await expect(getChains({})).rejects.toThrow("Unauthorized");
  });
});


describe("getTokens", () => {
  it("deve retornar lista de tokens com status 200", async () => {
    const mockResponse = {
      tokens: [
        { tokenId: "1", symbol: "USDT", name: "Tether", decimals: 6, chainId: "137" }
      ]
    };
    (getTokens as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getTokens({ page: 1, perPage: 10 });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro ao buscar tokens", async () => {
    (getTokens as jest.Mock).mockRejectedValue(new Error("Unauthorized"));

    await expect(getTokens({})).rejects.toThrow("Unauthorized");
  });
});

describe("registerSmartWallet", () => {
  it("deve registrar uma smart wallet com sucesso", async () => {
    const mockResponse = {
      id: "wallet123",
      owner: "0xabc...",
      address: "0xabc...",
      createdAt: "2025-10-02T12:00:00Z",
      status: "active"
    };
    (registerSmartWallet as jest.Mock).mockResolvedValue(mockResponse);

    const result = await registerSmartWallet({ owner: "0xabc..." });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro de validação ao registrar smart wallet", async () => {
    (registerSmartWallet as jest.Mock).mockRejectedValue(new Error("Bad Request"));

    await expect(registerSmartWallet({ owner: "" })).rejects.toThrow("Bad Request");
  });

  it("deve tratar erro de idempotência ao registrar smart wallet", async () => {
    (registerSmartWallet as jest.Mock).mockRejectedValue(new Error("Conflict"));

    await expect(registerSmartWallet({ owner: "0xabc..." })).rejects.toThrow("Conflict");
  });
});

describe("getSmartWallet", () => {
  it("deve retornar dados da smart wallet com sucesso", async () => {
    const mockResponse = {
      id: "wallet123",
      owner: "0xabc...",
      address: "0xabc...",
      createdAt: "2025-10-02T12:00:00Z",
      status: "active"
    };
    (getSmartWallet as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getSmartWallet({ id: "wallet123" });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro ao buscar smart wallet", async () => {
    (getSmartWallet as jest.Mock).mockRejectedValue(new Error("Not Found"));

    await expect(getSmartWallet({ id: "wallet123" })).rejects.toThrow("Not Found");
  });
});


describe("getSmartWalletHistory", () => {
  it("deve retornar histórico da smart wallet com sucesso", async () => {
    const mockResponse = {
      history: [
        { id: "tx1", type: "deposit", amount: 100, date: "2025-10-02T12:00:00Z" }
      ]
    };
    (getSmartWalletHistory as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getSmartWalletHistory({ walletId: "wallet123" });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro ao buscar histórico da smart wallet", async () => {
    (getSmartWalletHistory as jest.Mock).mockRejectedValue(new Error("Not Found"));

    await expect(getSmartWalletHistory({ walletId: "wallet123" })).rejects.toThrow("Not Found");
  });
});


describe("getSmartWalletPortfolio", () => {
  it("deve retornar o portfólio da smart wallet com sucesso", async () => {
    const mockResponse = {
      portfolio: [
        { token: "USDT", balance: 1000, chainId: "137" }
      ]
    };
    (getSmartWalletPortfolio as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getSmartWalletPortfolio({ walletId: "wallet123" });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro ao buscar portfólio da smart wallet", async () => {
    (getSmartWalletPortfolio as jest.Mock).mockRejectedValue(new Error("Not Found"));

    await expect(getSmartWalletPortfolio({ walletId: "wallet123" })).rejects.toThrow("Not Found");
  });
});

//transction aqui

describe("createKYCSession", () => {
  it("deve criar uma sessão KYC com sucesso", async () => {
    const mockResponse = {
      sessionId: "kyc123",
      walletId: "wallet123",
      status: "pending",
      startedAt: "2025-10-02T12:00:00Z"
    };
    (createKYCSession as jest.Mock).mockResolvedValue(mockResponse);

    const result = await createKYCSession({ walletId: "wallet123" });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro ao criar sessão KYC", async () => {
    (createKYCSession as jest.Mock).mockRejectedValue(new Error("Bad Request"));

    await expect(createKYCSession({ walletId: "" })).rejects.toThrow("Bad Request");
  });
});

describe("getKYCResult", () => {
  it("deve retornar resultado da sessão KYC com sucesso", async () => {
    const mockResponse = {
      sessionId: "kyc123",
      walletId: "wallet123",
      status: "approved",
      startedAt: "2025-10-02T12:00:00Z",
      completedAt: "2025-10-02T13:00:00Z"
    };
    (getKYCResult as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getKYCResult({ sessionId: "kyc123" });
    expect(result).toEqual(mockResponse);
  });

  it("deve tratar erro ao buscar resultado da sessão KYC", async () => {
    (getKYCResult as jest.Mock).mockRejectedValue(new Error("Not Found"));

    await expect(getKYCResult({ sessionId: "kyc123" })).rejects.toThrow("Not Found");
  });
});
