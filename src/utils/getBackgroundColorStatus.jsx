const getBackgroundColorStatus = (status) => {
    if(status == "warning") return '#e3d8aa'
    if(status == "error") return '#e6aa97'
    if(status == "success") return '#c4e6ae'
    return '#fff';
}

export default getBackgroundColorStatus;