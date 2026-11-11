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
