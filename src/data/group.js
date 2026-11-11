export const IMG = {
  quarry: "/images/quarry.png",
  materials: "/images/materials.png",
  trade: "/images/trade.png",
  realestate: "/images/realestate.png",
  digital: "/images/digital.png",
  candeur: "/images/candeur.png",
  pooja: "/images/pooja.png",
  datacenter: "/images/datacenter.png",
  anaya: "/images/anaya.png",
  pool: "/images/pool.png",
  concrete: "/images/concrete.png",
  aggregate: "/images/aggregate.png",
  vision: "/images/datacenter.png",
  plant: "/images/quarry.png",
  warehouse: "/images/trade.png",
  office: "/images/digital.png",
  piplLogo: "/images/pipl-logo.png",
};

export const CONTACT = {
  addressLines: ["Corporate office", "Hyderabad, Telangana, India", "Full address to be published"],
  phone: "+91 93905 64371",
  phoneNote: "Call or WhatsApp the group",
  whatsapp: "https://wa.me/919390564371",
  email: "Pusapatigroup@gmail.com",
  emailNote: "Email the group",
  hours: "Mon – Sat, 9:30 am – 6:30 pm IST",
};

export const stats = [
  { value: 8, suffix: "", label: "Companies", detail: "Across four business engines" },
  { value: 4, suffix: "", label: "Business engines", detail: "Materials, trade, real estate, digital" },
  { value: 4.3, decimals: 1, suffix: " Lakh+", unit: "m³", label: "Ongoing concrete supply", detail: "Programme volume" },
  { value: 50, prefix: "₹", suffix: " Cr+", label: "Contracts executed", detail: "Construction contracts" },
  { value: 250, suffix: " TPH", label: "Aggregate crushing", detail: "Installed capacity" },
];

export const engines = [
  {
    id: "materials",
    index: "01",
    name: "Materials & Manufacturing",
    short: "Materials",
    accent: "#E2701B",
    image: IMG.materials,
    blurb:
      "Quarry to batching plant. Aggregates, manufactured sand, GGBS and engineered ready-mix concrete produced under one quality system.",
    capabilities: ["250 TPH crushing", "RMC batching", "Quality laboratory"],
    companies: ["pipl-concrete", "pusapati-minerals-aggregates", "briks-ggbs"],
  },
  {
    id: "trade",
    index: "02",
    name: "Trade & Technology",
    short: "Trade",
    accent: "#2A52BE",
    image: IMG.trade,
    blurb:
      "Material trade, consolidated project procurement and export corridors that carry group and partner products to site and to port.",
    capabilities: ["Multi-category supply", "Export documentation", "Contractor accounts"],
    companies: ["brikbox", "pusapati-international-exports"],
  },
  {
    id: "realestate",
    index: "03",
    name: "Real Estate & Hospitality",
    short: "Real estate",
    accent: "#D4AF37",
    image: IMG.realestate,
    blurb:
      "Contract execution and villa development — building the structures the group supplies, then managing the stay that follows.",
    capabilities: ["General contracting", "Villa development", "Managed hospitality"],
    companies: ["brikbuild-infra", "brikbuild-hospitality"],
  },
  {
    id: "digital",
    index: "04",
    name: "Digital Infrastructure",
    short: "Digital",
    accent: "#7F00FF",
    image: IMG.digital,
    blurb:
      "Edge colocation and data centre capacity, planned as the group's next engine — compute closer to where India builds and works.",
    capabilities: ["Edge colocation (planned)", "Enterprise capacity (planned)", "Vision 2032 phase"],
    companies: ["brikbox-edge-colo"],
  },
];

export const companies = [
  {
    slug: "pipl-concrete",
    name: "PIPL Concrete",
    engine: "materials",
    status: "Operating",
    tagline: "Ready-mix concrete engineered for India's most demanding pours.",
    intro:
      "PIPL Concrete is the group's Hyderabad ready-mix concrete supplier, with a dedicated plant, aggregates from the group, an in-house laboratory and 24/7 delivery. Mixes are designed and tested for residential towers, data centres, industrial works and villas.",
    services: [
      "Ready-mix concrete supply",
      "Mix design and trial support",
      "Pour planning and scheduling",
      "On-site technical assistance",
    ],
    products: [
      "Standard RMC · M25–M75",
      "Self-compacting concrete",
      "Temperature-controlled concrete",
      "Fibre-reinforced concrete",
      "Water-resistant concrete",
      "Lightweight concrete",
      "Pervious concrete",
      "Self-densifying concrete",
      "Foam concrete",
      "Screed and small-batch concrete",
    ],
    highlights: [
      "4.3 lakh+ m³ ongoing concrete supply (group figure)",
      "Dedicated concrete quality laboratory",
      "Three-stage inspection before dispatch",
      "Transit-mixer fleet with pour sequencing",
    ],
    groupConnection:
      "PIPL uses aggregates from Pusapati Minerals. BRIKS GGBS is a planned supplementary-material input, subject to that plant becoming operational.",
    image: IMG.concrete,
  },
  {
    slug: "pusapati-minerals-aggregates",
    name: "Pusapati Minerals & Aggregates",
    engine: "materials",
    status: "Operating",
    tagline: "Quarry-sourced aggregates, manufactured sand and graded stone.",
    intro:
      "Pusapati Minerals & Aggregates operates the group's 250 TPH crushing facility at Shamshabad, producing graded stone aggregates and manufactured sand. Material is screened, washed where required and stockpiled by grade for concrete, road and infrastructure applications.",
    services: [
      "Aggregate crushing and screening",
      "Manufactured sand production",
      "Graded stone supply",
      "Bulk site logistics",
    ],
    products: [
      "20 mm, 12 mm and 6 mm aggregates",
      "40 mm coarse aggregate",
      "GSB and base-course material",
      "Manufactured sand (M-sand)",
      "Plaster sand (P-sand)",
      "Crusher dust",
      "Minerals (product list to confirm)",
    ],
    highlights: [
      "250 TPH aggregate crushing capacity",
      "Grade-wise stockpiling and dispatch",
      "Wet and dry processing options",
      "Direct bulk supply to project sites",
    ],
    groupConnection:
      "The crusher supplies PIPL Concrete and BrikBox; mineral sourcing for the proposed export business is planned.",
    image: IMG.aggregate,
  },
  {
    slug: "briks-ggbs",
    name: "BRIKS GGBS",
    engine: "materials",
    status: "Planned — plant in development",
    tagline: "A planned GGBS plant for stronger concrete and a smaller footprint.",
    intro:
      "BRIKS GGBS is a planned 300–500 TPD grinding plant, with financial closure, a plant site and a slag-supply tie-up still to be confirmed. The proposed facility is intended to supply cement blending, RMC plants and infrastructure projects, with PIPL as an anchor customer.",
    services: [
      "Planned bulk and bagged GGBS supply",
      "Proposed cement-blending and RMC supply",
      "Plant and slag-supply planning",
    ],
    products: ["GGBS — planned bulk supply", "GGBS — planned bagged supply"],
    highlights: [
      "300–500 TPD planned capacity",
      "₹22 Cr indicative plant investment from the group brief",
      "Site and long-term slag-supply tie-up to be confirmed",
    ],
    groupConnection:
      "The planned plant is intended to supply PIPL first, then external RMC, cement-blending and export customers.",
    image: IMG.plant,
  },
  {
    slug: "brikbox",
    name: "BrikBox",
    engine: "trade",
    status: "Operating",
    tagline: "One channel for building materials, from order to site.",
    intro:
      "BrikBox is the group's building-materials trade platform, consolidating aggregates, cement, steel, blocks and finishing materials into a single order channel for builders, contractors and project teams — with consolidated billing and coordinated dispatch.",
    services: [
      "Multi-category material supply",
      "Consolidated project procurement",
      "Dispatch coordination",
      "Contractor credit accounts",
    ],
    products: [
      "Cement and GGBS",
      "Steel and TMT bars",
      "Aggregates and sand",
      "UPVC, AAC blocks, tiles and electrical",
      "Waterproofing and finishes",
    ],
    highlights: [
      "Single window across material categories",
      "Project-wise supply schedules",
      "Built around contractor workflows",
    ],
    groupConnection:
      "BrikBox is the group's outward-facing materials marketplace, connecting buyers and vendors with products from group companies and external suppliers.",
    image: IMG.trade,
  },
  {
    slug: "pusapati-international-exports",
    name: "Pusapati International Exports",
    engine: "trade",
    status: "Proposed — coming soon",
    tagline: "Indian materials, delivered to the world.",
    intro:
      "Pusapati International Exports is a proposed venture. Planned product lines include seafood, food materials and ingredients, minerals sourced through Pusapati Minerals, and metals including zinc, cobalt, aluminium and iron ore. Products, destinations and export approvals remain subject to confirmation.",
    services: [
      "Planned export documentation and compliance",
      "Proposed seafood, food-ingredient, mineral and metal lines",
      "Global-buyer enquiries",
    ],
    products: ["Seafood", "Food ingredients", "Minerals", "Metals"],
    highlights: [
      "Proposed company — not yet presented as an operating exporter",
      "Buyer enquiries accepted for review",
      "Country, product, volume and Incoterms requested",
    ],
    groupConnection:
      "The proposed mineral export line may source from Pusapati Minerals; food, seafood and metal lines remain subject to buyer and compliance checks.",
    image: IMG.warehouse,
  },
  {
    slug: "brikbuild-infra",
    name: "BrikBuild Infra",
    engine: "realestate",
    status: "Operating",
    tagline: "Contract execution from foundation to handover.",
    intro:
      "BrikBuild Infra is the group's construction contracting arm, delivering civil and structural works for residential, industrial and hospitality projects. Standardised G+20 concepts and expansion beyond Hyderabad are planned; these are not presented as completed developments.",
    services: [
      "General contracting",
      "Civil and structural works",
      "Residential construction",
      "Industrial and warehouse works",
    ],
    products: ["Turnkey residential builds", "Villa construction", "Industrial sheds and structures"],
    highlights: [
      "₹50 Cr+ contracts executed (group figure)",
      "In-house material chain through group companies",
      "Single-point project accountability",
    ],
    groupConnection:
      "BrikBuild Infra executes projects using PIPL concrete and materials coordinated through BrikBox where available.",
    image: IMG.datacenter,
  },
  {
    slug: "brikbuild-hospitality",
    name: "BrikBuild Hospitality / Anaya",
    engine: "realestate",
    status: "Operating",
    tagline: "Anaya — private villas with pool, built for quieter luxury.",
    intro:
      "BrikBuild Hospitality develops and operates the group's hospitality and villa assets, led by Anaya Exclusive Villas — a limited collection of private-pool residences designed around light, privacy and landscape, and managed with hospitality-grade service.",
    services: [
      "Villa development",
      "Managed villa operations",
      "Site visits and buyer advisory",
      "Hospitality planning",
    ],
    products: ["Anaya Exclusive Villas", "Private-pool residences", "Managed villa stays"],
    highlights: [
      "Private pool villas",
      "Group-built construction quality",
      "Hospitality-led management",
      "Site visits by appointment",
    ],
    propertyDetails: [
      { label: "Location", value: "Mehtab Khan Guda, Shankarpalli" },
      { label: "Plot", value: "300 sq yd freehold land (confirm before publication)" },
      { label: "Built-up area", value: "2,528 sq ft (confirm before publication)" },
      { label: "Features", value: "Private pool · East- and West-facing options" },
      { label: "Indicative price", value: "From ₹2.5 Cr (confirm current price and availability)" },
    ],
    groupConnection:
      "BrikBuild Infra develops the villas; group materials support construction, and BrikBuild Hospitality manages the planned stays.",
    image: IMG.anaya,
  },
  {
    slug: "brikbox-edge-colo",
    name: "BrikBox Edge Colo",
    engine: "digital",
    status: "Planned — Vision 2032",
    tagline: "Edge colocation, planned for the next decade of compute.",
    intro:
      "BrikBox Edge Colo is the group's planned digital infrastructure business — edge colocation and data centre capacity designed for enterprise, cloud and AI workloads close to where they are consumed. The venture is at planning and design stage; no capacity is currently offered.",
    services: [
      "Edge colocation (planned)",
      "Enterprise cage and rack capacity (planned)",
      "Interconnection planning (planned)",
    ],
    products: ["Edge colocation suites (planned)", "Cross-connect and meet-me (planned)"],
    highlights: [
      "Feasibility and site selection under way",
      "Designed for latency-sensitive and AI workloads",
      "Part of the FY2031–32 digital infrastructure phase",
    ],
    groupConnection:
      "This future venture may use the group's land and construction capabilities; site selection and anchor demand must be established first.",
    image: IMG.digital,
  },
];

export const engineById = (id) => engines.find((e) => e.id === id);
export const companiesByEngine = (id) => companies.filter((c) => c.engine === id);
export const companyBySlug = (slug) => companies.find((c) => c.slug === slug);