import { CONTACT, companies } from "@/data/group";
import { insights, productCategories, projects, qualityStages } from "@/data/catalogue";

const companyContent = companies.map((company) => ({
  id: `company-${company.slug}`,
  category: "companies",
  title: company.name,
  path: `/companies/${company.slug}`,
  fields: {
    slug: company.slug,
    name: company.name,
    engine: company.engine,
    status: company.status,
    tagline: company.tagline,
    description: company.intro,
    services: company.services.join("\n"),
    products: company.products.join("\n"),
    highlights: company.highlights.join("\n"),
    groupConnection: company.groupConnection,
    propertyDetails: (company.propertyDetails || []).map((detail) => `${detail.label} — ${detail.value}`).join("\n"),
    image: company.image,
  },
}));

const productContent = productCategories.map((category) => ({
  id: `product-${category.id}`,
  category: "products",
  title: category.name,
  path: "/products",
  fields: {
    id: category.id,
    name: category.name,
    accent: category.accent,
    introduction: category.intro,
    products: category.items.map((item) => `${item.name} — ${item.spec} — ${item.use}`).join("\n"),
    image: category.image,
  },
}));

const qualityContent = qualityStages.map((stage) => ({
  id: `quality-${stage.index}`,
  category: "quality",
  title: stage.title,
  path: "/products#quality",
  fields: {
    index: stage.index,
    title: stage.title,
    description: stage.body,
  },
}));

const projectContent = projects.map((project) => ({
  id: `project-${project.slug}`,
  category: "projects",
  title: project.name,
  path: `/work/${project.slug}`,
  fields: {
    slug: project.slug,
    name: project.name,
    client: project.client,
    location: project.location,
    sector: project.sector,
    companySlug: project.companySlug,
    status: project.status,
    scope: project.scope,
    summary: project.summary,
    overview: project.overview || project.summary,
    image: project.image,
    gallery: (project.gallery || [project.image]).join("\n"),
  },
}));

const newsContent = insights.map((insight) => ({
  id: `insight-${insight.id}`,
  category: "news",
  title: insight.title,
  path: "/insights",
  fields: {
    id: insight.id,
    title: insight.title,
    category: insight.category,
    date: insight.date,
    read: insight.read,
    excerpt: insight.excerpt,
    content: insight.body.join("\n\n"),
  },
}));

export const adminPreviewDefaults = {
  content: [
    {
      id: "home-hero",
      category: "home",
      title: "Homepage hero",
      path: "/",
      fields: {
        eyebrow: "Eight companies · Four engines",
        title: "",
        introduction: "From the quarry to the skyline to the stay: eight Pusapati Group companies make, supply, build and manage what India builds next.",
      },
    },
    ...qualityContent,
    ...companyContent,
    ...productContent,
    ...projectContent,
    ...newsContent,
    {
      id: "investor-overview",
      category: "investor-info",
      title: "Investor relations overview",
      path: "/investors",
      fields: {
        heroTitle: "An integrated building group, built to compound.",
        heroIntroduction: "Four engines, eight companies and one material chain. This page summarises the group's structure and achievements for investors. No financial projections, returns or forecasts are published here.",
        overviewTitle: "Industrial cash flow, connected.",
        overviewFirst: "Pusapati Group operates across the construction value chain: crushed aggregates and manufactured sand, GGBS, engineered ready-mix concrete, multi-category material trade, contracting and hospitality villas. Edge colocation is planned as the fourth engine.",
        overviewSecond: "Because the material businesses supply the contracting and villa businesses, group demand supports plant utilisation, and margin is retained at more than one point in the chain. Cross-company governance and a shared quality system are the mechanisms that keep the model coherent.",
        entityCount: "8 companies",
        engineCount: "4",
        horizon: "Vision 2032",
        reporting: "On request",
        publicationStatus: "Figures are as provided in the group brief and pending independent verification.",
      },
    },
    {
      id: "site-contact",
      category: "settings",
      title: "Public contact details",
      path: "Site-wide",
      fields: {
        phone: CONTACT.phone,
        email: CONTACT.email,
        address: CONTACT.addressLines.join("\n"),
        hours: CONTACT.hours,
        whatsapp: CONTACT.whatsapp,
      },
    },
  ],
  publishedContent: [],
  submissions: [],
  activity: [],
  employees: [],
  documents: [],
};
