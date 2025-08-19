export interface NewsItem {
    id: number;
    title: string;
    description: string;
    publishedAt: Date;
    images: string[]; // at least one image
}
