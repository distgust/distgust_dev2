const CompetitionTypeForm = (props) =>{
    return(
            <div className='form-row'>
                <label>สายการแข่งขัน</label>
                <input type="text" name={props.name} key={props.key}/>
            </div>
    )
}
export default CompetitionTypeForm