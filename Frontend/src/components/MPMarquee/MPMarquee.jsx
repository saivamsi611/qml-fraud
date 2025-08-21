import Marquee from "react-fast-marquee";
import "./MPMarquee.css";

export default function MPMarquee({ items, width = "100%" }) {
  return (
    <div className="scroll-container" style={{ width }}>
      <Marquee pauseOnHover gradient={false} speed={50}>
        {items.map((item, index) => (
          <span key={index} className="scroll-item">
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
