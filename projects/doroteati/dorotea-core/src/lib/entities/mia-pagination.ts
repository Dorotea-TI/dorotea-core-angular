export class MiaPagination<T> {
    current_page: number = 0;
    first_page_url: string = '';
    from: string = '';
    last_page: number = 0;
    last_page_url: string = '';
    next_page_url: string = '';
    path: string = '';
    per_page: number = 0;
    prev_page_url: string = '';
    to: string = '';
    total: number = 0;
    data: Array<T> = [];
}
