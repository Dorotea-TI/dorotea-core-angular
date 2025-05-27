export class MiaConfirmModalConfig {
    title: string = '';
    caption: string = '';
    buttons: Array<{ title: string, value: any}> = [
        { title: 'NO', value: false },
        { title: 'YES', value: true },
    ];

    constructor(title?: string, caption?: string) {
        this.title = title ?? '';
        this.caption = caption ?? '';
    }
}
