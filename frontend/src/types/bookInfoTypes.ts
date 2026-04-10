export const BOOK_CONDITIONS = [
    { key: "new", label: "New" },
    { key: "like-new", label: "Like New" },
    { key: "good", label: "Good" },
    { key: "acceptable", label: "Acceptable" },
    { key: "damaged", label: "Damaged" }
] as const;

export type BookCondition=(typeof BOOK_CONDITIONS)[number];