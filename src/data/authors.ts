export interface AuthorInfo {
  /** Short credential line, shown next to the name. */
  title: string;
  /** 1–2 sentence bio, shown on post pages and in Article schema. */
  bio: string;
}

/**
 * Bios for the bylines used across the blog. Keeping them in one place means
 * every post page and its Article structured data agree on who wrote it.
 */
export const authors: Record<string, AuthorInfo> = {
  "BD Solar Expert Team": {
    title: "Installation and pricing research",
    bio: "Researches rooftop system costs and equipment pricing across Bangladesh for BD Solar Power, based on supplier quotes and installed-project data.",
  },
  "Policy Analyst": {
    title: "Solar policy and incentives",
    bio: "Tracks BPDB, SREDA and government solar programs — net metering rules, incentives and the 3000 MW rooftop initiative.",
  },
  "Financial Expert": {
    title: "Solar ROI and financing",
    bio: "Covers payback periods, tariff savings and financing math for rooftop solar in Bangladesh.",
  },
  "BD Solar Review Team": {
    title: "Installer and product reviews",
    bio: "Evaluates solar installers, panels and equipment available in Bangladesh against pricing, warranty and service criteria.",
  },
  "Grid Connection Expert": {
    title: "Net metering and grid connection",
    bio: "Specialises in BPDB net metering applications, connection requirements and export metering.",
  },
  "Commercial Solar Team": {
    title: "Commercial and industrial solar",
    bio: "Designs and documents larger rooftop systems for factories, offices and institutions across Bangladesh.",
  },
  "Maintenance Specialists": {
    title: "Solar plant maintenance",
    bio: "Covers cleaning schedules, inverter checks and monsoon preparation for solar systems in the Bangladesh climate.",
  },
  "Technical Team": {
    title: "Solar technology analysis",
    bio: "Reviews panel, inverter and battery technology for performance and reliability in hot, humid conditions.",
  },
  "Installation Experts": {
    title: "Installation planning",
    bio: "Plans rooftop installations around Bangladesh's seasons, load patterns and net metering timelines.",
  },
  "Finance Team": {
    title: "Solar financing",
    bio: "Tracks bank loan products, EMI plans and green financing available for solar systems in Bangladesh.",
  },
  "Dhaka Team": {
    title: "Dhaka region installations",
    bio: "Handles installations and area-by-area guidance for homes and businesses across Dhaka.",
  },
  "Industrial Solar Team": {
    title: "Industrial solar systems",
    bio: "Works on 100kW–1MW solar systems for manufacturing and heavy-power consumers in Bangladesh.",
  },
  "Technical Expert": {
    title: "Solar performance",
    bio: "Analyses how heat, dust and humidity affect solar output in Bangladesh and how to design around them.",
  },
  "Healthcare Solar Team": {
    title: "Solar for healthcare",
    bio: "Documents solar and backup systems that keep hospitals and clinics running through outages.",
  },
  "Comparison Analyst": {
    title: "Technology comparisons",
    bio: "Runs cost and performance comparisons between solar and alternatives like diesel generators.",
  },
};
