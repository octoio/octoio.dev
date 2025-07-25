/**
 * Shared style constants to reduce code duplication and maintain consistency
 */

export const COMMON_STYLES = {
  // Link styles
  link: "text-indigo-500 no-underline font-medium transition-colors duration-200 hover:text-indigo-600",

  // Badge styles
  tag: "bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium",
  featuredBadge:
    "bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block",

  // Card styles
  card: "bg-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
  cardFeatured: "border-2 border-indigo-500",
  cardDefault: "border border-slate-200",

  // Layout styles
  gridLayout: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  section: "py-20 px-8 bg-slate-50",
  container: "max-w-6xl mx-auto",

  // Navigation styles
  backNav:
    "inline-flex items-center gap-2 text-indigo-500 no-underline mb-12 font-medium transition-colors duration-200 hover:text-indigo-600",

  // Typography styles
  sectionTitle: "text-4xl font-bold text-center mb-12 text-slate-800",
  subsectionTitle: "text-3xl font-semibold my-12 text-slate-800",
  cardTitle: "text-2xl font-semibold mb-4 text-slate-800",
  cardDescription: "text-slate-600 leading-relaxed mb-6",
};

/**
 * Helper function to combine card styles based on featured status
 */
export const getCardStyles = (featured: boolean) => {
  return `${COMMON_STYLES.card} ${featured ? COMMON_STYLES.cardFeatured : COMMON_STYLES.cardDefault}`;
};
