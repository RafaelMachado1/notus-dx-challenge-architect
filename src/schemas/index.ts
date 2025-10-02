import { z } from "zod";

export const SmartWalletSchema = z.object({
  id: z.string(),
  owner: z.string(),
  address: z.string(),
  createdAt: z.string(),
  status: z.string(),
});

export const FiatQuoteSchema = z.object({
  quoteId: z.string(),
  amount: z.number(),
  currency: z.string(),
  expiresAt: z.string(),
  status: z.string(),
});

export const KYCSessionSchema = z.object({
  sessionId: z.string(),
  walletId: z.string(),
  status: z.string(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
});

export const BlockchainChainSchema = z.object({
  chainId: z.string(),
  name: z.string(),
  rpcUrl: z.string(),
  explorerUrl: z.string().optional(),
});

export const TokenSchema = z.object({
  tokenId: z.string(),
  symbol: z.string(),
  name: z.string(),
  decimals: z.number(),
  chainId: z.string(),
});