import { Question } from "../types/types";

export const sortCategories = (categories: Record<string, Question[]>) => {
    const categoryKeys = Object.keys(categories);
    const generalIndex = categoryKeys.indexOf("General");

    if (generalIndex !== -1) {
        categoryKeys.splice(generalIndex, 1);
        categoryKeys.unshift("General");
    }

    return categoryKeys.reduce((acc, key) => {
        acc[key] = categories[key];
        return acc;
    }, {} as Record<string, Question[]>);
};