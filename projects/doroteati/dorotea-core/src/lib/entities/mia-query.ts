export class MiaQuery {
    pageCurrent = 1;
    lastPage = 1;
    itemPerPage = 50;

    filters: {[k: string]: any} = {};
    wheres: Array<any> = [];
    joins: Array<{ table: string, column: string, relation: string }> = [];

    withs: Array<string> = [];

    search = '';

    /**
     * @deprecated
     */
    ordType = { title: '', asc: 1 };

    orders: Array<{ field: string, type: string}> = [];

    addJoin(table: string, column: string, relation: string) {
        this.joins.push({
            table: table,
            column: column,
            relation: relation
        });
    }

    removeJoin(index: number) {
        this.joins.splice(index, 1);
    }

    resetJoins() {
        this.joins = [];
    }
    /**
     * 
     * @param key 
     * @param value 
     */
    addWhereDate(key: string, value: string) {
        this.wheres.push({
            type: 'date',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllDate() {
        this.removeWhereByType('date');
    }
    /**
     * 
     * @param key 
     * @param value 2020-01-01
     */
     addWhereWeek(key: string, value: string) {
        this.wheres.push({
            type: 'week',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllWeek() {
        this.removeWhereByType('week');
    }
    /**
     * 
     * @param key 
     * @param value 
     */
     addWhereMonth(key: string, value: string) {
        this.wheres.push({
            type: 'month',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllMonth() {
        this.removeWhereByType('month');
    }
    /**
     * 
     * @param key 
     * @param value 
     */
     addWhereYear(key: string, value: string) {
        this.wheres.push({
            type: 'year',
            key: key,
            value: value
        })
    }
    /**
     * Remove all where by type date
     */
    removeWhereAllYear() {
        this.removeWhereByType('year');
    }
    /**
     * 
     * @param query 
     * @param values
     */
    addWhereRaw(query: string, values: []) {
        this.wheres.push({
            type: 'raw',
            query: query,
            values: values
        })
    }
    /**
     * Remove all where by type between
     */
    removeWhereAllRaw() {
        this.removeWhereByType('raw');
    }
    /**
     * Remove all where by type
     * @param type 
     */
    removeWhereByType(type: string) {
        this.wheres = this.wheres.filter(i => i.type != type);
    }

    /**
     * 
     * @param key 
     * @param from 
     * @param to 
     */
     addWhereBetween(key: string, from: any, to: any) {
        this.wheres.push({
            type: 'between',
            key: key,
            from: from,
            to: to,
        })
    }
    /**
     * Remove all where by type between
     */
    removeWhereAllBetween() {
        this.removeWhereByType('between');
    }

    addWhereEqual(key: string, value: string) {
        this.wheres.push({
            type: 'equal',
            key: key,
            value: value
        })
    }

    addWhereGreaterThan(key: string, value: string) {
        this.wheres.push({
            type: 'greater-than',
            key: key,
            value: value
        })
    }

    addWhereLessThan(key: string, value: string) {
        this.wheres.push({
            type: 'less-than',
            key: key,
            value: value
        })
    }

    addWhereIn(key: string, values: any) {
        this.wheres.push({
            type: 'in',
            key: key,
            value: values
        })
    }

    addWhere(key: string, value: any) {
        this.filters[key] = value;
    }
    /**
     * @deprecated
     * @param key 
     * @param values 
     */
    addwhereIn(key: string, values: any) {
        this.filters[key + ':in'] = values;
    }

    addwhereNotIn(key: string, values: Array<any>) {
        this.filters[key + ':notin'] = values;
    }

    /**
     * @deprecated
     * @param key 
     * @param value 
     */
    addwhereLike(key: string, value: any) {
        this.addWhereLike(key, value);
    }

    addWhereLike(key: string, value: any) {
        this.filters[key + ':like'] = value;
    }

    addWhereLikes(keys: Array<string>, value: any) {
        this.wheres.push({
            type: 'likes',
            keys: keys,
            value: value
        })
    }

    /**
     * @deprecated
     * @param key 
     * @param from 
     * @param to 
     */
    addwhereBetween(key: string, from: string, to: string) {
        this.addWhereBetween(key, from, to);
    }

    removeWhere(key: string) {
        // Remove property
        delete this.filters[key];
        // Remove Where in new Structure
        let removes = [];
        for (const where of this.wheres) {
            if(where.key == key){
                removes.push(where);
            }
        }

        for (const rem of removes) {
            let index = this.wheres.indexOf(rem);
            if(index != -1){
                this.wheres.splice(index, 1);
            }
        }
    }

    getWhere(): string {
        let result = '';
        let isFirst = true;
        // tslint:disable-next-line:forin
        for (const key in this.filters) {
            const value = this.filters[key];
            if (!isFirst) {
                result += ';';
            }
            result += key + ':' + value;
            isFirst = false;
        }
        return result;
    }

    resetWhere() {
        this.filters = [];
        this.wheres = [];
    }

    addWith(name: string) {
        this.withs.push(name);
    }

    removeWith(name: string) {
        let index = this.withs.indexOf(name);
        if (index != -1) {
            this.withs.splice(index, 1);
        }
    }

    resetWith() {
        this.withs = [];
    }

    setPagination(lastPage: number, itemPerPage: number) {
        // Guardamos ultima pagina
        this.lastPage = lastPage;
        this.itemPerPage = itemPerPage;
    }
    /**
     * 
     * @param field 
     * @param type 
     */
    addOrder(field: string, type: string) {
        this.orders.push({ field: field, type: type });
    }
    /**
     * 
     * @param field 
     */
    addOrderAsc(field: string) {
        this.addOrder(field, 'asc');
    }
    /**
     * 
     * @param field 
     */
    addOrderDesc(field: string) {
        this.addOrder(field, 'desc');
    }
    /**
     * 
     * @param field 
     */
    removeOrder(field: string) {
        let finds = this.orders.filter(i => i.field == field);
        finds.forEach(f => {
            let index = this.orders.indexOf(f);
            if(index >= 0){
                this.orders.splice(index, 1);
            }
        });
    }

    toParams() {
        /**
         * Process ord deprecated
         */
        if(this.ordType && this.ordType.title != ''){
            if(this.ordType.asc == 1){
                this.addOrderAsc(this.ordType.title);
            } else {
                this.addOrderDesc(this.ordType.title);
            }
            this.ordType.title = '';
        }

        return {
            page: this.pageCurrent,
            where: this.getWhere(),
            wheres: this.wheres,
            joins: this.joins,
            withs: this.withs,
            with: this.withs,
            search: this.search,
            orders: this.orders,
            limit: this.itemPerPage
        };
    }
}
