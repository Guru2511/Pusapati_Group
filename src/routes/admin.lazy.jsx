import { useEffect, useMemo, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Check,
  CircleHelp,
  ClipboardList,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  MessageSquareText,
  Newspaper,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminPreviewDefaults } from "@/data/adminPreview";
import { projects, qualityStages } from "@/data/catalogue";
import { companies, engines } from "@/data/group";
import { deleteAdminSubmission, getAdminDashboardData, saveAdminContent, updateAdminSubmission, verifyAdminSession } from "@/lib/admin-fns";

export const Route = createLazyFileRoute("/admin")({ component: AdminRoute });
const getFirebaseClient = createClientOnlyFn(() => import("@/lib/firebase.client"));

const navigation = [
  {
    label: "Workspace",
    items: [{ id: "overview", label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Website",
    items: [
      { id: "home", label: "Home & settings", icon: SlidersHorizontal },
      { id: "companies", label: "Companies", icon: Building2 },
      { id: "products", label: "Products & quality", icon: ShoppingBag },
      { id: "projects", label: "Projects", icon: FolderKanban },
      { id: "news", label: "News & insights", icon: Newspaper },
      { id: "investor-info", label: "Investor information", icon: BookOpen },
    ],
  },
  {
    label: "Business operations",
    items: [
      { id: "enquiry", label: "Customer enquiries", icon: MessageSquareText, count: true },
      { id: "contact", label: "Contact messages", icon: CircleHelp, count: true },
      { id: "vendor", label: "Vendor applications", icon: ClipboardList, count: true },
      { id: "career", label: "Careers & HR", icon: BriefcaseBusiness, count: true },
      { id: "investor", label: "Investor requests", icon: UsersRound, count: true },
      { id: "documents", label: "Document centre", icon: FileText },
      { id: "reports", label: "Reports & analytics", icon: Activity },
    ],
  },
  {
    label: "Administration",
    items: [
      { id: "employees", label: "Employee accounts", icon: UsersRound },
      { id: "audit", label: "Audit log", icon: ShieldCheck },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

const moduleLabels = Object.fromEntries(navigation.flatMap((group) => group.items.map((item) => [item.id, item.label])));
const projectFieldLabels = {
  slug: "Project URL slug",
  name: "Name",
  companySlug: "Group company",
  overview: "Project overview",
  gallery: "Image gallery URLs",
  engine: "Business engine",
  description: "Company description",
  services: "Services (one per line)",
  products: "Products (one per line)",
  highlights: "Highlights (one per line)",
  groupConnection: "Group connection",
  propertyDetails: "Property details (one label — value per line)",
  introduction: "Introduction",
  accent: "Accent color",
  content: "Article body (separate paragraphs with blank lines)",
  date: "Publication date",
  read: "Reading time",
  heroTitle: "Page title",
  heroIntroduction: "Page introduction",
  overviewTitle: "Overview heading",
  overviewFirst: "Overview paragraph 1",
  overviewSecond: "Overview paragraph 2",
  entityCount: "Entity count",
  engineCount: "Business engine count",
  horizon: "Planning horizon",
  reporting: "Reporting",
  publicationStatus: "Publication review status",
  index: "Display order",
  id: "Record key",
};
const statuses = ["new", "in progress", "follow-up", "review", "approved", "closed"];
const statusClass = {
  new: "bg-orange-50 text-orange-800 ring-orange-200",
  "in progress": "bg-blue-50 text-blue-800 ring-blue-200",
  "follow-up": "bg-amber-50 text-amber-800 ring-amber-200",
  review: "bg-violet-50 text-violet-800 ring-violet-200",
  approved: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  closed: "bg-slate-100 text-slate-600 ring-slate-200",
};
const slugify = (value) =>
  value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getAdminToken = async () => {
  const { getAdminIdToken } = await getFirebaseClient();
  return getAdminIdToken();
};

function AdminRoute() {
  const [preview, setPreview] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    let unsubscribe;
    getFirebaseClient()
      .then(({ getFirebaseAuth }) => {
        if (!active) return;
        const auth = getFirebaseAuth();
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            window.location.replace("/login?returnTo=%2Fadmin");
            return;
          }
          try {
            const idToken = await user.getIdToken();
            await verifyAdminSession({ data: { idToken } });
            const database = await getAdminDashboardData({ data: { idToken } });
            if (!active) return;
            const content = new Map(adminPreviewDefaults.content.map((item) => [item.id, item]));
            const sourceIds = new Set(adminPreviewDefaults.content.map((item) => item.id));
            for (const record of database.content) {
              if (record.status === "deleted") {
                content.delete(record.id);
              } else {
                const fields = typeof record.fields === "string" ? JSON.parse(record.fields) : record.fields;
                const publishedFields = typeof record.publishedFields === "string"
                  ? JSON.parse(record.publishedFields)
                  : record.publishedFields;
                content.set(record.id, {
                  id: record.id,
                  category: record.category,
                  title: record.title,
                  path: record.path,
                  fields,
                  publicationStatus: record.status,
                  isSourceContent: sourceIds.has(record.id),
                  hasUnpublishedChanges: record.status === "published"
                    && JSON.stringify(fields) !== JSON.stringify(publishedFields),
                });
              }
            }
            const publishedContent = database.content
              .filter((record) => ["published", "deleted"].includes(record.status))
              .map((record) => ({
                id: record.id,
                category: record.category,
                fields: typeof record.publishedFields === "string"
                  ? JSON.parse(record.publishedFields)
                  : (record.publishedFields || (typeof record.fields === "string" ? JSON.parse(record.fields) : record.fields)),
                deleted: record.status === "deleted",
              }));
            setPreview({
              ...adminPreviewDefaults,
              content: [...content.values()],
              publishedContent,
              submissions: database.submissions,
            });
            setAdminEmail(user.email || "");
            setLoadError("");
          } catch (error) {
            if (!active) return;
            if (error instanceof Error && error.message.toLowerCase().includes("not authorized")) {
              await signOut(auth);
              window.location.replace("/login?reason=unauthorized");
              return;
            }
            setLoadError(error instanceof Error ? error.message : "Could not load admin data.");
          }
        });
      })
      .catch((error) => {
        if (active) setLoadError(error instanceof Error ? error.message : "Could not initialize admin sign-in.");
      });
    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [retry]);

  if (loadError) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f8fa] p-6 font-body text-ink">
        <section className="max-w-lg rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold">Admin dashboard could not be loaded</h1>
          <p className="mt-3 text-sm text-slate">{loadError}</p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => { setLoadError(""); setPreview(null); setRetry((value) => value + 1); }}>Try again</Button>
            <Button variant="outline" onClick={() => { window.location.assign("/login"); }}>Sign in again</Button>
          </div>
        </section>
      </main>
    );
  }

  if (!preview) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f8fa] font-body text-sm text-slate">
        Verifying admin access and loading dashboard…
      </main>
    );
  }

  return <AdminDashboard initialData={preview} adminEmail={adminEmail} />;
}

function AdminDashboard({ initialData, adminEmail }) {
  const [data, setData] = useState(initialData);
  const [activeModule, setActiveModule] = useState("overview");
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [editingContent, setEditingContent] = useState(null);
  const [unsavedContentId, setUnsavedContentId] = useState(null);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [savedAt, setSavedAt] = useState("");

  const handleSignOut = async () => {
    try {
      const { getFirebaseAuth } = await getFirebaseClient();
      await signOut(getFirebaseAuth());
      window.location.assign("/login");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not sign out.");
    }
  };

  const persist = (nextData) => {
    setData(nextData);
    setSaveError("");
    setSavedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }));
  };

  const downloadSubmissionFile = async (item) => {
    try {
      const idToken = await getAdminToken();
      const response = await fetch(`/api/cv-download?id=${encodeURIComponent(item.id)}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Could not download this CV.");
      }
      const fileUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = item.cvFilename || "candidate-cv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not download this document.");
    }
  };

  const selectedSubmission = data.submissions.find((submission) => submission.id === selectedId);
  const visibleSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.submissions.filter((submission) => {
      const matchesModule = ["enquiry", "contact", "vendor", "career", "investor"].includes(activeModule)
        ? submission.type === activeModule
        : true;
      const matchesSearch =
        !query ||
        [submission.id, submission.name, submission.company, submission.email, submission.summary]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesModule && matchesSearch;
    });
  }, [activeModule, data.submissions, search]);
  const visibleContent = data.content.filter((item) => {
    const query = search.trim().toLowerCase();
    const categoryMatches = item.category === activeModule || (activeModule === "products" && item.category === "quality");
    return categoryMatches && (!query || `${item.title} ${item.path}`.toLowerCase().includes(query));
  });
  const pendingCount = data.submissions.filter((submission) => !["closed", "approved"].includes(submission.status)).length;

  const addActivity = (nextData, action, target) => ({
    ...nextData,
    activity: [
      {
        id: `activity-${Date.now()}`,
        action,
        target,
        at: new Date().toISOString(),
      },
      ...nextData.activity,
    ].slice(0, 40),
  });

  const updateSubmission = async (id, patch, action) => {
    const target = data.submissions.find((item) => item.id === id);
    if (!target) return;
    try {
      const request = { idToken: await getAdminToken(), id };
      for (const key of ["status", "assignedTo", "notes"]) {
        if (Object.hasOwn(patch, key)) request[key] = patch[key];
      }
      await updateAdminSubmission({ data: request });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not update this submission.");
      return;
    }
    const next = {
      ...data,
      submissions: data.submissions.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    };
    persist(addActivity(next, action, id));
  };

  const removeSubmission = async (id) => {
    const target = data.submissions.find((item) => item.id === id);
    if (!target || !window.confirm(`Remove this ${moduleLabels[target.type]?.toLowerCase() || "submission"} from the admin dashboard? It will be hidden from the inbox, but retained in Neon for recordkeeping.`)) return;
    try {
      await deleteAdminSubmission({ data: { idToken: await getAdminToken(), id } });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not remove this submission.");
      return;
    }

    const next = {
      ...data,
      submissions: data.submissions.filter((item) => item.id !== id),
    };
    persist(addActivity(next, "Removed submission from inbox", id));
    setSelectedId((current) => current === id ? "" : current);
    setEditingSubmission((current) => current === id ? null : current);
  };

  const saveSubmissionDetails = async (submission) => {
    const normalized = {
      ...submission,
      name: submission.name || submission.contact_name || submission.full_name || submission.company_name || "",
      company: submission.company || submission.organisation || submission.company_name || "",
      email: submission.email || "",
      phone: submission.phone || "",
      summary: submission.requirement || submission.description || submission.cover_note || submission.message || submission.summary,
    };
    if (!normalized.name.trim()) {
      setSaveError("Enter a name or company name before saving this record.");
      return;
    }
    const payload = Object.fromEntries(
      Object.entries(normalized).filter(([key]) => !["id", "type", "createdAt", "status", "assignedTo", "notes"].includes(key)),
    );
    try {
      await updateAdminSubmission({
        data: {
          idToken: await getAdminToken(),
          id: normalized.id,
          status: normalized.status,
          payload,
        },
      });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save submission details.");
      return;
    }
    const next = {
      ...data,
      submissions: data.submissions.map((item) => item.id === normalized.id ? normalized : item),
    };
    persist(addActivity(next, "Updated submission details", normalized.id));
    setEditingSubmission(null);
    setSelectedId(normalized.id);
  };

  const closeSubmissionEditor = () => {
    setEditingSubmission(null);
  };

  const addContent = (categoryOverride) => {
    const now = Date.now();
    const category = categoryOverride || activeModule;
    const nextQualityIndex = data.content
      .filter((item) => item.category === "quality")
      .reduce((highest, item) => Math.max(highest, Number(item.fields.index) || 0), 0) + 1;
    const templates = {
      projects: {
        id: `project-new-${now}`,
        title: "New project",
        path: `/work/new-project-${now}`,
        fields: {
          slug: `new-project-${now}`, name: "New project", client: "", location: "", sector: "Residential",
          companySlug: "pipl-concrete", status: "Draft", scope: "", summary: "", overview: "",
          image: projects[0]?.image || "", gallery: projects[0]?.image || "",
        },
      },
      companies: {
        id: `company-new-${now}`,
        title: "New company",
        path: "/companies/new-company",
        fields: {
          slug: `new-company-${now}`, name: "New company", engine: engines[0].id, status: "Draft",
          tagline: "", description: "", services: "", products: "", highlights: "", groupConnection: "",
          propertyDetails: "", image: projects[0]?.image || "",
        },
      },
      products: {
        id: `product-new-${now}`,
        title: "New product category",
        path: "/products",
        fields: {
          id: `new-category-${now}`, name: "New product category", accent: "#E2701B",
          introduction: "", products: "", image: projects[0]?.image || "",
        },
      },
      news: {
        id: `insight-new-${now}`,
        title: "New article",
        path: "/insights",
        fields: {
          id: `new-article-${now}`, title: "New article", category: "Group",
          date: new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date()),
          read: "3 min read", excerpt: "", content: "",
        },
      },
      quality: {
        id: `quality-new-${now}`,
        title: "New quality stage",
        path: "/products#quality",
        fields: {
          index: String(nextQualityIndex).padStart(2, "0"),
          title: "New quality stage",
          description: "",
        },
      },
    };
    const template = templates[category];
    if (template) {
      const nextItem = { ...template, category, publicationStatus: "draft", isSourceContent: false };
      persist(addActivity({ ...data, content: [nextItem, ...data.content] }, `Created ${category} draft`, nextItem.title));
      setEditingContent(nextItem.id);
      setUnsavedContentId(nextItem.id);
      return;
    }

    const nextItem = {
      id: `preview-${now}`,
      category: activeModule,
      title: "New draft",
      path: "Not published",
      fields: { title: "", description: "", status: "Draft" },
      publicationStatus: "draft",
      isSourceContent: false,
    };
    persist(addActivity({ ...data, content: [nextItem, ...data.content] }, "Created local draft", nextItem.title));
    setEditingContent(nextItem.id);
    setUnsavedContentId(nextItem.id);
  };

  const saveContent = async (item) => {
    item = {
      ...item,
      publicationStatus: item.publicationStatus === "published" ? "published" : "draft",
      hasUnpublishedChanges: item.publicationStatus === "published",
    };
    const existing = data.content.some((entry) => entry.id === item.id);
    const nextContent = existing
      ? data.content.map((entry) => (entry.id === item.id ? item : entry))
      : [item, ...data.content];
    try {
      await saveAdminContent({
        data: { idToken: await getAdminToken(), ...item, status: "draft" },
      });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not save this website draft.");
      return;
    }
    persist(addActivity({ ...data, content: nextContent }, "Saved website draft", item.title));
    setUnsavedContentId(null);
    setEditingContent(null);
  };

  const publishContent = async (item) => {
    const originalId = item.id;
    if (item.category === "projects") {
      const slug = slugify(item.fields.slug || item.fields.name);
      if (!item.fields.name?.trim() || !slug) {
        setSaveError("Add a project name before publishing it to the website.");
        return;
      }
      if (!companies.some((company) => company.slug === item.fields.companySlug)) {
        setSaveError("Choose a valid group company for this project.");
        return;
      }
      item = {
        ...item,
        id: `project-${slug}`,
        path: `/work/${slug}`,
        fields: { ...item.fields, slug },
      };
    }
    if (item.category === "companies") {
      const slug = slugify(item.fields.slug || item.fields.name);
      if (!item.fields.name?.trim() || !slug || !engines.some((engine) => engine.id === item.fields.engine)) {
        setSaveError("Add a company name and choose a valid business engine before publishing.");
        return;
      }
      item = { ...item, id: `company-${slug}`, path: `/companies/${slug}`, fields: { ...item.fields, slug } };
    }
    if (item.category === "products") {
      const id = slugify(item.fields.id || item.fields.name);
      if (!item.fields.name?.trim() || !id) {
        setSaveError("Add a product category name before publishing.");
        return;
      }
      item = { ...item, id: `product-${id}`, fields: { ...item.fields, id } };
    }
    if (item.category === "news") {
      const id = slugify(item.fields.id || item.fields.title);
      if (!item.fields.title?.trim() || !id) {
        setSaveError("Add an article title before publishing.");
        return;
      }
      item = { ...item, id: `insight-${id}`, fields: { ...item.fields, id } };
    }
    if (item.category === "quality") item = { ...item, id: `quality-${item.fields.index}` };
    if (data.content.some((entry) => entry.id === item.id && entry.id !== originalId)) {
      setSaveError("Another website record already uses this name or URL. Choose a different one before publishing.");
      return;
    }
    item = { ...item, publicationStatus: "published", isSourceContent: false, hasUnpublishedChanges: false };
    const publishedRecord = { id: item.id, category: item.category, fields: item.fields };
    const publishedContent = [
      ...data.publishedContent.filter((record) => record.id !== item.id),
      publishedRecord,
    ];
    const existing = data.content.some((entry) => entry.id === item.id);
    const content = existing
      ? data.content.map((entry) => (entry.id === originalId || entry.id === item.id ? item : entry))
      : [item, ...data.content.filter((entry) => entry.id !== originalId)];
    try {
      const idToken = await getAdminToken();
      await saveAdminContent({
        data: {
          idToken,
          ...item,
          status: "published",
          ...(originalId !== item.id ? { previousId: originalId } : {}),
        },
      });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not publish this website content.");
      return;
    }
    persist(addActivity({ ...data, content, publishedContent }, "Published website content", item.title));
    setUnsavedContentId(null);
    setEditingContent(null);
  };

  const closeContentEditor = () => {
    if (unsavedContentId && editingContent === unsavedContentId) {
      const item = data.content.find((entry) => entry.id === unsavedContentId);
      if (item) {
        persist({ ...data, content: data.content.filter((entry) => entry.id !== unsavedContentId) });
      }
      setUnsavedContentId(null);
    }
    setEditingContent(null);
  };

  const deleteContent = async (id) => {
    const item = data.content.find((entry) => entry.id === id);
    if (!item || !window.confirm(`Remove "${item.title}" from the public website? This change is saved to the connected database.`)) return;
    try {
      await saveAdminContent({ data: { idToken: await getAdminToken(), ...item, status: "deleted" } });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Could not remove this website content.");
      return;
    }
    const publishedContent = [
      ...data.publishedContent.filter((record) => record.id !== id),
      { id, category: item.category, fields: {}, deleted: true },
    ];
    const next = {
      ...data,
      content: data.content.filter((entry) => entry.id !== id),
      publishedContent,
    };
    persist(addActivity(next, "Removed website content", item.title));
    setUnsavedContentId((current) => current === id ? null : current);
    setEditingContent((current) => current === id ? null : current);
  };

  const openModule = (id) => {
    setActiveModule(id);
    setSelectedId("");
    setSearch("");
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] font-body text-[#18202a]">
      <div className="flex min-h-screen">
        {mobileNavOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-white/10 bg-[#151a21] text-white transition-transform lg:static lg:translate-x-0 ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e2701b] font-display text-sm font-bold text-white">
                PG
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide">Pusapati Group</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45">Admin workspace</p>
              </div>
            </div>
            <button type="button" className="rounded-lg p-2 text-white/60 hover:bg-white/10 lg:hidden" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
            {navigation.map((group) => (
              <div key={group.label}>
                <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{group.label}</p>
                <div className="space-y-1">
                  {group.items.map(({ id, label, icon: Icon, count }) => {
                    const active = activeModule === id;
                    const countValue = count ? data.submissions.filter((entry) => entry.type === id && entry.status === "new").length : 0;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => openModule(id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${
                          active ? "bg-white text-[#171c22] shadow-sm" : "text-white/65 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        <Icon className={`h-[17px] w-[17px] ${active ? "text-[#e2701b]" : "text-white/45"}`} />
                        <span className="flex-1">{label}</span>
                        {countValue > 0 && (
                          <span className="rounded-full bg-[#e2701b] px-2 py-0.5 text-[10px] font-semibold text-white">{countValue}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e2701b]/20 text-xs font-semibold text-[#ffb77d]">{adminEmail.slice(0, 2).toUpperCase()}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-white">Administrator</p>
                <p className="mt-0.5 truncate text-[10px] text-white/45">{adminEmail}</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-ink/8 bg-white/95 px-4 backdrop-blur md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button type="button" className="rounded-lg border border-ink/10 p-2 text-slate lg:hidden" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </button>
              <div className="min-w-0">
                <p className="truncate text-[11px] text-slate">Workspace <span className="px-1 text-slate/50">/</span> {moduleLabels[activeModule]}</p>
                <h1 className="mt-1 truncate text-base font-semibold tracking-tight">{moduleLabels[activeModule]}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold">Administrator</p>
                <p className="text-[10px] text-slate">{adminEmail}</p>
              </div>
              <Button type="button" variant="outline" onClick={handleSignOut} className="h-9 rounded-lg px-3 text-xs">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </div>
          </header>

          <main className="mx-auto max-w-[1500px] p-4 md:p-8">
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/80 px-4 py-3 text-xs leading-5 text-blue-950">
              <strong className="font-semibold">Connected admin workspace.</strong> Website drafts and enquiry updates are saved to Neon. Publishing changes public website content. Existing form submission and notification flows are unchanged.
            </div>
            {saveError && <p role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{saveError}</p>}
            {savedAt && !saveError && <p className="mb-4 text-right text-[11px] text-slate">Saved at {savedAt}</p>}
            {activeModule === "overview" && (
              <Overview
                data={data}
                pendingCount={pendingCount}
                onOpen={openModule}
                onSelectSubmission={(id) => {
                  setSelectedId(id);
                  setActiveModule(data.submissions.find((entry) => entry.id === id)?.type || "enquiry");
                }}
              />
            )}
            {["home", "companies", "products", "projects", "news", "investor-info", "settings"].includes(activeModule) && (
              <ContentManager
                module={activeModule}
                items={visibleContent}
                publishedContent={data.publishedContent}
                search={search}
                onSearch={setSearch}
                onAdd={addContent}
                onEdit={(id) => setEditingContent(id)}
                onPublish={(id) => {
                  const item = data.content.find((entry) => entry.id === id);
                  if (item) publishContent(item);
                }}
                onDelete={deleteContent}
              />
            )}
            {["enquiry", "contact", "vendor", "career", "investor"].includes(activeModule) && (
              <SubmissionsManager
                module={activeModule}
                items={visibleSubmissions}
                search={search}
                onSearch={setSearch}
                selected={selectedSubmission}
                onSelect={setSelectedId}
                onEdit={(id) => setEditingSubmission(id)}
                onUpdate={updateSubmission}
                onDelete={removeSubmission}
                onDownloadCv={downloadSubmissionFile}
              />
            )}
            {activeModule === "documents" && <DocumentsManager documents={data.documents} />}
            {activeModule === "reports" && <ReportsManager submissions={data.submissions} />}
            {activeModule === "employees" && <EmployeesManager employees={data.employees} />}
            {activeModule === "audit" && <AuditManager activity={data.activity} />}
          </main>
          <footer className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 pb-8 text-[10px] text-slate md:px-8">
            <span>© {new Date().getFullYear()} Pusapati Group · Admin workspace</span>
            <Link to="/" className="inline-flex items-center gap-1.5 font-medium text-slate hover:text-ink">
              View public website <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </footer>
        </div>
      </div>
      {editingContent && (
        <ContentEditor
          item={data.content.find((entry) => entry.id === editingContent)}
          module={activeModule}
          isNewDraft={unsavedContentId === editingContent}
          onClose={closeContentEditor}
          onSave={saveContent}
          onPublish={publishContent}
          onError={setSaveError}
        />
      )}
      {editingSubmission && (
        <SubmissionEditor
          item={data.submissions.find((entry) => entry.id === editingSubmission)}
          isNewRecord={false}
          onClose={closeSubmissionEditor}
          onSave={saveSubmissionDetails}
          onError={setSaveError}
        />
      )}
    </div>
  );
}

function Overview({ data, pendingCount, onOpen, onSelectSubmission }) {
  const openItems = data.submissions.filter((item) => !["closed", "approved"].includes(item.status));
  const stats = [
    { label: "Open enquiries", value: data.submissions.filter((item) => item.type === "enquiry" && item.status !== "closed").length, change: "Public form inbox", icon: MessageSquareText, tone: "orange" },
    { label: "Needs attention", value: pendingCount, change: "Across all departments", icon: ArrowDownRight, tone: "blue" },
    { label: "Website content", value: data.content.length, change: "Current website records", icon: Newspaper, tone: "green" },
    { label: "Form submissions", value: data.submissions.length, change: "Loaded from Neon", icon: Sparkles, tone: "violet" },
  ];

  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-medium text-slate">
            {new Intl.DateTimeFormat("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            }).format(new Date())}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-[28px]">Dashboard overview</h2>
          <p className="mt-1 text-sm text-slate">Website content and customer submissions are connected to Neon.</p>
        </div>
        <Button onClick={() => onOpen("enquiry")} className="h-10 self-start rounded-lg bg-[#e2701b] px-4 text-xs text-white hover:bg-[#ca6011] md:self-auto">
          <MessageSquareText className="h-4 w-4" /> Review enquiries
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, change, icon: Icon, tone }) => (
          <section key={label} className="rounded-xl border border-ink/8 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate">{label}</span>
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${tone === "orange" ? "bg-orange-50 text-orange-700" : tone === "blue" ? "bg-blue-50 text-blue-700" : tone === "green" ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"}`}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-5 text-[32px] font-semibold leading-none tracking-tight">{value}</p>
            <p className="mt-2 text-[11px] text-slate">{change}</p>
          </section>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <section className="rounded-xl border border-ink/8 bg-white p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold">Enquiry activity</h3>
              <p className="mt-1 text-[11px] text-slate">No live enquiry data is connected to this local preview.</p>
            </div>
            <button type="button" onClick={() => onOpen("reports")} className="text-[11px] font-semibold text-orange-700 hover:text-orange-900">View reports</button>
          </div>
          <div className="mt-6 grid min-h-48 place-items-center rounded-lg border border-dashed border-ink/15 bg-paper/50 p-6 text-center">
            <p className="text-xs text-slate">Enquiry activity will appear here when an authorized inbox is connected.</p>
          </div>
        </section>

        <section className="rounded-xl border border-ink/8 bg-white p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div><h3 className="text-sm font-semibold">Needs attention</h3><p className="mt-1 text-[11px] text-slate">{openItems.length} open submissions</p></div>
            <button type="button" onClick={() => onOpen("enquiry")} aria-label="View all submissions" className="rounded-lg p-2 text-slate hover:bg-paper"><ArrowRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-4 divide-y divide-ink/8">
            {openItems.slice(0, 4).map((item) => (
              <button key={item.id} type="button" onClick={() => onSelectSubmission(item.id)} className="flex w-full items-center gap-3 py-3 text-left hover:bg-paper/60">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f5efe8] text-[10px] font-semibold uppercase text-[#9b5725]">{(item.name || "—").split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{item.name || "Untitled local record"}</span><span className="mt-0.5 block truncate text-[10px] text-slate">{item.summary}</span></span>
                <StatusBadge status={item.status} />
              </button>
            ))}
            {!openItems.length && <p className="py-8 text-center text-xs text-slate">No open submissions need attention.</p>}
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-xl border border-ink/8 bg-white p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div><h3 className="text-sm font-semibold">Quick access</h3><p className="mt-1 text-[11px] text-slate">Common website and operations tasks</p></div>
          <CircleHelp className="h-4 w-4 text-slate/60" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Manage projects", "Update project information", "projects", FolderKanban],
            ["Review vendors", "Check new applications", "vendor", ClipboardList],
            ["Edit company profiles", "Manage business engines", "companies", Building2],
            ["Website settings", "Contact details and publishing", "settings", Settings],
          ].map(([title, detail, module, Icon]) => (
            <button key={module} type="button" onClick={() => onOpen(module)} className="flex items-center gap-3 rounded-lg border border-ink/8 p-3 text-left transition hover:border-orange-200 hover:bg-orange-50/40">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper text-slate"><Icon className="h-4 w-4" /></span>
              <span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{title}</span><span className="mt-1 block text-[10px] text-slate">{detail}</span></span>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate/50" />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function ContentManager({ module, items, publishedContent, search, onSearch, onAdd, onEdit, onPublish, onDelete }) {
  const isSettings = module === "settings";
  const canAdd = !["home", "settings", "investor-info"].includes(module);
  const getPublicationLabel = (item) => {
    if (item.hasUnpublishedChanges) return "Draft saved · published version remains live";
    if (item.publicationStatus === "published" || publishedContent.some((record) => record.id === item.id)) {
      return "Published on the website";
    }
    if (item.isSourceContent && item.publicationStatus === "draft") {
      return "Draft saved · source version remains live";
    }
    return item.isSourceContent || !item.publicationStatus ? "Live source content" : "Draft not published";
  };
  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs text-slate">Website management</p><h2 className="mt-1 text-2xl font-semibold">{moduleLabels[module]}</h2><p className="mt-1 text-sm text-slate">{isSettings ? "Review public site contact and configuration details." : "Edit drafts, then publish approved content to the public website."}</p></div>
        {canAdd && <div className="flex flex-wrap gap-2">
          {module === "products" && <Button variant="outline" onClick={() => onAdd("quality")} className="h-10 rounded-lg px-4 text-xs"><Plus className="h-4 w-4" /> Add quality stage</Button>}
          <Button onClick={() => onAdd()} className="h-10 rounded-lg bg-[#e2701b] px-4 text-xs text-white hover:bg-[#ca6011]"><Plus className="h-4 w-4" /> Add draft</Button>
        </div>}
      </div>
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-ink/8 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate/60" /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search content..." className="h-10 w-full rounded-lg border border-ink/10 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></div>
        <span className="text-[11px] text-slate">{items.length} {items.length === 1 ? "record" : "records"}</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-ink/8 bg-white">
        <div className="hidden grid-cols-[minmax(220px,1.3fr)_minmax(180px,1fr)_minmax(120px,0.7fr)_auto] gap-4 border-b border-ink/8 bg-[#fbfbfc] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate md:grid">
          <span>Record</span><span>Details</span><span>Website location</span><span />
        </div>
        {items.length ? items.map((item) => (
          <div key={item.id} className="grid gap-3 border-b border-ink/8 px-4 py-4 last:border-b-0 md:grid-cols-[minmax(220px,1.3fr)_minmax(180px,1fr)_minmax(120px,0.7fr)_auto] md:items-center md:gap-4 md:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#f7f0e9] text-[#9b5725]"><ContentIcon module={module} /></span>
              <span className="min-w-0"><span className="block truncate text-xs font-semibold">{item.title || "Untitled draft"}</span><span className="mt-1 block text-[10px] text-slate">{getPublicationLabel(item)}</span></span>
            </div>
            <p className="line-clamp-2 text-xs leading-5 text-slate">{item.fields.description || item.fields.introduction || item.fields.summary || item.fields.excerpt || item.fields.tagline || item.fields.phone || "Content record"}</p>
            <span className="truncate text-[11px] text-slate">{item.path}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(item.id)} className="h-9 rounded-lg px-3 text-xs">Edit draft</Button>
              <Button size="sm" onClick={() => onPublish(item.id)} className="h-9 rounded-lg bg-[#e2701b] px-3 text-xs text-white hover:bg-[#ca6011]">Publish</Button>
              {!isSettings && <Button variant="outline" size="sm" onClick={() => onDelete(item.id)} className="h-9 rounded-lg border-red-200 px-3 text-xs text-red-700 hover:bg-red-50">Delete</Button>}
            </div>
          </div>
        )) : <EmptyState title="No content records" description="Try another search or add a new local draft." />}
      </div>
    </>
  );
}

function ContentIcon({ module }) {
  const Icon = module === "companies" ? Building2 : module === "products" ? ShoppingBag : module === "projects" ? FolderKanban : module === "news" ? Newspaper : module === "settings" ? Settings : BookOpen;
  return <Icon className="h-4 w-4" />;
}

function ContentEditor({ item, module, isNewDraft, onClose, onSave, onPublish, onError }) {
  const [draft, setDraft] = useState(() => item ? structuredClone(item) : null);
  if (!draft) return null;

  const fields = Object.entries(draft.fields);
  const updateField = (key, value) => {
    const nextFields = { ...draft.fields, [key]: value };
    setDraft({ ...draft, title: nextFields.name || nextFields.title || draft.title, fields: nextFields });
  };
  const updateRecordName = (value) => {
    const nextFields = { ...draft.fields };
    if (Object.hasOwn(nextFields, "name")) nextFields.name = value;
    else if (Object.hasOwn(nextFields, "title")) nextFields.title = value;
    const newRecordPrefixes = {
      projects: "project-new-",
      companies: "company-new-",
      products: "product-new-",
      news: "insight-new-",
    };
    const isNewRecord = Boolean(newRecordPrefixes[draft.category] && draft.id.startsWith(newRecordPrefixes[draft.category]));
    const identityField = draft.category === "products" || draft.category === "news" ? "id" : "slug";
    if (isNewRecord && nextFields[identityField] !== undefined) {
      nextFields[identityField] = slugify(value) || draft.fields[identityField];
    }
    setDraft({ ...draft, title: value, fields: nextFields });
  };

  const save = (event) => {
    event.preventDefault();
    if (!draft.title.trim()) {
      onError("Give this draft a title before saving.");
      return;
    }
    onSave(draft);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/35" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="content-editor-title" className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4 md:px-7">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">Website content · {moduleLabels[module]}</p><h2 id="content-editor-title" className="mt-1 text-lg font-semibold">Edit website content</h2></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate hover:bg-paper" aria-label="Close editor"><X className="h-4 w-4" /></button>
        </header>
        <form onSubmit={save} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5 md:p-7">
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-[11px] leading-5 text-blue-900">Saving stores a draft in Neon. Use Publish to make the content visible on the public website.</div>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold">Dashboard record name</span><input value={draft.title} onChange={(event) => updateRecordName(event.target.value)} className="h-10 w-full rounded-lg border border-ink/15 px-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></label>
            {fields.map(([key, value]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-xs font-semibold capitalize">{projectFieldLabels[key] || key.replaceAll(/([A-Z])/g, " $1").replaceAll("_", " ")}</span>
                {key === "engine" ? (
                  <select value={value} onChange={(event) => updateField(key, event.target.value)} className="h-10 w-full rounded-lg border border-ink/15 bg-white px-3 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                    {engines.map((engine) => <option key={engine.id} value={engine.id}>{engine.name}</option>)}
                  </select>
                ) : key === "companySlug" ? (
                  <select value={value} onChange={(event) => updateField(key, event.target.value)} className="h-10 w-full rounded-lg border border-ink/15 bg-white px-3 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                    {companies.map((company) => <option key={company.slug} value={company.slug}>{company.name}</option>)}
                  </select>
                ) : key === "accent" ? (
                  <input type="color" value={value} onChange={(event) => updateField(key, event.target.value)} className="h-10 w-24 rounded-lg border border-ink/15 bg-white p-1" />
                ) : value.length > 100 || value.includes("\n") || ["summary", "overview", "gallery", "introduction", "description", "excerpt", "content", "groupConnection", "publicationStatus"].includes(key) ? (
                  <textarea rows={Math.min(8, Math.max(3, value.split("\n").length))} value={value} onChange={(event) => updateField(key, event.target.value)} className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-xs leading-5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                ) : (
                  <input value={value} onChange={(event) => updateField(key, event.target.value)} className="h-10 w-full rounded-lg border border-ink/15 px-3 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                )}
              </label>
            ))}
            {!fields.length && <p className="text-xs text-slate">This draft has no editable fields yet.</p>}
          </div>
          <footer className="flex justify-end gap-2 border-t border-ink/10 p-4 md:px-7">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">{isNewDraft ? "Discard draft" : "Cancel"}</Button>
            <Button type="submit" variant="outline" className="rounded-lg">Save draft</Button>
            <Button type="button" onClick={() => onPublish(draft)} className="rounded-lg bg-[#e2701b] text-white hover:bg-[#ca6011]"><Check className="h-4 w-4" /> Publish</Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function SubmissionsManager({ module, items, search, onSearch, selected, onSelect, onEdit, onUpdate, onDelete, onDownloadCv }) {
  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs text-slate">Business operations · Neon</p><h2 className="mt-1 text-2xl font-semibold">{moduleLabels[module]}</h2><p className="mt-1 text-sm text-slate">These are real submissions from the public website. New test records are not created here.</p></div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.8fr)]">
        <section className="min-w-0 overflow-hidden rounded-xl border border-ink/8 bg-white">
          <div className="flex flex-col gap-3 border-b border-ink/8 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate/60" /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search name, company, ID..." className="h-9 w-full rounded-lg border border-ink/10 pl-9 pr-3 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /></div>
            <span className="text-[11px] text-slate">{items.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead className="bg-[#fbfbfc] text-[10px] font-semibold uppercase tracking-[0.08em] text-slate"><tr><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Submission</th><th className="px-4 py-3">Received</th><th className="px-4 py-3">Status</th></tr></thead>
              <tbody className="divide-y divide-ink/8">
                {items.map((item) => (
                  <tr key={item.id} onClick={() => onSelect(item.id)} className={`cursor-pointer transition hover:bg-orange-50/40 ${selected?.id === item.id ? "bg-orange-50/70" : ""}`}>
                    <td className="px-4 py-3.5"><p className="text-xs font-semibold">{item.name || "Name not provided"}</p><p className="mt-1 text-[10px] text-slate">{item.company}</p></td>
                    <td className="max-w-[260px] px-4 py-3.5"><p className="text-[10px] font-semibold text-slate">{item.id}</p><p className="mt-1 truncate text-xs">{item.summary}</p></td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-[11px] text-slate">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!items.length && <EmptyState title="No submissions yet" description="Submissions from this section of the public website will appear here." />}
          </div>
          <div className="flex items-center justify-between border-t border-ink/8 px-4 py-3 text-[10px] text-slate"><span>Neon records</span><span className="inline-flex items-center gap-1">{items.length ? `1–${items.length} of ${items.length}` : "0 of 0"} <ArrowRight className="h-3 w-3" /></span></div>
        </section>
        {selected ? (
          <SubmissionDetail key={selected.id} item={selected} onUpdate={onUpdate} onEdit={onEdit} onDelete={onDelete} onDownloadCv={onDownloadCv} />
        ) : (
          <section className="grid min-h-[360px] place-items-center rounded-xl border border-dashed border-ink/15 bg-white p-6 text-center">
            <div><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-paper text-slate"><MessageSquareText className="h-5 w-5" /></div><h3 className="mt-4 text-sm font-semibold">Select a submission</h3><p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate">Review contact details, assign follow-up and keep notes for your team.</p></div>
          </section>
        )}
      </div>
    </>
  );
}

function SubmissionDetail({ item, onUpdate, onEdit, onDelete, onDownloadCv }) {
  const [note, setNote] = useState("");
  const addNote = (event) => {
    event.preventDefault();
    const value = note.trim();
    if (!value) return;
    onUpdate(item.id, { notes: [...item.notes, { text: value, at: new Date().toISOString() }] }, "Added a follow-up note");
    setNote("");
  };
  return (
    <aside className="overflow-hidden rounded-xl border border-ink/8 bg-white">
      <div className="border-b border-ink/8 p-5">
        <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate">{item.id}</p><h3 className="mt-2 text-lg font-semibold">{item.name || "Untitled local record"}</h3><p className="mt-1 text-xs text-slate">{item.company}</p></div><StatusBadge status={item.status} /></div>
        <p className="mt-4 text-xs leading-5 text-slate">{item.summary}</p>
        <Button type="button" variant="outline" size="sm" onClick={() => onEdit(item.id)} className="mt-3 h-8 rounded-lg text-[11px]">Edit submission details</Button>
      </div>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-3">
          <InfoField label="Email" value={item.email} />
          <InfoField label="Phone" value={item.phone} />
          <InfoField label="Received" value={formatDate(item.createdAt)} />
          <InfoField label="Type" value={item.type} />
        </div>
        {item.type === "career" && item.cvPathname && (
          <div className="rounded-lg border border-ink/10 bg-paper/50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate">Candidate CV</p>
            <p className="mt-1 truncate text-xs font-medium" title={item.cvFilename}>{item.cvFilename}</p>
            <p className="mt-1 text-[10px] text-slate">{(item.cvSize / 1024).toFixed(0)} KB · Private file</p>
            <Button type="button" variant="outline" size="sm" onClick={() => onDownloadCv(item)} className="mt-3 h-8 rounded-lg text-[11px]"><FileText className="h-3.5 w-3.5" /> Download CV</Button>
          </div>
        )}
        <label className="block"><span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate">Status</span><select value={item.status} onChange={(event) => onUpdate(item.id, { status: event.target.value }, `Changed status to ${event.target.value}`)} className="h-10 w-full rounded-lg border border-ink/12 bg-white px-3 text-xs outline-none focus:border-orange-400">{statuses.map((status) => <option key={status} value={status}>{capitalize(status)}</option>)}</select></label>
        <label className="block"><span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate">Assigned to</span><select value={item.assignedTo} onChange={(event) => onUpdate(item.id, { assignedTo: event.target.value }, `Assigned to ${event.target.value || "unassigned"}`)} className="h-10 w-full rounded-lg border border-ink/12 bg-white px-3 text-xs outline-none focus:border-orange-400"><option value="">Unassigned</option><option>Sales team</option><option>HR team</option><option>Operations team</option><option>Investor relations</option></select></label>
        <Button type="button" variant="outline" size="sm" onClick={() => onDelete(item.id)} className="h-9 w-full rounded-lg border-red-200 text-xs text-red-700 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete record</Button>
        <div className="border-t border-ink/8 pt-4"><h4 className="text-xs font-semibold">Follow-up history</h4>
          {item.notes.length ? <div className="mt-3 space-y-3">{item.notes.map((entry, index) => <div key={`${entry.at}-${index}`} className="border-l-2 border-orange-200 pl-3"><p className="text-xs leading-5">{entry.text}</p><p className="mt-1 text-[10px] text-slate">{formatDate(entry.at)}</p></div>)}</div> : <p className="mt-2 text-[11px] text-slate">No notes yet.</p>}
          <form onSubmit={addNote} className="mt-3 space-y-2"><textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} placeholder="Add an internal note..." className="w-full rounded-lg border border-ink/12 px-3 py-2 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" /><Button type="submit" variant="outline" size="sm" className="h-8 rounded-lg text-[11px]">Add note</Button></form>
        </div>
      </div>
    </aside>
  );
}

function SubmissionEditor({ item, isNewRecord, onClose, onSave, onError }) {
  const [draft, setDraft] = useState(() => {
    if (!item) return null;
    return {
      ...item,
      requirement_items: Array.isArray(item.requirement_items)
        ? JSON.stringify(item.requirement_items, null, 2)
        : item.requirement_items || "",
    };
  });
  if (!draft) return null;

  const fields = Object.entries(draft).filter(([key]) =>
    ![
      "id", "recordId", "type", "createdAt", "notes",
      "cvPathname", "cvFilename", "cvContentType", "cvSize",
    ].includes(key),
  );
  const save = (event) => {
    event.preventDefault();
    const recordName = draft.name || draft.contact_name || draft.full_name || draft.company_name || "";
    if (!recordName.trim()) {
      onError("Enter a name or company name before saving this record.");
      return;
    }
    const requirementItems = draft.requirement_items;
    let parsedItems = requirementItems;
    if (typeof requirementItems === "string" && requirementItems.trim()) {
      try {
        parsedItems = JSON.parse(requirementItems);
      } catch {
        parsedItems = requirementItems;
      }
    }
    onSave({ ...draft, requirement_items: parsedItems });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/35" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="submission-editor-title" className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4 md:px-7">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-700">Neon record · {capitalize(item.type)}</p><h2 id="submission-editor-title" className="mt-1 text-lg font-semibold">Edit record details</h2></div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate hover:bg-paper" aria-label="Close editor"><X className="h-4 w-4" /></button>
        </header>
        <form onSubmit={save} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5 md:p-7">
            <div className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5 text-[11px] leading-5 text-orange-900">Saving updates this Neon record. It does not create a new form submission or send a notification.</div>
            {fields.map(([key, value]) => {
              const stringValue = typeof value === "boolean" ? String(value) : String(value ?? "");
              const isLong = ["requirement", "requirement_items", "description", "cover_note", "message", "areas_of_interest", "summary"].includes(key) || stringValue.length > 120;
              return (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-xs font-semibold capitalize">{key.replaceAll(/([A-Z])/g, " $1").replaceAll("_", " ")}</span>
                  {key === "status" ? (
                    <select value={stringValue} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} className="h-10 w-full rounded-lg border border-ink/15 bg-white px-3 text-xs outline-none focus:border-orange-400">
                      {statuses.map((status) => <option key={status} value={status}>{capitalize(status)}</option>)}
                      {!statuses.includes(stringValue) && <option value={stringValue}>{capitalize(stringValue)}</option>}
                    </select>
                  ) : typeof value === "boolean" ? (
                    <select value={stringValue} onChange={(event) => setDraft({ ...draft, [key]: event.target.value === "true" })} className="h-10 w-full rounded-lg border border-ink/15 bg-white px-3 text-xs outline-none focus:border-orange-400">
                      <option value="false">No</option><option value="true">Yes</option>
                    </select>
                  ) : isLong ? (
                    <textarea rows={key === "requirement_items" ? 6 : 3} value={stringValue} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} className="w-full rounded-lg border border-ink/15 px-3 py-2.5 text-xs leading-5 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  ) : (
                    <input value={stringValue} onChange={(event) => setDraft({ ...draft, [key]: event.target.value })} className="h-10 w-full rounded-lg border border-ink/15 px-3 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100" />
                  )}
                </label>
              );
            })}
          </div>
          <footer className="flex justify-end gap-2 border-t border-ink/10 p-4 md:px-7">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">{isNewRecord ? "Discard record" : "Cancel"}</Button>
            <Button type="submit" className="rounded-lg bg-[#e2701b] text-white hover:bg-[#ca6011]"><Check className="h-4 w-4" /> Save record</Button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function InfoField({ label, value }) {
  return <div className="min-w-0"><p className="text-[9px] font-semibold uppercase tracking-wide text-slate">{label}</p><p className="mt-1 truncate text-[11px] font-medium">{value || "Not provided"}</p></div>;
}

function DocumentsManager({ documents }) {
  return (
    <ModulePanel title="Document centre" intro="No document storage is connected to this local preview." icon={FileText}>
      <div className="divide-y divide-ink/8">
        {documents.map((document) => <div key={document.name} className="flex items-center gap-3 py-4"><span className="grid h-10 w-10 place-items-center rounded-lg bg-paper text-slate"><FileText className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{document.name}</span><span className="mt-1 block text-[10px] text-slate">{document.category} · {document.version}</span></span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] text-slate">{document.access}</span></div>)}
      </div>
      {!documents.length && <EmptyState title="No documents" description="No files have been added." />}
    </ModulePanel>
  );
}

function ReportsManager({ submissions }) {
  const types = ["enquiry", "contact", "vendor", "career", "investor"];
  return (
    <ModulePanel title="Reports & analytics" intro="Counts below include only local browser records." icon={Activity}>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{types.map((type) => <div key={type} className="rounded-lg border border-ink/8 p-4"><p className="text-xs capitalize text-slate">{type === "career" ? "Career applications" : `${type} submissions`}</p><p className="mt-3 text-2xl font-semibold">{submissions.filter((item) => item.type === type).length}</p><p className="mt-1 text-[10px] text-slate">local records</p></div>)}</div>
      <div className="mt-5 rounded-lg border border-dashed border-ink/15 bg-paper/50 p-8 text-center"><Activity className="mx-auto h-6 w-6 text-slate/50" /><p className="mt-3 text-xs font-semibold">No live reporting data is connected</p><p className="mx-auto mt-1 max-w-md text-[11px] leading-5 text-slate">Live reports require authenticated access to operational records.</p></div>
    </ModulePanel>
  );
}

function EmployeesManager({ employees }) {
  return (
    <ModulePanel title="Employee accounts" intro="No employee accounts are connected to this local preview." icon={UsersRound}>
      <div className="divide-y divide-ink/8">{employees.map((employee) => <div key={employee.name} className="flex items-center gap-3 py-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#f5efe8] text-[10px] font-semibold text-[#9b5725]">{employee.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span><span className="flex-1"><span className="block text-xs font-semibold">{employee.name}</span><span className="mt-1 block text-[10px] text-slate">{employee.role}</span></span><span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] text-blue-800">{employee.access}</span></div>)}</div>
      {!employees.length && <EmptyState title="No employee accounts" description="Admin roles and sign-in are not configured." />}
    </ModulePanel>
  );
}

function AuditManager({ activity }) {
  return (
    <ModulePanel title="Audit log" intro="Actions from this browser session are shown here." icon={ShieldCheck}>
      <div className="divide-y divide-ink/8">{activity.map((entry) => <div key={entry.id} className="flex items-start gap-3 py-4"><span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-paper text-slate"><Activity className="h-3.5 w-3.5" /></span><span className="flex-1"><span className="block text-xs font-medium">{entry.action}</span><span className="mt-1 block text-[10px] text-slate">{entry.target}</span></span><span className="whitespace-nowrap text-[10px] text-slate">{formatDate(entry.at)}</span></div>)}</div>
      {!activity.length && <EmptyState title="No activity yet" description="Local dashboard actions will appear here." />}
    </ModulePanel>
  );
}

function ModulePanel({ title, intro, icon: Icon, children }) {
  return <><div className="mb-6"><p className="text-xs text-slate">Administration</p><h2 className="mt-1 text-2xl font-semibold">{title}</h2><p className="mt-1 text-sm text-slate">{intro}</p></div><section className="rounded-xl border border-ink/8 bg-white p-5 md:p-6"><div className="mb-4 flex items-center gap-2"><Icon className="h-4 w-4 text-orange-700" /><h3 className="text-sm font-semibold">{title}</h3></div>{children}</section></>;
}

function StatusBadge({ status }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-semibold capitalize ring-1 ring-inset ${statusClass[status] || statusClass.new}`}>{status}</span>;
}

function EmptyState({ title, description }) {
  return <div className="px-5 py-14 text-center"><LifeBuoy className="mx-auto h-6 w-6 text-slate/40" /><p className="mt-3 text-xs font-semibold">{title}</p><p className="mt-1 text-[11px] text-slate">{description}</p></div>;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
