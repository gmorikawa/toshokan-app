import { CategoryDTO } from "@features/category/entities/category.dto";
import { PublisherDTO } from "@features/publisher/entities/publisher.dto";
import { TopicDTO } from "@features/topic/entities/topic.dto";

export interface BookDTO {
    id: string;
    title: string;
    year: number;
    authors: string[];
    description?: string;

    categoryId: string;
    category: CategoryDTO | null;
    publisherId: string;
    publisher: PublisherDTO | null;

    topics: TopicDTO[];

    isbn: string;
}