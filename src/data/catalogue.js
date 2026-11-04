import { IMG } from "./group";

export const specialConcretes = [
  {
    id: "rmc",
    name: "Standard RMC",
    icon: "Truck",
    summary:
      "Plant-batched concrete for structural and non-structural works, delivered in transit mixers with slump and age recorded at dispatch.",
    bestFor: "Slabs, columns, footings, retaining walls",
  },
  {
    id: "scc",
    name: "Self-Compacting Concrete",
    icon: "Waves",
    summary:
      "High-flow mixes that consolidate under their own weight — built for congested reinforcement, narrow sections and finishes that must stay fair-faced.",
    bestFor: "Dense reinforcement, architectural concrete, retrofits",
  },
  {
    id: "temperature",
    name: "Temperature-Controlled Concrete",
    icon: "Thermometer",
    summary:
      "Chilled or engineered mixes that hold placement temperature within a specified band, controlling hydration heat and early-age cracking in mass pours.",
    bestFor: "Rafts, mass concrete, data centre slabs",
  },
  {
    id: "fibre",
    name: "Fibre-Reinforced Concrete",
    icon: "Grid3x3",
    summary:
      "Steel or synthetic fibres dispersed through the mix to improve crack control, toughness and impact resistance in demanding slabs and industrial floors.",
    bestFor: "Industrial floors, pavements, shotcrete",
  },
  {
    id: "water",
    name: "Water-Resistant Concrete",
    icon: "Droplets",
    summary:
      "Low-permeability mixes with controlled water-cement ratio for structures exposed to groundwater, basements and wet service conditions.",
    bestFor: "Basements, water tanks, foundations",
  },
  {
    id: "lightweight",
    name: "Lightweight Concrete",
    icon: "Feather",
    summary:
      "Reduced-density mixes that lower dead load on structures, useful for upper floors, infill and refurbishment where structural capacity is fixed.",
    bestFor: "High-rise floors, infill, remediation",
  },
  {
    id: "pervious",
    name: "Pervious Concrete",
    icon: "Layers",
    summary:
      "Open-graded mixes with interconnected voids that let water pass through, supporting on-site drainage and reducing runoff on paved surfaces.",
    bestFor: "Parking, pathways, landscape paving",
  },
  {
    id: "sdc",
    name: "Self-Densifying Concrete (SDC)",
    icon: "Waves",
    summary:
      "A self-consolidating mix using a viscosity-modifying admixture and superplasticiser, specified to suit the placement.",
    bestFor: "Precast and selected structural applications",
  },
  {
    id: "foam",
    name: "Foam Concrete",
    icon: "Feather",
    summary:
      "A lightweight, cellular concrete mix with a specified density, including the 800–1,500 kg/m³ range noted in the group brief.",
    bestFor: "Roof and floor insulation, void filling",
  },
  {
    id: "screed",
    name: "Screed & Concrete Bucket",
    icon: "Layers",
    summary:
      "Free-flow floor-base and small-batch concrete options, subject to project and equipment confirmation.",
    bestFor: "Floor finishes, repairs, steps and sunken slabs",
  },
];

export const projects = [
  {
    slug: "candeur-skyline",
    name: "Candeur Skyline",
    client: "Candeur Construction",
    location: "Kokapet, Hyderabad",
    sector: "Residential",
    companySlug: "pipl-concrete",
    status: "Ongoing supply",
    scope: "3.2 lakh m³ · M25–M75 · duration to confirm",
    image: IMG.candeur,
    summary: "High-rise residential project with ongoing PIPL Concrete supply.",
    overview: "Project scope and duration are being confirmed against the group's records.",
    gallery: [IMG.candeur],
  },
  {
    slug: "pooja-crafted-homes",
    name: "Pooja Crafted Homes & Ultra-Luxury Hotel",
    client: "Pooja Crafted Homes",
    location: "Rajendra Nagar, Hyderabad",
    sector: "Residential",
    companySlug: "pipl-concrete",
    status: "Ongoing supply",
    scope: "1.15 lakh m³ · M25–M60 · 3 years",
    image: IMG.pooja,
    summary: "Residential homes and hotel project with ongoing PIPL Concrete supply.",
    overview: "Project scope is stated in the group brief; project documentation remains subject to confirmation.",
    gallery: [IMG.pooja],
  },
  {
    slug: "shamshabad-data-centre",
    name: "Data centre project",
    client: "Withheld pending written client clearance",
    location: "Shamshabad, Telangana",
    sector: "Data centre",
    companySlug: "pipl-concrete",
    status: "Upcoming",
    scope: "Specialised concrete supply · detailed scope withheld pending clearance",
    image: IMG.datacenter,
    summary: "Upcoming data centre project with specialised concrete supply in the group plan.",
    overview: "The project is listed as upcoming in the group brief. Client identity is withheld pending written clearance.",
    gallery: [IMG.datacenter],
  },
  {
    slug: "anaya-exclusive-villas",
    name: "Anaya Exclusive Villas",
    client: "Pusapati Group",
    location: "Mehtab Khan Guda, Shankarpalli",
    sector: "Hospitality / Villas",
    companySlug: "brikbuild-hospitality",
    status: "Ongoing",
    scope: "Private-pool villas and convention centre",
    image: IMG.anaya,
    summary:
      "A limited collection of private-pool villas, developed and managed by BrikBuild Hospitality.",
    overview:
      "Anaya Exclusive Villas is the group's Shankarpalli villa project, with a convention centre. Site visits are by appointment; commercial terms are shared after confirmation.",
    gallery: [IMG.anaya],
  },
  {
    slug: "aprupa-tranquila",
    name: "Aprupa Tranquila",
    client: "Aprupa Constructions",
    location: "Attapur, Hyderabad",
    sector: "Residential",
    companySlug: "pipl-concrete",
    status: "Upcoming",
    scope: "2.3 lakh m³ · 3.5 years",
    image: IMG.realestate,
    summary: "Upcoming residential concrete-supply project listed in the group plan.",
    overview: "The project status and scope are reproduced from the group brief and should be confirmed before publication.",
  },
  {
    slug: "hyderabad-hyperscale-data-centre",
    name: "Hyperscale data centre",
    client: "Withheld pending written client clearance",
    location: "Hyderabad",
    sector: "Data centre",
    companySlug: "pipl-concrete",
    status: "Delivered",
    scope: "Ready-mix concrete supply",
    image: IMG.datacenter,
    summary: "Delivered concrete-supply reference for a Hyderabad data centre.",
    overview: "The project is identified by type only until written client clearance is obtained.",
  },
  {
    slug: "avr-evania",
    name: "AVR Evania (G+34)",
    client: "AVR",
    location: "Hyderabad",
    sector: "Residential",
    companySlug: "pipl-concrete",
    status: "Delivered",
    scope: "High-rise concrete supply",
    image: IMG.candeur,
    summary: "Delivered high-rise concrete-supply reference.",
  },
  {
    slug: "industrial-conveyor-line",
    name: "Industrial conveyor line",
    client: "Withheld pending written client clearance",
    location: "Location to be confirmed",
    sector: "Industrial",
    companySlug: "brikbuild-infra",
    status: "Tender status to confirm",
    scope: "Industrial civil-works tender · award and value to confirm",
    image: IMG.aggregate,
    summary: "Industrial civil-works tender reference; client, award and value require confirmation.",
  },
  {
    slug: "peopletech-commercial",
    name: "PeopleTech Group (commercial)",
    client: "PeopleTech Group",
    location: "Hyderabad",
    sector: "Commercial",
    companySlug: "pipl-concrete",
    status: "Delivered",
    scope: "Concrete supply",
    image: IMG.office,
    summary: "Delivered commercial-project concrete-supply reference.",
  },
  {
    slug: "signature-avenue",
    name: "Signature Avenue",
    client: "Client name to confirm",
    location: "Hyderabad",
    sector: "Commercial",
    companySlug: "pipl-concrete",
    status: "Delivered",
    scope: "Concrete supply",
    image: IMG.realestate,
    summary: "Delivered commercial-project concrete-supply reference.",
  },
  {
    slug: "selected-builder-projects",
    name: "Selected residential & commercial projects",
    client: "Client names supplied in the group brief",
    location: "Hyderabad / Bangalore",
    sector: "Residential & commercial",
    companySlug: "pipl-concrete",
    status: "Delivered",
    scope: "Project names and scope to confirm",
    image: IMG.candeur,
    summary: "A grouped reference to projects listed in the group brief; individual scopes are not yet provided.",
  },
];

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const productCategories = [
  {
    id: "concrete",
    name: "Ready-Mix Concrete",
    accent: "#E2701B",
    image: IMG.concrete,
    intro:
      "Plant-batched concrete designed to project specification, dispatched with pour records. Mix designs are confirmed through trial batches before supply.",
    items: [
      { name: "Standard RMC", spec: "Common structural grades, project-specific mix design", use: "Slabs, columns, footings" },
      { name: "Self-compacting concrete", spec: "High-flow, no-vibration placement", use: "Dense reinforcement, fair-faced concrete" },
      { name: "Temperature-controlled concrete", spec: "Placement temperature held to agreed band", use: "Mass and raft pours" },
      { name: "Fibre-reinforced concrete", spec: "Steel or synthetic fibre dosage to design", use: "Industrial floors, pavements" },
      { name: "Water-resistant concrete", spec: "Low-permeability mix, controlled w/c ratio", use: "Basements, tanks" },
      { name: "Lightweight concrete", spec: "Reduced-density aggregates", use: "Upper floors, infill" },
      { name: "Pervious concrete", spec: "Open-graded, interconnected voids", use: "Parking, pathways" },
      { name: "Self-densifying concrete (SDC)", spec: "Self-consolidating mix with VMA and superplasticiser", use: "Precast and selected structural applications" },
      { name: "Foam concrete", spec: "Cellular concrete; density to project specification", use: "Roof and floor insulation, void filling" },
      { name: "Screed / concrete bucket", spec: "Free-flow floor base or small-batch mix", use: "Floor finishes, repairs, steps and sunken slabs" },
    ],
  },
  {
    id: "aggregates",
    name: "Aggregates",
    accent: "#5E646B",
    image: IMG.aggregate,
    intro:
      "Graded stone aggregates produced through the group's crushing and screening capacity, stockpiled by grade and dispatched in bulk.",
    items: [
      { name: "10 mm aggregate", spec: "Graded, screened", use: "Concrete, plaster" },
      { name: "20 mm aggregate", spec: "Graded, screened", use: "Structural concrete" },
      { name: "40 mm coarse aggregate", spec: "Graded, screened", use: "Mass concrete, base layers" },
      { name: "GSB / base course", spec: "Blended to grading requirement", use: "Roads, platforms" },
      { name: "Crusher dust", spec: "Fine crushed stone", use: "Block-work, filling" },
    ],
  },
  {
    id: "sand",
    name: "Sand",
    accent: "#D4AF37",
    image: IMG.quarry,
    intro:
      "Manufactured sand produced from crushed rock, graded for concrete and plaster applications as an alternative to river sand.",
    items: [
      { name: "Manufactured sand (M-sand)", spec: "Graded, washed on request", use: "Concrete, screed" },
      { name: "Plaster sand (P-sand)", spec: "Finer grading for finishes", use: "Plaster, masonry" },
    ],
  },
  {
    id: "ggbs",
    name: "GGBS",
    accent: "#2A52BE",
    image: IMG.plant,
    intro:
      "A planned GGBS grinding plant is under development. Register an enquiry for proposed bulk or bagged supply; commissioning and availability are not yet confirmed.",
    items: [
      { name: "GGBS — planned bulk supply", spec: "Proposed silo or bulk tanker supply", use: "Batching plants, RMC" },
      { name: "GGBS — planned bagged supply", spec: "Proposed bagged supply", use: "Site mixing, smaller pours" },
    ],
  },
  {
    id: "specialty",
    name: "Specialty Materials",
    accent: "#7F00FF",
    image: IMG.materials,
    intro:
      "Supporting materials and consumables supplied through BrikBox for project teams that buy across categories.",
    items: [
      { name: "Cement", spec: "OPC / PPC — brand and grade as ordered", use: "General construction" },
      { name: "Steel and TMT", spec: "Grade and diameter as ordered", use: "Reinforcement" },
      { name: "Blocks and bricks", spec: "AAC, solid and hollow blocks", use: "Masonry" },
      { name: "Waterproofing and finishes", spec: "System selection with technical support", use: "Basements, terraces, wet areas" },
    ],
  },
];

export const qualityStages = [
  {
    index: "01",
    title: "Pre-pour inspection",
    body: "Materials, formwork and the approved mix design are checked before placement begins.",
  },
  {
    index: "02",
    title: "During-pour checks",
    body: "Slump and concrete temperature are checked during placement against the project requirements.",
  },
  {
    index: "03",
    title: "Post-pour review",
    body: "Curing and surface finish are reviewed after placement, with project testing recorded as specified.",
  },
];

export const insights = [
  {
    id: "ggbs-low-carbon",
    category: "Materials",
    date: "12 September 2026",
    read: "6 min read",
    title: "What GGBS actually changes in a concrete mix",
    excerpt:
      "Lower heat of hydration, slower early strength, better long-term performance. A practical look at where GGBS earns its place — and where it needs a different mix strategy.",
    body: [
      "Ground granulated blast furnace slag is a by-product of iron manufacturing, ground to a fineness that lets it react with water in the presence of cement. Used as a partial replacement for cement, it changes the chemistry of the mix rather than simply diluting it.",
      "The most immediate effect is thermal. GGBS reduces the heat released during hydration, which matters most in mass pours — rafts, thick slabs and foundations — where temperature differentials drive early-age cracking.",
      "The trade-off is pace. Early strength gain is slower, which shifts striking times and programme assumptions. The practical answer is rarely to avoid GGBS, but to design the mix and the pour sequence around it.",
    ],
  },
  {
    id: "scc-site",
    category: "Engineering",
    date: "28 August 2026",
    read: "5 min read",
    title: "Self-compacting concrete: the site conditions that decide it",
    excerpt:
      "SCC solves placement problems that vibration cannot. Here is where it pays for itself, and the detailing discipline it demands in return.",
    body: [
      "Self-compacting concrete flows under its own weight. In heavily reinforced sections, that means complete encasement of steel without mechanical vibration — and a fair-faced finish that needs little repair.",
      "The constraint is the formwork. Higher fluid pressure demands tighter shutter design and better joint discipline. A mix that flows beautifully can also find every gap in a poorly built form.",
      "On the right detail, SCC reduces labour, noise and rework. On the wrong one, it simply relocates the problem from the pour to the finish.",
    ],
  },
  {
    id: "data-centre-concrete",
    category: "Infrastructure",
    date: "09 August 2026",
    read: "7 min read",
    title: "Why data centres ask more of concrete than most buildings",
    excerpt:
      "Flatness tolerances, mass pours and continuous placement — the three demands that separate a data centre slab from a conventional commercial floor.",
    body: [
      "A data centre slab is a precision surface. Rack layouts, containment and raised-floor systems all inherit the tolerance of what sits beneath them, which pushes slab flatness requirements well beyond typical commercial work.",
      "The pours are also large and continuous. Mass concrete generates heat that must be managed in real time, and stopping a pour midway creates a cold joint that no finish can hide.",
      "That combination is why temperature-controlled mix design and dispatch sequencing are engineering decisions on these projects, not logistics details.",
    ],
  },
  {
    id: "quarry-to-skyline",
    category: "Group",
    date: "21 July 2026",
    read: "4 min read",
    title: "The case for a vertically integrated building group",
    excerpt:
      "When the same group quarries the aggregate, batches the concrete, builds the structure and manages the stay, accountability stops moving between contracts.",
    body: [
      "Most construction problems are handover problems. Material arrives that does not match the mix design; the mix does not match the structural requirement; the structure does not match the finish specification. Each handover is a place where responsibility can thin out.",
      "Vertical integration does not remove those interfaces — it internalises them. The same quality system covers the aggregate, the concrete and the pour.",
      "That is the structure Pusapati Group is building across its four engines: materials, trade, real estate and, from FY2031–32, digital infrastructure.",
    ],
  },
];

export const values = [
  {
    title: "Build to specification",
    body: "Materials are tested against the design mix, not against convenience. What is approved is what gets dispatched.",
  },
  {
    title: "Own the handover",
    body: "One group across quarry, plant, site and stay means fewer places for accountability to disappear.",
  },
  {
    title: "Engineer the constraint",
    body: "Heat, access, tolerance, programme — the constraints are the work. We design around them instead of explaining them later.",
  },
  {
    title: "Grow the region with us",
    body: "Vendors, contractors and teams who build with the group should grow as the group grows.",
  },
  {
    title: "Leave the ground better",
    body: "Water, dust, energy and land use are engineering decisions with a long tail. We treat them that way.",
  },
];

export const journey = [
  {
    stage: "Founded 2024",
    title: "PIPL Concrete",
    body: "The group began as a ready-mix concrete supplier, then developed connected materials, trade and project capabilities.",
  },
  {
    stage: "Expansion",
    title: "Ready-mix concrete",
    body: "Aggregate capability extended into engineered concrete, with batching, mix design and a quality laboratory.",
  },
  {
    stage: "Integration",
    title: "Trade and supplementary materials",
    body: "GGBS, multi-category material trade and an export desk built around the group's own supply base.",
  },
  {
    stage: "Delivery",
    title: "Construction and villas",
    body: "Contracting capability and Anaya villas — the group building with, and then operating on, its own materials.",
  },
  {
    stage: "Next",
    title: "Digital infrastructure",
    body: "Edge colocation planned as the fourth engine, connecting the group's industrial base to compute demand.",
  },
];

export const leadership = [
  {
    name: "Krishnaiah Pusapati",
    role: "Chairman, Pusapati Group",
    scope:
      "Krishnaiah brings more than 25 years of experience in the automobile industry. As Chairman, he provides strategic direction and governance across the group's companies, building on a career defined by integrity, disciplined business practice and lasting relationships with customers and partners.",
    image: "/images/leadership/krishnaiah-pusapati.jpeg",
    highlights: ["25+ years industry experience", "Strategy & governance", "Business relationships"],
  },
  {
    name: "Sunil Pusapati",
    role: "Founder & Chief Executive Officer",
    scope:
      "A civil engineer from NIT Agartala, Sunil founded Pusapati Industrial Pvt. Ltd. (PIPL Concrete) in 2024 after working across quality control, ready-mix concrete sales and business development. He leads group growth, client relationships, partnerships and fundraising; under his leadership, the group has executed more than ₹50 Cr in contracts and expanded into aggregates, minerals, GGBS and international trade.",
    image: "/images/leadership/sunil-pusapati.png",
    highlights: [
      "Civil Engineering · NIT Agartala",
      "Concrete · Aggregates · Minerals · GGBS",
      "Vendor management",
      "Business development",
      "Investor relations",
      "RMC & infrastructure",
    ],
  },
  {
    name: "Pavan Pusapati",
    role: "Operations Director, Pusapati Group",
    scope:
      "Pavan oversees day-to-day operations across the group, with hands-on experience in ready-mix concrete, aggregates, minerals and GGBS. He keeps production, logistics and site supply running smoothly, drawing on earlier experience in automobile operations, negotiation and customer service.",
    image: "/images/leadership/pavan-pusapati.jpeg",
    highlights: ["Plant & logistics operations", "Account management"],
  },
];

export const sustainability = [
  {
    title: "Manufactured sand",
    body: "M-sand substitutes for river sand in concrete and plaster, reducing pressure on riverbed ecosystems.",
    icon: "Recycle",
  },
  {
    title: "Supplementary cementitious materials",
    body: "GGBS replaces a portion of cement in mixes, lowering embodied carbon and hydration heat.",
    icon: "Leaf",
  },
  {
    title: "Water and dust management",
    body: "Wet processing, sprinkling and paved haul routes are used to control dust and water use at plant and quarry.",
    icon: "Droplets",
  },
  {
    title: "Local sourcing and employment",
    body: "Operations are staffed and supplied locally wherever capability exists, keeping value in the region.",
    icon: "Users",
  },
];

export const visionPhases = [
  {
    id: "foundation",
    phase: "Phase 01",
    name: "Foundation",
    years: "FY2027–28",
    accent: "#E2701B",
    summary:
      "Consolidate the materials core — capacity, quality systems and supply reliability — and prove the integrated model on completed work.",
    moves: [
      "PIPL: deliver Candeur and Pooja; progress Leighton and Aprupa; plan a second Hyderabad plant",
      "Minerals: bring the Shamshabad crusher toward full utilisation",
      "GGBS: secure financial closure, a plant site and a slag-supply tie-up",
      "BrikBox: launch in Hyderabad and onboard trusted vendors",
      "Exports: incorporate the proposed business and pursue initial shipments",
      "BrikBuild: deliver Anaya Shankarpalli and take selective infrastructure contracts",
      "Hospitality: establish the managed-rental model and convention-centre operations",
      "Edge Colo: research only; no capacity or site claim",
      "Group: website, vendor-registration phase, holding structure, CFO and KPI dashboard",
    ],
  },
  {
    id: "scale",
    phase: "Phase 02",
    name: "Scale",
    years: "FY2029–30",
    accent: "#2A52BE",
    summary:
      "Extend the model across regions and categories, and turn trade platforms into a repeating demand channel for group materials.",
    moves: [
      "PIPL: add Vizag supply and grow specialty-concrete share",
      "Minerals: evaluate a second crusher or quarry lease",
      "GGBS: commission the planned 300 TPD plant and ramp toward 500 TPD",
      "BrikBox: extend supply into Vijayawada and Vizag, then add logistics",
      "Exports: develop regular lanes and obtain required certifications",
      "BrikBuild: progress multiple villa projects, including Bangalore outskirts and Goa",
      "Hospitality: operate Anaya villas with a corporate and events calendar",
      "Edge Colo: complete feasibility, site and anchor-tenant searches",
      "Group: pursue growth equity, a full CXO team and independent oversight",
    ],
  },
  {
    id: "conglomerate",
    phase: "Phase 03",
    name: "Conglomerate",
    years: "FY2031–32",
    accent: "#7F00FF",
    summary:
      "Operate as an integrated group with digital infrastructure as the fourth engine — compute, materials and hospitality under one balance sheet.",
    moves: [
      "PIPL: expand across Telangana and Andhra Pradesh, including preferred data-centre supply",
      "Minerals and GGBS: grow regional supply and add capacity only as demand is proven",
      "BrikBox: build a South India network with buyer credit and financing options",
      "Exports: diversify into metals and GGBS export lanes",
      "BrikBuild: expand the Anaya series and test standardised G+20 concepts",
      "Hospitality: grow the managed-villa and recurring-income portfolio",
      "Edge Colo: evaluate a first pilot after site and anchor demand are secured",
      "Group: strengthen audited reporting, governance and IPO readiness",
    ],
  },
];

export const vendorCategories = [
  "Raw materials",
  "Fleet & logistics",
  "Plant & equipment",
  "Construction",
  "Hospitality",
  "Exports",
  "Tech & digital",
];

export const vendorBenefits = [
  {
    title: "One registration, group-wide reach",
    body: "A single verified profile is considered across materials, contracting, hospitality and digital infrastructure procurement.",
  },
  {
    title: "Visible RFQ pipeline",
    body: "Approved vendors receive requirement notices for the categories they are verified in, with scope and timelines attached.",
  },
  {
    title: "Documented purchase orders",
    body: "Purchase orders, delivery acknowledgements and invoice status are tracked against a single vendor record.",
  },
  {
    title: "Performance that compounds",
    body: "Delivery reliability and quality history are reviewed at each cycle — good performance widens the categories you are invited to quote for.",
  },
];

export const vendorSteps = [
  { index: "01", title: "Registration", body: "Submit company details, category and contact information through the vendor form." },
  { index: "02", title: "Document submission", body: "Share GST registration, PAN, statutory licences and category certifications." },
  { index: "03", title: "Verification", body: "The procurement team reviews documents, capacity and past delivery record." },
  { index: "04", title: "Trusted vendor approval", body: "Approved vendors are mapped to categories and receive a vendor code." },
  { index: "05", title: "RFQ participation", body: "Quotes are invited for relevant requirements with scope, drawings and timelines." },
  { index: "06", title: "Purchase orders & payments", body: "POs, delivery records and invoice status are tracked against the vendor account." },
];

export const vendorFaqs = [
  {
    q: "Is registration a guarantee of business?",
    a: "No. Registration adds a vendor to the evaluation pool. Enquiries and purchase orders are issued based on requirement, category fit and performance.",
  },
  {
    q: "What documents are required?",
    a: "GST registration, PAN, statutory licences relevant to your category, and any quality certifications you hold. The procurement team confirms the exact list after registration.",
  },
  {
    q: "How long does verification take?",
    a: "Verification timelines depend on how quickly complete documents are submitted and whether a site or capacity assessment is needed.",
  },
  {
    q: "Can I register for multiple categories?",
    a: "Yes. Register under your primary category and note additional categories in the description — each is verified separately.",
  },
  {
    q: "Is the vendor portal live?",
    a: "The portal shown on this site is a frontend prototype demonstrating the intended workflow. Documents, RFQs and payment status shown there are sample data, not live records.",
  },
];

export const departments = [
  { name: "Materials & Quality", roles: "Plant operations, quality engineering, batching" },
  { name: "Project Delivery", roles: "Site engineering, project management, planning" },
  { name: "Procurement & Trade", roles: "Sourcing, vendor management, export documentation" },
  { name: "Sales & Business Development", roles: "Concrete sales, project acquisition, villa advisory" },
  { name: "Finance & Governance", roles: "Accounts, compliance, internal audit" },
  { name: "Technology & Digital", roles: "Platform operations, data infrastructure planning" },
];

export const clients = [
  "Residential developer",
  "Industrial EPC",
  "Data centre operator",
  "Infrastructure contractor",
  "Hospitality developer",
  "Commercial builder",
];

export const milestonesNote =
  "Timeline dates and milestone details are pending publication approval and will be added once verified by the group.";