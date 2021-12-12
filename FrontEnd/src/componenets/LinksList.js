import LinkRow from './LinkRow';

const LinksList = (props) => {
    
    return (
        <div className="Links-List">
            {props.resKeys.map((x)=>{
                return <LinkRow linkName={x} link={props.response["links"][x]}/>
            })}
        </div>
    )
}

export default LinksList
