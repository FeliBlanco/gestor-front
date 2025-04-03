const getColorStatus = (status) => {
    if(status == "warning") return '#8a8054'
    if(status == "error") return '#9c5d49'
    if(status == "success") return '#799468'
    return '#000';
}

export default getColorStatus