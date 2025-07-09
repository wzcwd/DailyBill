
const Icons = ({category}) => {
    const baseURL = "/"
    return (
        <img src={`${baseURL}${category}.svg`} alt="icon" style={{width: 20, height: 20,}} />
    )
}
export default Icons
