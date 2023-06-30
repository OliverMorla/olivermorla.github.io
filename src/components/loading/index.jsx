const Loading = () => {
    return (
        <div
            className="loading-wrapper"
            style={{
                marginTop: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
            <img src="/assets/loading/spinner.svg" alt="loading-gif" />
        </div>
    );
}

export default Loading;