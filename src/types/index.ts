export interface SmartWallet {
  id: string;
  owner: string;
  address: string;
  createdAt: string;
  status: string;
}

export interface FiatQuote {
  quoteId: string;
  amount: number;
  currency: string;
  expiresAt: string;
  status: string;
}

export interface KYCSession {
  sessionId: string;
  walletId: string;
  status: string;
  startedAt: string;
  completedAt?: string;
}

export interface BlockchainChain {
  chainId: string;
  name: string;
  rpcUrl: string;
  explorerUrl?: string;
}

export interface Token {
  tokenId: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: string;
}