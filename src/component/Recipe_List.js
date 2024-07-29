import {useLocation} from 'react-router-dom'

export default function Recipe_List(){

    const location = useLocation();
    const {Id} = location.state || {};

    return (
        <h2>{Id}</h2>
    )
}