export default function getStatusColorDocker(status) {
    if(status == "stopped") return 'red';
    if(status == "running") return 'green';
    return '#000'
}