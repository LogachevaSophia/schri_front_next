import { TailSpin } from "react-loader-spinner";


export type SpinerProps = {
    style?: any
}

const Spiner: React.FC<SpinerProps> = ({ style }) => {
    return (
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                
            />
        </div>

    );
}

export default Spiner