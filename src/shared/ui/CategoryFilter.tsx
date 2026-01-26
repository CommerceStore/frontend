interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex justify-start gap-4 overflow-x-auto border-b border-zinc-200 pb-1">
      <button
        onClick={() => onCategoryChange(null)}
        className={`
          relative whitespace-nowrap px-4 py-3 text-lg font-semibold transition-colors
          ${
            selectedCategory === null
              ? "text-zinc-900"
              : "text-zinc-500 hover:text-zinc-700"
          }
        `}
      >
        전체
        {selectedCategory === null && (
          <span className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900 transition-all duration-300" />
        )}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            relative whitespace-nowrap px-4 py-3 text-lg font-semibold transition-colors
            ${
              selectedCategory === category
                ? "text-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }
          `}
        >
          {category}
          {selectedCategory === category && (
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900 transition-all duration-300" />
          )}
        </button>
      ))}
    </div>
  );
}
