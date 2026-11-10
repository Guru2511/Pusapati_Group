import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublishedSiteContent } from "@/lib/admin-fns";
import { CONTACT } from "@/data/group";

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

export function applyPublishedContent(items, records, category, getId, transform, createNew) {
  const categoryRecords = records.filter((record) => record.category === category);
  const deletedIds = new Set(categoryRecords.filter((record) => record.deleted).map((record) => record.id));
  const recordsById = new Map(categoryRecords.filter((record) => !record.deleted).map((record) => [record.id, record.fields]));
  const visibleItems = items.filter((item) => !deletedIds.has(getId(item, category)));
  const existingIds = new Set(visibleItems.map((item) => getId(item, category)));
  const updatedItems = visibleItems.map((item) => {
    const fields = recordsById.get(getId(item, category));
    return fields ? transform(item, fields) : item;
  });
  if (!createNew) return updatedItems;

  const newItems = categoryRecords
    .filter((record) => !record.deleted && !existingIds.has(record.id))
    .map((record) => createNew(record.fields));
  return [...updatedItems, ...newItems];
}
