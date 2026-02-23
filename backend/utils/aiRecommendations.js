export const getAIRecommendations = ({ interests = [], classLevel, location }) => {
  const recs = [];

  const hasInterest = (label) =>
    interests.some((i) => i.toLowerCase().includes(label.toLowerCase()));

  if (hasInterest("Engineering") && location === "Abroad") {
    recs.push(
      "B.Tech in Computer Science (Abroad)",
      "B.Sc in Artificial Intelligence",
      "B.Eng in Robotics & Automation"
    );
  }

  if (hasInterest("Medical") && location === "India") {
    recs.push("MBBS", "BDS", "BAMS");
  }

  if (hasInterest("Commerce") && hasInterest("Banking")) {
    recs.push("B.Com (Banking & Finance)", "Chartered Accountant (CA)", "IBPS Exams");
  }

  if (classLevel === "10th" && hasInterest("Computer")) {
    recs.push("Diploma in Computer Engineering", "Polytechnic in IT");
  }

  return [...new Set(recs)];
};

