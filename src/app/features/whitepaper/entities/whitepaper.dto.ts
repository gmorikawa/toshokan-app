import { CategoryDTO } from "@features/category/entities/category.dto";
import { TopicDTO } from "@features/topic/entities/topic.dto";

export interface WhitepaperDTO {
    id: string;
    title: string;
    year: number;
    authors: string[];
    description?: string;

    categoryId: string;
    category: CategoryDTO | null;

    topics: TopicDTO[];
}