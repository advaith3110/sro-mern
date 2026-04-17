function Node({
  x,
  y,
  label,
  isStart,
  isEnd,
  isSelected,
  isVisited,
  isPath,
  onClick,
}) {
  let bgColor = "#3b82f6";

  if (isPath) bgColor = "#22c55e";
  else if (isStart) bgColor = "#e25821";
  else if (isEnd) bgColor = "#e25821";
  else if (isVisited) bgColor = "#eab308";
  else if (isSelected) bgColor = "#ff0909";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: "absolute",
        left: x - 18,
        top: y - 18,
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: bgColor,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        border: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      {label}
    </div>
  );
}

export default Node;
