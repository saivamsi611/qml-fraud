import React from "react";
import Marquee from "react-fast-marquee";

    function AlertsTicker() {
    return (
        <Marquee gradient={false} speed={50} style={{ background: "rgba(0,0,0,0.6)", color: "white", padding: "10px" }}>
        ⚠️ High-risk transaction blocked: User123 → User789 ($8,900) | 
        ✅ Suspicious login prevented: IP 45.33.12.8 | 
        ⚠️ Multiple failed logins: User456 |
        🚨 Fraud attempt detected: Crypto wallet transfer $12,000
        </Marquee>
    );
    }

    export default AlertsTicker;
