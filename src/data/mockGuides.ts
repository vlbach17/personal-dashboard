import type { Guide } from "../types/guide";

export const mockGuides: Guide[] = [
  {
    id: "alliance-events",
    title: "Alliance event rotation",
    category: "Events",
    updatedLabel: "3 days ago",
    body: "Alliance events rotate roughly weekly. Prioritize the ones that reward speedups and gems over pure resource crates — resources are easy to farm, time is not.",
  },
  {
    id: "hero-pairings",
    title: "Hero pairings for garrison defense",
    category: "Heroes",
    updatedLabel: "1 week ago",
    body: "Pair a high-defense tank hero with a rally-debuff support in the garrison lineup. Avoid stacking two rally leaders — their skills don't stack the way you'd expect.",
  },
  {
    id: "resource-tiles",
    title: "Reading resource tile tiers",
    category: "Map",
    updatedLabel: "2 weeks ago",
    body: "Tile color indicates output tier, not distance from your castle. A gold-tier tile three zones out often beats a bronze tile next door once transport time is accounted for.",
  },
  {
    id: "troop-training-order",
    title: "Troop training order for a new server",
    category: "Strategy",
    updatedLabel: "3 weeks ago",
    body: "Infantry first for early defense, then split into cavalry once you have a garrison worth defending. Don't train archers until you have a specific counter-comp in mind.",
  },
];
