/**
 * 
 * @param {Map<TK, TV>} map 
 * @param {TK} key 
 * @returns {TV}
 */
export function mapFilter(map, key) {
    var data = map[key];
        
    if(data == null)
    {
        const keys = Object.keys(map);
        console.info(keys)
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const match = new RegExp(key).exec(key);
            
            if(match !== null)
            {
                return map[key];
            }                
        }
    }

    return data;

}