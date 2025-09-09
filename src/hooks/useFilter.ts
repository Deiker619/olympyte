import { useState, useMemo } from "react";

type Predicate<T> = (item: T) => boolean;

export function useFilters<T>(data: T[]) {
  const [search, setSearch] = useState("");
  const [predicates, setPredicates] = useState<Predicate<T>[]>([]);

  // 🔍 Aplica todos los filtros + búsqueda
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // aplica todos los predicados personalizados
      const passPredicates = predicates.every((p) => p(item));

      // si hay search, lo busca en cualquier propiedad string
      const passSearch = search
        ? Object.values(item as Record<string, unknown>)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;
      return passPredicates && passSearch;
    });
  }, [data, search, predicates]);

  const addFilter = (predicate: Predicate<T>) => {
    setPredicates((prev) => [...prev, predicate]);
  };

  const clearFilters = () => {
    setPredicates([]);
    setSearch("");
  };

  return {
    filteredData,
    search,
    setSearch,
    addFilter,
    clearFilters,
  };
}
