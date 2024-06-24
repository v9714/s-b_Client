// import "./Loder.css"
// export default function Loder(props) {
//     const { isLoding } = props

//     if (isLoding) {
//         return (
//             <div className="d-flex justify-content-center align-items-center flex-column "
//                 style={{
//                     position: "fixed",
//                     left: "0",
//                     top: "0",
//                     width: "100%",
//                     minHeight: "100vh",
//                     background: "rgb(0 0 0 / 74%)",
//                     zIndex: "1000"
//                 }}>
//                 <div className="lds-roller ">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </div>
//                 <h3 className="m-2 ms-5 text-light">Loding . . . </h3>
//             </div>
//         )
//     }
//     return ""
// }

import "./Loder.css";

export default function Loder(props) {
    const { isLoding } = props;

    if (isLoding) {
        return (
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center flex-col bg-black bg-opacity-80 z-50">
                <div className="lds-roller ">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h3 className="m-2 ms-5 text-white">Loading . . . </h3>
            </div>
        );
    }
    return null;
}
