export type PaginationApiModel<TItem> = {
    total: number;
    items: TItem[];
    per_page: number;
    page: number;
}