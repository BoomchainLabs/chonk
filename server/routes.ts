import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import axios from "axios";
import { Connection, PublicKey } from "@solana/web3.js";

const RPC_URL = process.env.RPC_URL || "https://beta.helius-rpc.com/?api-key=8c6871ff-1dcd-4bf9-a0a9-515475071365";
const TOKEN_MINT = "DnUsQnwNot38V9JbisNC18VHZkae1eKK5N2Dgy55pump";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // DB Seed
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    await storage.createPost({
      title: "Phase 1: The Chonk Awakening",
      content: "Launch token, initial liquidity, community building.",
      date: "Q1 2024",
      icon: "rocket"
    });
    await storage.createPost({
      title: "Phase 2: Maximum Girth",
      content: "Marketing push, AI meme generator release, CEX listings.",
      date: "Q2 2024",
      icon: "star"
    });
  }

  app.get(api.posts.list.path, async (req, res) => {
    const postsList = await storage.getPosts();
    res.json(postsList);
  });

  app.get(api.token.stats.path, async (req, res) => {
    try {
      const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_MINT}`);
      res.json(response.data);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get(api.token.holders.path, async (req, res) => {
    try {
      const connection = new Connection(RPC_URL);
      const mint = new PublicKey(TOKEN_MINT);
      const largest = await connection.getTokenLargestAccounts(mint);
      res.json(largest.value);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch holders" });
    }
  });

  app.get(api.token.transfers.path, async (req, res) => {
    try {
      const connection = new Connection(RPC_URL);
      const mint = new PublicKey(TOKEN_MINT);
      const sigs = await connection.getSignaturesForAddress(mint, { limit: 20 });
      res.json(sigs);
    } catch (e) {
      res.status(500).json({ message: "Failed to fetch transfers" });
    }
  });

  return httpServer;
}
