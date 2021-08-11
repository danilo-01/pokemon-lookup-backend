class JsToSQL {
    static setString(data){
        const dataClone = { ...data }
        const dataKeys = Object.keys(dataClone);
        let setString = [];

        let counter = 1;
        for(let key of dataKeys){
            // If undefined continue 
            if(data[key] == undefined) {
                delete dataClone[key]
                continue;
            }
            const str = `${key}=$${counter}`;
            setString.push(str);
            counter++;
        }
        setString = setString.join(", ");
        return {
            setString,
            vals: Object.values(dataClone)
        }
    }
}

module.exports = JsToSQL;