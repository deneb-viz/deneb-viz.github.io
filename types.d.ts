export type SponsorInformation = {
  source: SponsorDataSource;
  name: string;
  url: string;
  image_url: string;
  image_sizing: "width" | "height";
};

export type SponsorTier = "platinum" | "gold" | "silver" | "bronze";

export type SponsorDataSource = "github" | "repo";

export interface HomePageSponsorProps {
  sponsor: SponsorInformation;
  tier: SponsorTier;
}
