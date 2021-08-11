class SqlToJs {
    static convert(obj, oldKey, newKey){
        if (oldKey !== newKey) {
            Object.defineProperty(obj, newKey,
                Object.getOwnPropertyDescriptor(obj, oldKey));
            delete obj[oldKey];
        }
    }
}

module.exports = SqlToJs;