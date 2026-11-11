import { CONTACT, companies, engines, stats } from "@/data/group";
import {
  insights,
  journey,
  leadership,
  productCategories,
  projects,
  qualityStages,
  values,
  vendorBenefits,
  vendorCategories,
  vendorFaqs,
  vendorSteps,
  visionPhases,
} from "@/data/catalogue";
import { applyPublishedContent } from "@/lib/site-content";

const publicSources = [
  {
    id: "group-overview",
    title: "About the Group",
    path: "/about",
    content: [
      "Pusapati Group",
      ...stats.map((item) => `${item.value}${item.suffix} ${item.unit || ""}: ${item.label}. ${item.detail}`),
      "Group figures are as provided in the public brief and pending independent verification; no financial projections are published.",
      ...engines.map((engine) => `${engine.name}: ${engine.blurb} Capabilities: ${engine.capabilities.join("; ")}`),
      ...journey.map((item) => `${item.stage}: ${item.title}. ${item.body}`),
      ...values.map((item) => `${item.title}: ${item.body}`),
      ...leadership.map((person) => `${person.name}, ${person.role}. ${person.scope}`),
    ].join("\n"),
  },
  {
    id: "group-companies",
    title: "Group companies",
    path: "/companies",
    content: engines.map((engine) => `${engine.name}: ${engine.blurb}`).join("\n"),
  },
  ...companies.map((company) => ({
    id: `company-${company.slug}`,
    title: company.name,
    path: `/companies/${company.slug}`,
    content: [
      company.name,
      `Business status: ${company.status}`,
      company.tagline,
      company.intro,
      `Services: ${company.services.join("; ")}`,
      `Products: ${company.products.join("; ")}`,
      `Capabilities: ${company.highlights.join("; ")}`,
      company.groupConnection,
    ].join("\n"),
  })),
  ...productCategories.map((category) => ({
    id: `product-${category.id}`,
    title: category.name,
    path: `/products#${category.id}`,
    content: [
      category.name,
      category.intro,
      ...category.items.map((item) => `${item.name}: ${item.spec}. Use: ${item.use}`),
    ].join("\n"),
  })),
  ...qualityStages.map((stage) => ({
    id: `quality-${stage.index}`,
    title: stage.title,
    path: "/products#quality",
    content: `${stage.title}: ${stage.body}`,
  })),
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    title: project.name,
    path: `/work/${project.slug}`,
    content: [
      project.name,
      project.client,
      project.location,
      project.sector,
      project.status,
      project.scope,
      project.summary,
      project.overview,
    ].filter((value) => !/to confirm|withheld|pending written client clearance/i.test(value)).join("\n"),
  })),
  ...insights.map((insight) => ({
    id: `insight-${insight.id}`,
    title: insight.title,
    path: `/insights#${insight.id}`,
    content: [insight.title, insight.excerpt, ...insight.body].join("\n"),
  })),
  {
    id: "vendor-information",
    title: "Vendor registration",
    path: "/vendors",
    content: [
      "Vendor registration and procurement",
      `Categories: ${vendorCategories.join("; ")}`,
      ...vendorBenefits.map((item) => `${item.title}: ${item.body}`),
      ...vendorSteps.map((item) => `${item.index}. ${item.title}: ${item.body}`),
      ...vendorFaqs.map((item) => `Question: ${item.q}\nAnswer: ${item.a}`),
    ].join("\n"),
  },
  {
    id: "group-vision",
    title: "Vision 2032",
    path: "/vision-2032",
    content: visionPhases.map((item) => `${item.phase} — ${item.name} (${item.years}): ${item.summary}\n${item.moves.join("; ")}`).join("\n"),
  },
  {
    id: "contact",
    title: "Contact & enquiries",
    path: "/contact",
    content: `Contact Pusapati Group in Hyderabad. Phone: ${CONTACT.phone}. Email: ${CONTACT.email}. WhatsApp: ${CONTACT.whatsapp}. Hours: ${CONTACT.hours}.`,
  },
  {
    id: "investor-information",
    title: "Investor information",
    path: "/investors",
    content: "The public investor page summarizes the Group and its business divisions. No financial projections, returns, revenue, EBITDA, valuation or return forecasts are published. Entity-level financials, registrations and certifications are shared with qualified investors under confidentiality.",
  },
];

const toCompany = (company, fields) => ({
  ...company,
  slug: fields.slug || company.slug,
  name: fields.name,
  engine: fields.engine || company.engine,
  status: fields.status,
  tagline: fields.tagline,
  intro: fields.description,
  services: (fields.services || "").split("\n").filter(Boolean),
  products: (fields.products || "").split("\n").filter(Boolean),
  highlights: (fields.highlights || "").split("\n").filter(Boolean),
  groupConnection: fields.groupConnection,
});

const toProductCategory = (category, fields) => ({
  ...category,
  id: fields.id || category.id,
  name: fields.name,
  intro: fields.introduction,
  items: (fields.products || "").split("\n").filter(Boolean).map((line) => {
    const [name, spec = "", use = ""] = line.split(" — ");
    return { name, spec, use };
  }),
});

const toProject = (project, fields) => ({
  ...project,
  slug: fields.slug || project.slug,
  name: fields.name,
  client: fields.client,
  location: fields.location,
  sector: fields.sector,
  status: fields.status,
  scope: fields.scope,
  summary: fields.summary,
  overview: fields.overview || fields.summary,
});

const toInsight = (insight, fields) => ({
  ...insight,
  id: fields.id || insight.id,
  title: fields.title,
  category: fields.category,
  excerpt: fields.excerpt,
  body: (fields.content || "").split(/\r?\n\r?\n/).filter(Boolean),
});

const toQualityStage = (stage, fields) => ({
  ...stage,
  index: fields.index || stage.index,
  title: fields.title,
  body: fields.description,
});

export function buildPublicKnowledge(publishedRecords = []) {
  const liveCompanies = applyPublishedContent(
    companies,
    publishedRecords,
    "companies",
    (company) => `company-${company.slug}`,
    toCompany,
    (fields) => toCompany({}, fields),
  );
  const liveProducts = applyPublishedContent(
    productCategories,
    publishedRecords,
    "products",
    (category) => `product-${category.id}`,
    toProductCategory,
    (fields) => toProductCategory({}, fields),
  );
  const liveProjects = applyPublishedContent(
    projects,
    publishedRecords,
    "projects",
    (project) => `project-${project.slug}`,
    toProject,
    (fields) => toProject({}, fields),
  );
  const liveInsights = applyPublishedContent(
    insights,
    publishedRecords,
    "news",
    (insight) => `insight-${insight.id}`,
    toInsight,
    (fields) => toInsight({}, fields),
  );
  const liveQualityStages = applyPublishedContent(
    qualityStages,
    publishedRecords,
    "quality",
    (stage) => `quality-${stage.index}`,
    toQualityStage,
    (fields) => toQualityStage({}, fields),
  );
  const investorRecord = publishedRecords.find((record) => record.id === "investor-overview" && !record.deleted);
  const contactRecord = publishedRecords.find((record) => record.id === "site-contact" && !record.deleted);
  const homeRecord = publishedRecords.find((record) => record.id === "home-hero" && !record.deleted);
  const address = (contactRecord?.fields.address || CONTACT.addressLines.join("\n"))
    .split(/\r?\n/)
    .filter((line) => !/full address to be published/i.test(line))
    .join(", ");

  const records = [
    ...publicSources.filter((source) => !source.id.startsWith("company-")
      && !source.id.startsWith("product-")
      && !source.id.startsWith("project-")
      && !source.id.startsWith("insight-")
      && !["contact", "investor-information"].includes(source.id)),
    ...(homeRecord ? [{
      id: "home",
      title: "Pusapati Group home page",
      path: "/",
      content: [homeRecord.fields.eyebrow, homeRecord.fields.title, homeRecord.fields.introduction].filter(Boolean).join("\n"),
    }] : []),
    ...(investorRecord ? [{
      id: "investor-information",
      title: investorRecord.fields.heroTitle || "Investor information",
      path: "/investors",
      content: [
        investorRecord.fields.heroIntroduction,
        investorRecord.fields.overviewTitle,
        investorRecord.fields.overviewFirst,
        investorRecord.fields.overviewSecond,
        investorRecord.fields.entityCount,
        investorRecord.fields.engineCount,
        investorRecord.fields.horizon,
        investorRecord.fields.reporting,
        "No financial projections, returns, revenue, EBITDA, valuation or return forecasts are published. Figures are pending independent verification.",
      ].filter(Boolean).join("\n"),
    }] : [publicSources.find((source) => source.id === "investor-information")]),
    {
      id: "contact",
      title: "Contact & enquiries",
      path: "/contact",
      content: `Contact Pusapati Group in Hyderabad. Phone: ${contactRecord?.fields.phone || CONTACT.phone}. Email: ${contactRecord?.fields.email || CONTACT.email}. WhatsApp: ${contactRecord?.fields.whatsapp || CONTACT.whatsapp}. Hours: ${contactRecord?.fields.hours || CONTACT.hours}.${address ? ` Address: ${address}.` : ""}`,
    },
    ...liveCompanies
      .filter((company) => /^[a-z0-9-]+$/.test(company.slug))
      .map((company) => ({
        id: `company-${company.slug}`,
        title: company.name,
        path: `/companies/${company.slug}`,
        content: [
          company.name,
          `Business status: ${company.status}`,
          company.tagline,
          company.intro,
          `Services: ${company.services.join("; ")}`,
          `Products: ${company.products.join("; ")}`,
          `Capabilities: ${company.highlights.join("; ")}`,
          company.groupConnection,
        ].filter(Boolean).join("\n"),
      })),
    ...liveProducts
      .filter((category) => /^[a-z0-9-]+$/.test(category.id))
      .map((category) => ({
        id: `product-${category.id}`,
        title: category.name,
        path: `/products#${category.id}`,
        content: [category.name, category.intro, ...category.items.map((item) => `${item.name}: ${item.spec}. Use: ${item.use}`)].filter(Boolean).join("\n"),
      })),
    ...liveQualityStages.map((stage) => ({
      id: `quality-${stage.index}`,
      title: stage.title,
      path: "/products#quality",
      content: `${stage.title}: ${stage.body}`,
    })),
    ...liveProjects
      .filter((project) => /^[a-z0-9-]+$/.test(project.slug))
      .map((project) => ({
        id: `project-${project.slug}`,
        title: project.name,
        path: `/work/${project.slug}`,
        content: [project.name, project.client, project.location, project.sector, project.status, project.scope, project.summary, project.overview]
          .filter((value) => value && !/to confirm|withheld|pending written client clearance/i.test(value))
          .join("\n"),
      })),
    ...liveInsights
      .filter((insight) => /^[a-z0-9-]+$/.test(insight.id))
      .map((insight) => ({
        id: `insight-${insight.id}`,
        title: insight.title,
        path: `/insights#${insight.id}`,
        content: [insight.title, insight.excerpt, ...(insight.body || [])].filter(Boolean).join("\n"),
      })),
  ];

  return records.filter((record) => record.title && record.content.trim());
}

const stopWords = new Set([
  "about", "after", "also", "and", "are", "can", "could", "does", "for", "from",
  "have", "how", "into", "its", "more", "our", "please", "tell", "that", "the",
  "their", "there", "this", "what", "when", "where", "which", "who", "with", "you",
  "your", "என்ன", "எப்படி", "எங்கே", "ఎలా", "ఏమి", "क्या", "कैसे", "कहाँ",
]);

const tokens = (value) => (value.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) || [])
  .filter((token) => token.length > 1 && !stopWords.has(token));

export function retrievePublicKnowledge(question, records, limit = 5) {
  const terms = new Set(tokens(question));
  if (!terms.size) return records.slice(0, limit);

  const ranked = records.map((record, index) => {
    const titleTerms = new Set(tokens(record.title));
    const contentTerms = new Set(tokens(record.content));
    let score = 0;
    for (const term of terms) {
      if (titleTerms.has(term)) score += 4;
      if (contentTerms.has(term)) score += 1;
    }
    return { record, index, score };
  }).filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit);

  if (ranked.length) return ranked.map((item) => item.record);
  return records.filter((record) => ["group-overview", "group-companies", "contact"].includes(record.id)).slice(0, limit);
}
