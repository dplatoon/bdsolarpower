export interface AuthorInfo {
  title: string;
  bio: string;
  avatar?: string;
  linkedin?: string;
}

export const authors: Record<string, AuthorInfo> = {
  "Tawhid Hasan": {
    title: "Founder & Solar Energy Consultant",
    bio: "Specializing in high-efficiency rooftop solar design and direct factory sourcing from China. Tawhid leads the technical strategy for BD Solar Power, focusing on ROI maximization and grid-connected net metering for homes and businesses across Bangladesh.",
    linkedin: "https://linkedin.com/in/your-profile", 
  },
  "BD Solar Expert Team": {
    title: "Technical Research Team",
    bio: "A collective of engineers and analysts researching solar equipment pricing and installation standards in Bangladesh.",
  },
};
