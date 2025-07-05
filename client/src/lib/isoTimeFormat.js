const isoTimeFormat=(datetime)=>{
    const date= new Date(datetime);
    const localeTime= date.toLocaleTimeString('en-US',{hour:'2-digit',minute:"2-digit", hour12:true});
    return localeTime;
}
export default isoTimeFormat;