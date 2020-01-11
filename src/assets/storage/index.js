let storage={
    setData(key,arr){
        localStorage.setItem(key,JSON.stringify(arr))
    },
    getData(key){
       return JSON.parse(localStorage.getItem(key))
    }
}
export default storage