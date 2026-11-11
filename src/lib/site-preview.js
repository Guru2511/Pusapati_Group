import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublishedSiteContent } from "@/lib/admin-fns";
import { applyPublishedContent } from "@/lib/site-content";
import { CONTACT } from "@/data/group";

export { applyPublishedContent } from "@/lib/site-content";

export function usePublishedContent(category) {
  const { data = [], error } = useQuery({
    queryKey: ["published-site-content"],
    queryFn: () => getPublishedSiteContent(),
    staleTime: 60_000,
  });
  useEffect(() => {
    if (error) console.error("[published site content] Could not load content from Neon:", error);
  }, [error]);
  return data.filter((record) => category === "all" || record.category === category);
}

export function usePublicContact() {
  const records = usePublishedContent("settings");
  const fields = records.find((record) => record.id === "site-contact" && !record.deleted)?.fields;
  const address = fields?.address;
  return {
    ...CONTACT,
    phone: fields?.phone ?? CONTACT.phone,
    email: fields?.email ?? CONTACT.email,
    hours: fields?.hours ?? CONTACT.hours,
    whatsapp: fields?.whatsapp ?? CONTACT.whatsapp,
    addressLines: address === undefined ? CONTACT.addressLines : address.split(/\r?\n/).filter(Boolean),
  };
}
