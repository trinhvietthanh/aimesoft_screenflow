import React from "react";
import { Helmet } from "react-helmet";
function Home() {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Nhân viên</title>
                <link rel="canonical" href="http://127.0.0.1:8000/" />
            </Helmet>
            <p>Wellcome</p>
        </div>
    );
}
export default Home;
