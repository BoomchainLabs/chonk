import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function usePosts() {
  return useQuery({
    queryKey: [api.posts.list.path],
    queryFn: async () => {
      const res = await fetch(api.posts.list.path);
      if (!res.ok) throw new Error("Failed to fetch posts");
      
      try {
        const data = await res.json();
        return api.posts.list.responses[200].parse(data);
      } catch (e) {
        console.warn("Using fallback posts data", e);
        // Fallback data if DB is empty or schema mismatched
        return [
          {
            id: 1,
            title: "Phase 1: The Awakening",
            content: "CHONKPUMP 9000 initializes its core neural network. Liquidity locked, contract renounced. The pump protocol is online.",
            date: "2024-05-01",
            icon: "rocket",
            createdAt: new Date()
          },
          {
            id: 2,
            title: "Phase 2: Maximum Chonk",
            content: "Deploying algorithmic meme generation. Targeting top tier exchanges. The CHONK becomes undeniable.",
            date: "2024-06-15",
            icon: "trending-up",
            createdAt: new Date()
          },
          {
            id: 3,
            title: "Phase 3: Galactic Domination",
            content: "Cross-chain expansion protocols engaged. Preparing for orbital insertion. Nothing can stop the CHONKPUMP.",
            date: "2024-08-01",
            icon: "globe",
            createdAt: new Date()
          }
        ] as any[]; // Type assertion for fallback
      }
    },
  });
}
