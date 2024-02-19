const RefreshBtn = (setLoading) => {
    return(
        <div className='row'>
            <div className='container-full-width col-4 text-right pt-0 pb-0'>
                <button key={'refresh-competition-card-btn'} className="primary-btn" onClick={() => setLoading(true)}>รีเฟรช</button>
            </div>
        </div>
    )
}

export default RefreshBtn
